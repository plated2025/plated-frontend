import { io } from 'socket.io-client';

// WebRTC Configuration with STUN servers
const rtcConfig = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' }
  ]
};

class WebRTCService {
  constructor() {
    this.socket = null;
    this.peerConnections = new Map(); // viewerId -> RTCPeerConnection
    this.localStream = null;
    this.mode = null; // 'broadcaster' or 'viewer'
    this.streamId = null;
    this.isConnected = false;
  }

  // Initialize socket connection
  connect(serverUrl) {
    if (this.socket) return this.socket;

    this.socket = io(serverUrl, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5
    });

    this.socket.on('connect', () => {
      console.log('✅ Connected to signaling server');
      this.isConnected = true;
    });

    this.socket.on('disconnect', () => {
      console.log('❌ Disconnected from signaling server');
      this.isConnected = false;
    });

    return this.socket;
  }

  // Start broadcasting (host mode)
  async startBroadcast(streamId, userId, userName, onViewerJoined, onViewerLeft) {
    this.mode = 'broadcaster';
    this.streamId = streamId;

    // Tell server we're starting a stream
    this.socket.emit('start-stream', { streamId, userId, userName });

    // Handle new viewers
    this.socket.on('viewer-joined', async ({ viewerId, userId, userName, viewerCount }) => {
      console.log(`👁️ Viewer joined: ${userName} (${viewerCount} total)`);
      
      if (onViewerJoined) {
        onViewerJoined({ viewerId, userId, userName, viewerCount });
      }

      // Create peer connection for this viewer
      await this.createPeerConnectionForViewer(viewerId);
    });

    // Handle answers from viewers
    this.socket.on('answer', async ({ answer, viewer }) => {
      const pc = this.peerConnections.get(viewer);
      if (pc) {
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
      }
    });

    // Handle ICE candidates
    this.socket.on('ice-candidate', ({ candidate, sender }) => {
      const pc = this.peerConnections.get(sender);
      if (pc && candidate) {
        pc.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });
  }

  // Create peer connection for a viewer
  async createPeerConnectionForViewer(viewerId) {
    const pc = new RTCPeerConnection(rtcConfig);
    this.peerConnections.set(viewerId, pc);

    // Add local stream tracks to peer connection
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => {
        pc.addTrack(track, this.localStream);
      });
    }

    // Handle ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        this.socket.emit('ice-candidate', {
          candidate: event.candidate,
          targetId: viewerId
        });
      }
    };

    // Create and send offer
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    
    this.socket.emit('offer', {
      offer,
      viewerId
    });
  }

  // Join stream as viewer
  async joinStream(streamId, userId, userName, onStreamReceived) {
    this.mode = 'viewer';
    this.streamId = streamId;

    // Tell server we want to join
    this.socket.emit('join-stream', { streamId, userId, userName });

    // Handle stream ready
    this.socket.on('stream-ready', async ({ broadcaster }) => {
      console.log('📺 Stream ready, connecting to broadcaster');
      
      // Create peer connection
      const pc = new RTCPeerConnection(rtcConfig);
      this.peerConnections.set(broadcaster, pc);

      // Handle received stream
      pc.ontrack = (event) => {
        console.log('🎥 Received video stream');
        if (onStreamReceived) {
          onStreamReceived(event.streams[0]);
        }
      };

      // Handle ICE candidates
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          this.socket.emit('ice-candidate', {
            candidate: event.candidate,
            targetId: broadcaster
          });
        }
      };

      // Store broadcaster ID for later
      this.broadcasterId = broadcaster;
    });

    // Handle offer from broadcaster
    this.socket.on('offer', async ({ offer, broadcaster }) => {
      const pc = this.peerConnections.get(broadcaster);
      if (pc) {
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        
        // Create answer
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        
        // Send answer back
        this.socket.emit('answer', {
          answer,
          broadcaster
        });
      }
    });

    // Handle ICE candidates
    this.socket.on('ice-candidate', ({ candidate, sender }) => {
      const pc = this.peerConnections.get(sender);
      if (pc && candidate) {
        pc.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    // Handle stream end
    this.socket.on('stream-ended', () => {
      console.log('🛑 Stream ended');
      this.cleanup();
    });
  }

  // Set local stream (for broadcaster)
  setLocalStream(stream) {
    this.localStream = stream;
  }

  // Send chat message
  sendMessage(message, userId, userName) {
    if (this.socket && this.streamId) {
      this.socket.emit('stream-message', {
        streamId: this.streamId,
        message,
        userId,
        userName
      });
    }
  }

  // Send like
  sendLike(userId) {
    if (this.socket && this.streamId) {
      this.socket.emit('stream-like', {
        streamId: this.streamId,
        userId
      });
    }
  }

  // End stream (broadcaster only)
  endStream() {
    if (this.socket && this.streamId && this.mode === 'broadcaster') {
      this.socket.emit('end-stream', { streamId: this.streamId });
    }
    this.cleanup();
  }

  // Cleanup
  cleanup() {
    // Close all peer connections
    this.peerConnections.forEach(pc => pc.close());
    this.peerConnections.clear();

    // Stop local stream
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = null;
    }

    // Remove socket listeners
    if (this.socket) {
      this.socket.off('viewer-joined');
      this.socket.off('answer');
      this.socket.off('offer');
      this.socket.off('ice-candidate');
      this.socket.off('stream-ready');
      this.socket.off('stream-ended');
    }

    this.mode = null;
    this.streamId = null;
  }

  // Disconnect
  disconnect() {
    this.cleanup();
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

// Export singleton instance
export default new WebRTCService();
