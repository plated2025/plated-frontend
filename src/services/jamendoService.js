// Jamendo API Service
// Free music API with 500K+ Creative Commons licensed tracks
// https://developer.jamendo.com/

const JAMENDO_CLIENT_ID = import.meta.env.VITE_JAMENDO_CLIENT_ID || 'demo_client_id';
const JAMENDO_API_BASE = 'https://api.jamendo.com/v3.0';

class JamendoService {
  constructor() {
    this.clientId = JAMENDO_CLIENT_ID;
  }

  // Get tracks by tag/genre
  async getTracksByTag(tag = 'cooking', limit = 20) {
    try {
      const params = new URLSearchParams({
        client_id: this.clientId,
        format: 'json',
        limit: limit,
        tags: tag,
        audioformat: 'mp32', // MP3 format
        include: 'musicinfo' // Include music info
      });

      const response = await fetch(`${JAMENDO_API_BASE}/tracks/?${params}`);
      const data = await response.json();

      if (data.results) {
        return this.formatTracks(data.results);
      }
      return [];
    } catch (error) {
      console.error('Jamendo API error:', error);
      return [];
    }
  }

  // Search tracks
  async searchTracks(query, limit = 20) {
    try {
      const params = new URLSearchParams({
        client_id: this.clientId,
        format: 'json',
        limit: limit,
        search: query,
        audioformat: 'mp32',
        include: 'musicinfo'
      });

      const response = await fetch(`${JAMENDO_API_BASE}/tracks/?${params}`);
      const data = await response.json();

      if (data.results) {
        return this.formatTracks(data.results);
      }
      return [];
    } catch (error) {
      console.error('Jamendo search error:', error);
      return [];
    }
  }

  // Get popular/featured tracks
  async getFeaturedTracks(limit = 20) {
    try {
      const params = new URLSearchParams({
        client_id: this.clientId,
        format: 'json',
        limit: limit,
        order: 'popularity_week', // Most popular this week
        audioformat: 'mp32',
        include: 'musicinfo'
      });

      const response = await fetch(`${JAMENDO_API_BASE}/tracks/?${params}`);
      const data = await response.json();

      if (data.results) {
        return this.formatTracks(data.results);
      }
      return [];
    } catch (error) {
      console.error('Jamendo featured error:', error);
      return [];
    }
  }

  // Get tracks by mood/atmosphere
  async getTracksByMood(mood = 'happy', limit = 20) {
    const moodTags = {
      happy: 'happy+upbeat',
      chill: 'chill+relaxing',
      energetic: 'energetic+upbeat',
      calm: 'calm+peaceful',
      upbeat: 'upbeat+positive'
    };

    const tag = moodTags[mood] || mood;
    return this.getTracksByTag(tag, limit);
  }

  // Format Jamendo tracks to our app format
  formatTracks(tracks) {
    return tracks.map(track => ({
      id: `jamendo-${track.id}`,
      name: track.name,
      artist: track.artist_name,
      duration: this.formatDuration(track.duration),
      audioUrl: track.audio,
      audioDownloadUrl: track.audiodownload,
      image: track.image || track.album_image,
      category: 'jamendo',
      source: 'jamendo',
      license: track.license_ccurl,
      shareUrl: track.shareurl,
      cover: '🎵' // Default emoji
    }));
  }

  // Format duration from seconds to MM:SS
  formatDuration(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  // Get audio stream URL for a track
  getAudioUrl(trackId) {
    // Jamendo provides direct audio URLs in track data
    // This is a helper if you need to fetch separately
    return `${JAMENDO_API_BASE}/tracks/file/?client_id=${this.clientId}&id=${trackId}&audioformat=mp32`;
  }

  // Prefetch tracks for offline use (optional)
  async prefetchTracks(tags = ['cooking', 'food', 'kitchen'], limit = 10) {
    const allTracks = [];
    
    for (const tag of tags) {
      const tracks = await this.getTracksByTag(tag, limit);
      allTracks.push(...tracks);
    }
    
    return allTracks;
  }
}

export default new JamendoService();

// Jamendo tag suggestions for food/cooking content
export const jamendoTags = {
  cooking: ['cooking', 'food', 'kitchen', 'recipe'],
  upbeat: ['upbeat', 'happy', 'positive', 'energetic'],
  chill: ['chill', 'relaxing', 'calm', 'lofi'],
  electronic: ['electronic', 'edm', 'dance', 'techno'],
  acoustic: ['acoustic', 'folk', 'indie', 'guitar'],
  jazz: ['jazz', 'smooth', 'lounge', 'saxophone'],
  pop: ['pop', 'contemporary', 'modern']
};
