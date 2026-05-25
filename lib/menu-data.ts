export type MenuItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  desc: string;
  emoji: string;
  color: string;
  image: string;   // Unsplash URL
  notes: string[];
  sensory: { texture: number; sweetness: number; richness: number; aroma: number };
  featured?: boolean;
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: 'Velvet Stuffed Cookie',
    category: 'Cookies',
    price: 6,
    desc: 'Thick, chewy, filled with Nutella ganache. Crisp edges, gooey center.',
    emoji: '🍪',
    color: '#C9748F',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80',
    notes: ['gluten-free option', 'nut-free option'],
    sensory: { texture: 90, sweetness: 75, richness: 85, aroma: 80 },
    featured: true,
  },
  {
    id: 2,
    name: 'Rose Gold Mini Cake',
    category: 'Cakes',
    price: 12,
    desc: 'Three-layer vanilla sponge, rose lychee compote, champagne buttercream.',
    emoji: '🎂',
    color: '#C4965A',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80',
    notes: ['contains gluten', 'contains dairy'],
    sensory: { texture: 85, sweetness: 80, richness: 70, aroma: 95 },
    featured: true,
  },
  {
    id: 3,
    name: 'Lavender Crème Brûlée',
    category: 'Seasonal',
    price: 9,
    desc: 'House-made lavender custard, caramelized sugar crust, edible florals.',
    emoji: '🫙',
    color: '#9B7EBC',
    image: 'https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?w=600&q=80',
    notes: ['seasonal', 'contains eggs'],
    sensory: { texture: 75, sweetness: 65, richness: 90, aroma: 100 },
    featured: true,
  },
  {
    id: 4,
    name: 'Brown Butter Financier',
    category: 'Cakes',
    price: 5,
    desc: 'French almond cake, noisette brown butter, fleur de sel finish.',
    emoji: '🧁',
    color: '#C4965A',
    image: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&q=80',
    notes: ['contains nuts', 'contains gluten'],
    sensory: { texture: 80, sweetness: 60, richness: 95, aroma: 85 },
  },
  {
    id: 5,
    name: 'Matcha Cloud Cookie',
    category: 'Cookies',
    price: 6,
    desc: 'Ceremonial grade matcha, white chocolate chips, sea salt.',
    emoji: '🍵',
    color: '#6B8C7A',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&q=80',
    notes: ['vegan option'],
    sensory: { texture: 85, sweetness: 55, richness: 65, aroma: 90 },
  },
  {
    id: 6,
    name: 'Tahini Date Blondie',
    category: 'Vegan',
    price: 7,
    desc: '100% plant-based, medjool dates, sesame tahini, toasted walnut.',
    emoji: '🟫',
    color: '#C4965A',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80',
    notes: ['vegan', 'refined sugar-free'],
    sensory: { texture: 70, sweetness: 70, richness: 80, aroma: 75 },
  },
  {
    id: 7,
    name: 'Strawberry Basil Tart',
    category: 'Seasonal',
    price: 10,
    desc: 'Pâte sucrée shell, vanilla pastry cream, fresh strawberries, basil oil.',
    emoji: '🍓',
    color: '#C9748F',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80',
    notes: ['seasonal', 'contains gluten'],
    sensory: { texture: 82, sweetness: 78, richness: 72, aroma: 93 },
  },
  {
    id: 8,
    name: 'Salted Caramel Truffle',
    category: 'Cookies',
    price: 4,
    desc: 'Dark chocolate ganache, salted caramel center, cocoa dusted exterior.',
    emoji: '🍫',
    color: '#3D1A0A',
    image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=600&q=80',
    notes: ['vegan option', 'gluten-free'],
    sensory: { texture: 88, sweetness: 72, richness: 98, aroma: 92 },
    featured: true,
  },
];

export const CATEGORIES = ['All', 'Cookies', 'Cakes', 'Seasonal', 'Vegan'];
