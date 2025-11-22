// Mock data for the application

export const mockUsers = [
  {
    id: 1,
    name: 'Maria Rodriguez',
    username: '@mariachef',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: 'Professional chef sharing authentic Mexican cuisine 🌮 | Featured on Food Network',
    specialty: '🇲🇽 Mexican & Latin',
    location: 'Mexico City, Mexico',
    website: 'https://mariachef.com',
    isCreator: true,
    followers: 125000,
    following: 342,
    recipes: 287,
    likes: 450000,
    verified: true
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    username: '@healthysarah',
    avatar: 'https://i.pravatar.cc/150?img=5',
    bio: 'Certified Nutritionist 🥗 | Plant-based lifestyle advocate | Making healthy eating delicious',
    specialty: '🥬 Vegan & Healthy',
    location: 'Los Angeles, CA',
    website: 'https://healthyeats.com',
    isCreator: true,
    followers: 89000,
    following: 156,
    recipes: 156,
    likes: 230000,
    verified: true
  },
  {
    id: 3,
    name: 'Pierre Dubois',
    username: '@pierredesserts',
    avatar: 'https://i.pravatar.cc/150?img=12',
    bio: 'Pastry Chef from Le Cordon Bleu ✨🍰 | Creating sweet masterpieces daily',
    specialty: '🍰 Desserts & Pastries',
    location: 'Paris, France',
    website: 'https://pierredesserts.fr',
    isCreator: true,
    followers: 256000,
    following: 89,
    recipes: 432,
    likes: 890000,
    verified: true
  },
  {
    id: 4,
    name: 'Ken Tanaka',
    username: '@kentanaka',
    avatar: 'https://i.pravatar.cc/150?img=8',
    bio: 'Exploring the flavors of Asia 🍜 | Fusion chef | Traditional meets modern',
    specialty: '🍜 Asian Fusion',
    location: 'Tokyo, Japan',
    isCreator: true,
    followers: 178000,
    following: 234,
    recipes: 345,
    likes: 567000,
    verified: true
  },
  {
    id: 5,
    name: 'Emily Chen',
    username: '@quickmeals',
    avatar: 'https://i.pravatar.cc/150?img=15',
    bio: 'Busy mom of 3 👨‍👩‍👧‍👦 | Sharing 15-min meals that kids actually eat ⚡',
    specialty: '⚡ Quick & Easy',
    location: 'Chicago, IL',
    isCreator: true,
    followers: 67000,
    following: 445,
    recipes: 189,
    likes: 145000,
    verified: false
  },
  {
    id: 6,
    name: 'Marco Rossi',
    username: '@marcoitaliano',
    avatar: 'https://i.pravatar.cc/150?img=13',
    bio: 'Italian cuisine from Nonna\'s kitchen 🍝 | Authentic recipes passed down generations',
    specialty: '🇮🇹 Italian',
    location: 'Rome, Italy',
    isCreator: true,
    followers: 198000,
    following: 167,
    recipes: 423,
    likes: 678000,
    verified: true
  },
  {
    id: 7,
    name: 'Priya Sharma',
    username: '@priyaspices',
    avatar: 'https://i.pravatar.cc/150?img=9',
    bio: 'Bringing authentic Indian flavors to your kitchen 🍛 | Spice lover | Mumbai native',
    specialty: '🇮🇳 Indian',
    location: 'Mumbai, India',
    isCreator: true,
    followers: 134000,
    following: 289,
    recipes: 267,
    likes: 389000,
    verified: true
  },
  {
    id: 8,
    name: 'David Kim',
    username: '@chefkimbbq',
    avatar: 'https://i.pravatar.cc/150?img=14',
    bio: 'BBQ Master 🔥 | Competition winner | Low & slow is the way',
    specialty: '🔥 BBQ & Grilling',
    location: 'Austin, TX',
    isCreator: true,
    followers: 145000,
    following: 212,
    recipes: 178,
    likes: 456000,
    verified: true
  }
]

export const mockRecipes = [
  {
    id: 1,
    creator: mockUsers[0],
    title: 'Authentic Beef Tacos al Pastor',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
    description: 'Traditional Mexican street tacos with marinated pork and pineapple',
    likes: 12400,
    comments: 342,
    saves: 4500,
    isLiked: false,
    isSaved: false,
    cuisine: 'Mexican',
    difficulty: 'Medium',
    cookTime: '45 min',
    servings: 4,
    ingredients: [
      { item: 'Pork shoulder', amount: '2 lbs' },
      { item: 'Pineapple', amount: '1 cup diced' },
      { item: 'Dried guajillo chiles', amount: '4' },
      { item: 'White onion', amount: '1 large' },
      { item: 'Cilantro', amount: '1 bunch' },
      { item: 'Corn tortillas', amount: '12' },
      { item: 'Lime', amount: '2' }
    ],
    steps: [
      'Marinate pork with chile paste for 4 hours',
      'Grill pork until charred and cooked through',
      'Dice pork and pineapple into small pieces',
      'Warm tortillas on a griddle',
      'Assemble tacos with meat, pineapple, onion, and cilantro',
      'Serve with lime wedges'
    ],
    tags: ['mexican', 'tacos', 'pork', 'street-food'],
    postedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    creator: mockUsers[1],
    title: 'Rainbow Buddha Bowl',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
    description: 'Colorful vegan bowl packed with nutrients and flavor',
    likes: 8900,
    comments: 234,
    saves: 3200,
    isLiked: true,
    isSaved: false,
    cuisine: 'Vegan',
    difficulty: 'Easy',
    cookTime: '25 min',
    servings: 2,
    ingredients: [
      { item: 'Quinoa', amount: '1 cup' },
      { item: 'Chickpeas', amount: '1 can' },
      { item: 'Sweet potato', amount: '1 large' },
      { item: 'Kale', amount: '2 cups' },
      { item: 'Avocado', amount: '1' },
      { item: 'Tahini', amount: '3 tbsp' },
      { item: 'Lemon juice', amount: '2 tbsp' }
    ],
    steps: [
      'Cook quinoa according to package instructions',
      'Roast chickpeas and sweet potato at 400°F for 25 minutes',
      'Massage kale with olive oil and salt',
      'Prepare tahini dressing with lemon juice and water',
      'Arrange all ingredients in bowls',
      'Drizzle with tahini dressing'
    ],
    tags: ['vegan', 'healthy', 'bowl', 'plant-based'],
    postedAt: '2024-01-15T14:20:00Z'
  },
  {
    id: 3,
    creator: mockUsers[2],
    title: 'Classic French Croissants',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800',
    description: 'Buttery, flaky croissants with perfect layers',
    likes: 15600,
    comments: 567,
    saves: 8900,
    isLiked: false,
    isSaved: true,
    cuisine: 'French',
    difficulty: 'Hard',
    cookTime: '8 hours',
    servings: 12,
    ingredients: [
      { item: 'All-purpose flour', amount: '4 cups' },
      { item: 'Butter', amount: '1.5 cups cold' },
      { item: 'Milk', amount: '1 cup' },
      { item: 'Sugar', amount: '1/4 cup' },
      { item: 'Active dry yeast', amount: '2 tsp' },
      { item: 'Salt', amount: '2 tsp' },
      { item: 'Egg', amount: '1 for wash' }
    ],
    steps: [
      'Make dough and let rise for 2 hours',
      'Roll out butter into a flat square',
      'Perform lamination with multiple folds',
      'Chill dough between folds (4 times total)',
      'Cut into triangles and shape into croissants',
      'Proof for 2 hours, then bake at 375°F for 20 minutes'
    ],
    tags: ['french', 'pastry', 'breakfast', 'baking'],
    postedAt: '2024-01-14T08:00:00Z'
  },
  {
    id: 4,
    creator: mockUsers[3],
    title: 'Spicy Miso Ramen Bowl',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800',
    description: 'Rich, umami-packed ramen with perfectly cooked noodles',
    likes: 11200,
    comments: 456,
    saves: 5600,
    isLiked: true,
    isSaved: false,
    cuisine: 'Japanese',
    difficulty: 'Medium',
    cookTime: '2 hours',
    servings: 4,
    tags: ['ramen', 'japanese', 'noodles', 'soup'],
    postedAt: '2024-01-15T18:45:00Z'
  },
  {
    id: 5,
    creator: mockUsers[4],
    title: '15-Minute Garlic Shrimp Pasta',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800',
    description: 'Quick weeknight dinner that tastes like a restaurant meal',
    likes: 9400,
    comments: 198,
    saves: 4200,
    isLiked: false,
    isSaved: true,
    cuisine: 'Italian',
    difficulty: 'Easy',
    cookTime: '15 min',
    servings: 2,
    tags: ['pasta', 'quick', 'seafood', 'easy'],
    postedAt: '2024-01-15T12:30:00Z'
  },
  {
    id: 6,
    creator: mockUsers[5],
    title: 'Classic Spaghetti Carbonara',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800',
    description: 'Creamy, authentic Roman carbonara with guanciale',
    likes: 18700,
    comments: 623,
    saves: 7800,
    isLiked: true,
    isSaved: true,
    cuisine: 'Italian',
    difficulty: 'Medium',
    cookTime: '30 min',
    servings: 4,
    tags: ['pasta', 'italian', 'carbonara', 'classic'],
    postedAt: '2024-01-14T19:15:00Z'
  },
  {
    id: 7,
    creator: mockUsers[6],
    title: 'Butter Chicken Masala',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800',
    description: 'Creamy, rich Indian curry with tender chicken',
    likes: 14300,
    comments: 512,
    saves: 6400,
    isLiked: false,
    isSaved: false,
    cuisine: 'Indian',
    difficulty: 'Medium',
    cookTime: '1 hour',
    servings: 6,
    tags: ['indian', 'curry', 'chicken', 'spicy'],
    postedAt: '2024-01-14T16:20:00Z'
  },
  {
    id: 8,
    creator: mockUsers[7],
    title: 'Texas-Style Smoked Brisket',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
    description: 'Low and slow smoked beef brisket with perfect bark',
    likes: 22100,
    comments: 891,
    saves: 9200,
    isLiked: true,
    isSaved: true,
    cuisine: 'American',
    difficulty: 'Hard',
    cookTime: '12 hours',
    servings: 12,
    tags: ['bbq', 'beef', 'smoking', 'texas'],
    postedAt: '2024-01-13T14:00:00Z'
  },
  {
    id: 9,
    creator: mockUsers[1],
    title: 'Acai Smoothie Bowl',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800',
    description: 'Refreshing breakfast bowl loaded with antioxidants',
    likes: 7600,
    comments: 167,
    saves: 3400,
    isLiked: false,
    isSaved: false,
    cuisine: 'Healthy',
    difficulty: 'Easy',
    cookTime: '10 min',
    servings: 1,
    tags: ['breakfast', 'smoothie', 'healthy', 'vegan'],
    postedAt: '2024-01-15T07:00:00Z'
  },
  {
    id: 10,
    creator: mockUsers[2],
    title: 'Chocolate Lava Cake',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800',
    description: 'Decadent molten chocolate cake with gooey center',
    likes: 19800,
    comments: 734,
    saves: 8900,
    isLiked: true,
    isSaved: false,
    cuisine: 'Dessert',
    difficulty: 'Medium',
    cookTime: '35 min',
    servings: 4,
    tags: ['dessert', 'chocolate', 'cake', 'elegant'],
    postedAt: '2024-01-13T20:30:00Z'
  }
]

export const mockStories = [
  {
    id: 1,
    user: mockUsers[0],
    stories: [
      {
        id: 1,
        type: 'image',
        url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
        caption: 'Today\'s special!',
        timestamp: '2h ago'
      },
      {
        id: 2,
        type: 'video',
        url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800',
        caption: 'Making fresh salsa',
        timestamp: '5h ago'
      }
    ],
    hasNew: true
  },
  {
    id: 2,
    user: mockUsers[1],
    stories: [
      {
        id: 3,
        type: 'image',
        url: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800',
        caption: 'Smoothie bowl magic',
        timestamp: '3h ago'
      }
    ],
    hasNew: true
  },
  {
    id: 3,
    user: mockUsers[2],
    stories: [
      {
        id: 4,
        type: 'image',
        url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
        caption: 'New dessert recipe coming soon!',
        timestamp: '1h ago'
      }
    ],
    hasNew: true
  }
]

export const mockMessages = [
  {
    id: 1,
    user: mockUsers[1],
    lastMessage: 'Thanks for the recipe tip!',
    timestamp: '2m ago',
    unread: 2,
    isOnline: true
  },
  {
    id: 2,
    user: mockUsers[2],
    lastMessage: 'Would love to collaborate',
    timestamp: '1h ago',
    unread: 0,
    isOnline: false
  },
  {
    id: 3,
    user: mockUsers[3],
    lastMessage: 'Check out my latest recipe',
    timestamp: '3h ago',
    unread: 1,
    isOnline: true
  }
]

export const mockNotifications = [
  {
    id: 1,
    type: 'like',
    user: mockUsers[1],
    content: 'liked your recipe',
    recipe: mockRecipes[0],
    timestamp: '5m ago',
    read: false
  },
  {
    id: 2,
    type: 'comment',
    user: mockUsers[2],
    content: 'commented on your post',
    recipe: mockRecipes[0],
    timestamp: '1h ago',
    read: false
  },
  {
    id: 3,
    type: 'follow',
    user: mockUsers[3],
    content: 'started following you',
    timestamp: '2h ago',
    read: true
  },
  {
    id: 4,
    type: 'save',
    user: mockUsers[4],
    content: 'saved your recipe to their planner',
    recipe: mockRecipes[1],
    timestamp: '3h ago',
    read: true
  }
]

export const cuisineFilters = [
  { id: 'all', label: 'All', emoji: '🍽️' },
  { id: 'vegan', label: 'Vegan', emoji: '🥬' },
  { id: 'dessert', label: 'Desserts', emoji: '🍰' },
  { id: 'quick', label: 'Quick', emoji: '⚡' },
  { id: 'healthy', label: 'Healthy', emoji: '💪' },
  { id: 'breakfast', label: 'Breakfast', emoji: '🍳' },
  { id: 'lunch', label: 'Lunch', emoji: '🥗' },
  { id: 'dinner', label: 'Dinner', emoji: '🍽️' }
]

export const difficultyLevels = [
  { value: 'easy', label: 'Easy', color: 'green' },
  { value: 'medium', label: 'Medium', color: 'yellow' },
  { value: 'hard', label: 'Hard', color: 'red' }
]
