// Music Library for Reels
// Royalty-free music tracks organized by category

export const musicLibrary = {
  trending: [
    { id: 1, name: 'Upbeat Kitchen', artist: 'Cooking Beats', duration: '2:45', category: 'trending', tempo: 'upbeat', cover: '🎵' },
    { id: 2, name: 'Epic Cooking', artist: 'Food Symphony', duration: '2:30', category: 'trending', tempo: 'energetic', cover: '🎸' },
    { id: 3, name: 'Viral Vibes', artist: 'TikTok Sounds', duration: '3:00', category: 'trending', tempo: 'upbeat', cover: '🔥' },
    { id: 4, name: 'Chef Mode', artist: 'Kitchen Groove', duration: '2:15', category: 'trending', tempo: 'energetic', cover: '👨‍🍳' },
    { id: 5, name: 'Cookin Up', artist: 'Urban Kitchen', duration: '2:50', category: 'trending', tempo: 'upbeat', cover: '🎤' }
  ],
  
  lofi: [
    { id: 11, name: 'Chill Vibes', artist: 'Lo-Fi Chef', duration: '3:12', category: 'lofi', tempo: 'chill', cover: '🌙' },
    { id: 12, name: 'Lazy Sunday Cook', artist: 'Cafe Beats', duration: '3:45', category: 'lofi', tempo: 'chill', cover: '☕' },
    { id: 13, name: 'Rainy Day Kitchen', artist: 'Study Cooking', duration: '4:00', category: 'lofi', tempo: 'chill', cover: '🌧️' },
    { id: 14, name: 'Morning Prep', artist: 'Breakfast Beats', duration: '3:30', category: 'lofi', tempo: 'chill', cover: '🌅' },
    { id: 15, name: 'Midnight Snack', artist: 'Night Owl', duration: '3:15', category: 'lofi', tempo: 'chill', cover: '🌜' }
  ],
  
  jazz: [
    { id: 21, name: 'Smooth Jazz', artist: 'Dinner Jazz', duration: '2:55', category: 'jazz', tempo: 'smooth', cover: '🎷' },
    { id: 22, name: 'French Bistro', artist: 'Paris Cafe', duration: '3:20', category: 'jazz', tempo: 'smooth', cover: '🥐' },
    { id: 23, name: 'Cocktail Hour', artist: 'Lounge Mix', duration: '2:40', category: 'jazz', tempo: 'smooth', cover: '🍸' },
    { id: 24, name: 'Sunday Brunch', artist: 'Jazz Kitchen', duration: '3:10', category: 'jazz', tempo: 'smooth', cover: '🥂' },
    { id: 25, name: 'Elegant Dining', artist: 'Fine Dining', duration: '2:50', category: 'jazz', tempo: 'smooth', cover: '🍷' }
  ],
  
  pop: [
    { id: 31, name: 'Happy Chef', artist: 'Kitchen Pop', duration: '3:00', category: 'pop', tempo: 'upbeat', cover: '😊' },
    { id: 32, name: 'Feel Good Food', artist: 'Pop Kitchen', duration: '2:45', category: 'pop', tempo: 'upbeat', cover: '✨' },
    { id: 33, name: 'Dance Cook', artist: 'Party Beats', duration: '3:15', category: 'pop', tempo: 'energetic', cover: '💃' },
    { id: 34, name: 'Summer Vibes', artist: 'BBQ Party', duration: '2:55', category: 'pop', tempo: 'upbeat', cover: '☀️' },
    { id: 35, name: 'Weekend Cooking', artist: 'Fun Times', duration: '3:05', category: 'pop', tempo: 'upbeat', cover: '🎉' }
  ],
  
  electronic: [
    { id: 41, name: 'Future Kitchen', artist: 'Synth Chef', duration: '2:30', category: 'electronic', tempo: 'energetic', cover: '🤖' },
    { id: 42, name: 'Neon Cooking', artist: 'Cyber Food', duration: '2:45', category: 'electronic', tempo: 'energetic', cover: '💫' },
    { id: 43, name: 'Digital Recipe', artist: 'Tech Beats', duration: '3:00', category: 'electronic', tempo: 'upbeat', cover: '⚡' },
    { id: 44, name: 'Electro Kitchen', artist: 'Beat Chef', duration: '2:35', category: 'electronic', tempo: 'energetic', cover: '🎮' },
    { id: 45, name: 'Bass Drop Cook', artist: 'EDM Kitchen', duration: '2:50', category: 'electronic', tempo: 'energetic', cover: '🔊' }
  ],
  
  acoustic: [
    { id: 51, name: 'Campfire Cook', artist: 'Acoustic Chef', duration: '3:20', category: 'acoustic', tempo: 'chill', cover: '🏕️' },
    { id: 52, name: 'Garden Prep', artist: 'Folk Kitchen', duration: '3:45', category: 'acoustic', tempo: 'chill', cover: '🌿' },
    { id: 53, name: 'Home Cooking', artist: 'Indie Chef', duration: '3:30', category: 'acoustic', tempo: 'chill', cover: '🏡' },
    { id: 54, name: 'Country Kitchen', artist: 'Barn Beats', duration: '3:15', category: 'acoustic', tempo: 'chill', cover: '🌾' },
    { id: 55, name: 'Cozy Recipe', artist: 'Warm Vibes', duration: '3:25', category: 'acoustic', tempo: 'chill', cover: '🔥' }
  ],
  
  classical: [
    { id: 61, name: 'Italian Kitchen', artist: 'Classic Chef', duration: '3:30', category: 'classical', tempo: 'elegant', cover: '🎻' },
    { id: 62, name: 'Gourmet Symphony', artist: 'Orchestra', duration: '3:45', category: 'classical', tempo: 'elegant', cover: '🎼' },
    { id: 63, name: 'Fine Dining Theme', artist: 'Chamber Music', duration: '3:20', category: 'classical', tempo: 'elegant', cover: '🍽️' },
    { id: 64, name: 'Renaissance Feast', artist: 'Historical', duration: '3:50', category: 'classical', tempo: 'elegant', cover: '👑' },
    { id: 65, name: 'Royal Banquet', artist: 'Baroque', duration: '3:40', category: 'classical', tempo: 'elegant', cover: '🏰' }
  ]
};

// Get all tracks as flat array
export const getAllTracks = () => {
  return Object.values(musicLibrary).flat();
};

// Search tracks
export const searchTracks = (query) => {
  const allTracks = getAllTracks();
  const lowerQuery = query.toLowerCase();
  
  return allTracks.filter(track => 
    track.name.toLowerCase().includes(lowerQuery) ||
    track.artist.toLowerCase().includes(lowerQuery) ||
    track.category.toLowerCase().includes(lowerQuery)
  );
};

// Get tracks by category
export const getTracksByCategory = (category) => {
  return musicLibrary[category] || [];
};

// Music categories with metadata
export const musicCategories = [
  { id: 'jamendo', name: 'Browse All', icon: '🌐', description: '500K+ tracks from Jamendo', isApi: true },
  { id: 'trending', name: 'Trending', icon: '🔥', description: 'Popular right now' },
  { id: 'lofi', name: 'Lo-Fi', icon: '🌙', description: 'Chill & relaxed' },
  { id: 'jazz', name: 'Jazz', icon: '🎷', description: 'Smooth & sophisticated' },
  { id: 'pop', name: 'Pop', icon: '✨', description: 'Upbeat & fun' },
  { id: 'electronic', name: 'Electronic', icon: '⚡', description: 'Energetic beats' },
  { id: 'acoustic', name: 'Acoustic', icon: '🎸', description: 'Natural & warm' },
  { id: 'classical', name: 'Classical', icon: '🎻', description: 'Elegant & timeless' }
];
