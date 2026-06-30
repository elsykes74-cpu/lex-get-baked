export type MenuItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  desc: string;
  emoji: string;
  color: string;
  image: string;
  notes: string[];
  sensory: { texture: number; sweetness: number; richness: number; aroma: number };
  featured?: boolean;
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: 'Classic Chocolate Chip Cookie',
    category: 'Classic Cookies',
    price: 4,
    desc: 'Just a little something to take the edge off—warm, gooey, and all yours. A bakery-style chocolate chip cookie baked fresh in small batches with a soft center and crispy golden edges.',
    emoji: '🍪',
    color: '#D4956A',
    image: '/products/single-classic-choc-chip.jpg',
    notes: ['chocolate chip', 'brown butter', 'sea salt'],
    sensory: { texture: 85, sweetness: 75, richness: 72, aroma: 68 },
    featured: true,
  },
  {
    id: 2,
    name: 'Double Chocolate Dream Cookie',
    category: 'Classic Cookies',
    price: 4,
    desc: 'A deep, fudgy chocolate cookie loaded with melty chocolate chips. Intense cocoa flavor with a soft, brownie-like center that stays gooey long after it cools.',
    emoji: '🍫',
    color: '#6B4E8C',
    image: '/products/single-double-chocolate.jpg',
    notes: ['double chocolate', 'cocoa', 'fudgy'],
    sensory: { texture: 88, sweetness: 80, richness: 95, aroma: 78 },
  },
  {
    id: 3,
    name: 'Birthday Cake Bliss Cookie',
    category: 'Classic Cookies',
    price: 4,
    desc: 'All the joy of birthday cake packed into one thick, chewy cookie. Loaded with rainbow sprinkles and white chocolate chips, with a hint of vanilla cake flavor in every bite.',
    emoji: '🎂',
    color: '#C9748F',
    image: '/products/single-birthday-cake.jpg',
    notes: ['funfetti', 'sprinkles', 'white chocolate', 'vanilla'],
    sensory: { texture: 80, sweetness: 88, richness: 70, aroma: 65 },
  },
  {
    id: 4,
    name: 'M&M Crunch Cookie',
    category: 'Classic Cookies',
    price: 4,
    desc: 'Colorful, crunchy, and impossible to resist. A classic cookie base packed with a generous handful of M&Ms for a pop of color and a satisfying crunch in every bite.',
    emoji: '🌈',
    color: '#C9748F',
    image: '/products/single-mm-crunch.jpg',
    notes: ['M&M', 'candy-coated', 'crunchy', 'colorful'],
    sensory: { texture: 82, sweetness: 82, richness: 68, aroma: 62 },
  },
  {
    id: 5,
    name: "Reese's Chocolate Chunk Cookie",
    category: 'Classic Cookies',
    price: 4,
    desc: "Peanut butter lovers, this one's for you. A rich chocolate cookie base topped with chunks of Reese's Peanut Butter Cups and chocolate chips—sweet, salty, and dangerously good.",
    emoji: '🥜',
    color: '#D4956A',
    image: '/products/single-reeses-chunk.jpg',
    notes: ["Reese's", 'peanut butter', 'chocolate chunk', 'sweet & salty'],
    sensory: { texture: 84, sweetness: 78, richness: 90, aroma: 72 },
    featured: true,
  },
  {
    id: 6,
    name: 'Gourmet Stuffed Cookie Box',
    category: 'Cookie Boxes',
    price: 33,
    desc: "A curated box of 6 thick, stuffed cookies—perfect for sampling your favorites or sharing (if you have to). Each cookie is baked fresh in small batches with a soft, gooey center and loaded with flavor in every bite. Choose from s'mores, M&M caramel, Oreo & Reese's, and more.",
    emoji: '📦',
    color: '#6B4E8C',
    image: '/products/gourmet-stuffed-box.jpg',
    notes: ["s'mores", 'M&M caramel', 'Oreo', "Reese's", 'stuffed', 'box of 6'],
    sensory: { texture: 92, sweetness: 85, richness: 92, aroma: 80 },
    featured: true,
  },
  {
    id: 7,
    name: 'Build Your Own Mini Cake',
    category: 'Mini Cakes',
    price: 8,
    desc: 'Personal cakes, fully loaded and made to match your cravings. Select your mini cake base, frosting flavor, 2 toppings, and syrup choice. A whole dessert experience in one hand-held package.',
    emoji: '🎂',
    color: '#9B7EBC',
    image: '/products/build-your-own-mini-cake.jpg',
    notes: ['customizable', 'frosting choice', '2 toppings', 'syrup drizzle', 'personal size'],
    sensory: { texture: 72, sweetness: 84, richness: 88, aroma: 76 },
    featured: true,
  },
];

export const CATEGORIES = ['All', 'Classic Cookies', 'Cookie Boxes', 'Mini Cakes'];
