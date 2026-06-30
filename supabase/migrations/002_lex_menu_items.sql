-- Replace sample items with Lex's actual menu from her Bakesy shop
-- Run in Supabase SQL Editor after 001_initial_schema.sql

-- Clear the placeholder seed items first
delete from menu_items;

-- Reset the id sequence so items start from 1
alter sequence menu_items_id_seq restart with 1;

insert into menu_items
  (name, category, price, description, emoji, color, image_url, featured, available,
   sensory_texture, sensory_sweetness, sensory_richness, sensory_aroma, notes)
values
  (
    'Classic Chocolate Chip Cookie',
    'Classic Cookies',
    4.00,
    'Just a little something to take the edge off—warm, gooey, and all yours. A bakery-style chocolate chip cookie baked fresh in small batches with a soft center and crispy golden edges.',
    '🍪', '#D4956A',
    '/products/single-classic-choc-chip.jpg',
    true, true, 85, 75, 72, 68,
    ARRAY['chocolate chip','brown butter','sea salt']
  ),
  (
    'Double Chocolate Dream Cookie',
    'Classic Cookies',
    4.00,
    'A deep, fudgy chocolate cookie loaded with melty chocolate chips. Intense cocoa flavor with a soft, brownie-like center that stays gooey long after it cools.',
    '🍫', '#6B4E8C',
    '/products/single-double-chocolate.jpg',
    false, true, 88, 80, 95, 78,
    ARRAY['double chocolate','cocoa','fudgy']
  ),
  (
    'Birthday Cake Bliss Cookie',
    'Classic Cookies',
    4.00,
    'All the joy of birthday cake packed into one thick, chewy cookie. Loaded with rainbow sprinkles and white chocolate chips, with a hint of vanilla cake flavor in every bite.',
    '🎂', '#C9748F',
    '/products/single-birthday-cake.jpg',
    false, true, 80, 88, 70, 65,
    ARRAY['funfetti','sprinkles','white chocolate','vanilla']
  ),
  (
    'M&M Crunch Cookie',
    'Classic Cookies',
    4.00,
    'Colorful, crunchy, and impossible to resist. A classic cookie base packed with a generous handful of M&Ms for a pop of color and a satisfying crunch in every bite.',
    '🌈', '#C9748F',
    '/products/single-mm-crunch.jpg',
    false, true, 82, 82, 68, 62,
    ARRAY['M&M','candy-coated','crunchy','colorful']
  ),
  (
    'Reese''s Chocolate Chunk Cookie',
    'Classic Cookies',
    4.00,
    'Peanut butter lovers, this one''s for you. A rich chocolate cookie base topped with chunks of Reese''s Peanut Butter Cups and chocolate chips—sweet, salty, and dangerously good.',
    '🥜', '#D4956A',
    '/products/single-reeses-chunk.jpg',
    true, true, 84, 78, 90, 72,
    ARRAY['Reese''s','peanut butter','chocolate chunk','sweet & salty']
  ),
  (
    'Gourmet Stuffed Cookie Box',
    'Cookie Boxes',
    33.00,
    'A curated box of 6 thick, stuffed cookies—perfect for sampling your favorites or sharing (if you have to). Each cookie is baked fresh in small batches with a soft, gooey center and loaded with flavor in every bite. Choose from s''mores, M&M caramel, Oreo & Reese''s, and more.',
    '📦', '#6B4E8C',
    '/products/gourmet-stuffed-box.jpg',
    true, true, 92, 85, 92, 80,
    ARRAY['stuffed','s''mores','M&M','Oreo','caramel','box of 6']
  ),
  (
    'Build Your Own Mini Cake',
    'Mini Cakes',
    8.00,
    'Personal cakes, fully loaded and made to match your cravings. Select your mini cake base, frosting flavor, 2 toppings, and syrup choice. A whole dessert experience in one hand-held package.',
    '🎂', '#9B7EBC',
    '/products/build-your-own-mini-cake.jpg',
    true, true, 72, 84, 88, 76,
    ARRAY['customizable','frosting choice','2 toppings','syrup drizzle','personal size']
  ),
  (
    'Custom Order — Event Catering',
    'Events',
    0.00,
    'Planning a birthday, baby shower, wedding, or corporate event? Lex will work with you to create a custom dessert spread tailored to your theme. Pricing varies based on quantity and design. Reach out to get a quote.',
    '✨', '#C9748F',
    '',
    false, true, 75, 75, 75, 75,
    ARRAY['custom design','events','catering','birthdays','weddings','baby showers','corporate']
  );
