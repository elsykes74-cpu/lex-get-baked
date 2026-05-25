-- ── Lex Get Baked — Supabase Schema ─────────────────────────────────────────

-- Menu items (managed via admin panel)
create table if not exists menu_items (
  id          bigint generated always as identity primary key,
  name        text        not null,
  category    text        not null,
  price       numeric(6,2) not null,
  description text,
  emoji       text,
  color       text        default '#C9748F',
  image_url   text,
  featured    boolean     default false,
  available   boolean     default true,
  sensory_texture   int  default 75 check (sensory_texture   between 0 and 100),
  sensory_sweetness int  default 75 check (sensory_sweetness between 0 and 100),
  sensory_richness  int  default 75 check (sensory_richness  between 0 and 100),
  sensory_aroma     int  default 75 check (sensory_aroma     between 0 and 100),
  notes       text[]      default '{}',
  created_at  timestamptz default now()
);

-- Orders
create table if not exists orders (
  id              bigint generated always as identity primary key,
  status          text    default 'pending'
                          check (status in ('pending','confirmed','preparing','ready','delivered','cancelled')),
  delivery_type   text    default 'standard'
                          check (delivery_type in ('standard','express','quantum','pickup')),
  customer_name   text,
  customer_email  text,
  delivery_address text,
  special_notes   text,
  subtotal        numeric(8,2) not null,
  delivery_fee    numeric(6,2) default 0,
  total           numeric(8,2) not null,
  created_at      timestamptz  default now(),
  updated_at      timestamptz  default now()
);

-- Order line items
create table if not exists order_items (
  id          bigint generated always as identity primary key,
  order_id    bigint not null references orders(id) on delete cascade,
  menu_item_id bigint references menu_items(id),
  item_name   text not null,
  item_price  numeric(6,2) not null,
  quantity    int  not null default 1,
  size        text,
  customizations jsonb default '{}'
);

-- Custom formulation orders
create table if not exists custom_orders (
  id          bigint generated always as identity primary key,
  order_id    bigint references orders(id) on delete cascade,
  base        text,
  filling     text,
  finish      text,
  size        text,
  quantity    int default 1,
  unit_price  numeric(6,2)
);

-- ── RLS (open for now — lock down before production) ─────────────────────────
alter table menu_items   enable row level security;
alter table orders       enable row level security;
alter table order_items  enable row level security;
alter table custom_orders enable row level security;

-- Allow anon read on menu
create policy "public read menu"    on menu_items   for select using (true);
-- Allow anon insert on orders
create policy "public insert orders" on orders      for insert with check (true);
create policy "public insert order_items" on order_items for insert with check (true);
create policy "public insert custom_orders" on custom_orders for insert with check (true);
-- Allow reading own orders by email (simple — replace with auth later)
create policy "read own orders" on orders for select using (true);

-- ── Seed menu data ────────────────────────────────────────────────────────────
insert into menu_items (name, category, price, description, emoji, color, image_url, featured,
  sensory_texture, sensory_sweetness, sensory_richness, sensory_aroma, notes)
values
  ('Velvet Stuffed Cookie','Cookies',6,'Thick, chewy, filled with Nutella ganache. Crisp edges, gooey center.','🍪','#C9748F',
   'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80',true,90,75,85,80,ARRAY['gluten-free option','nut-free option']),
  ('Rose Gold Mini Cake','Cakes',12,'Three-layer vanilla sponge, rose lychee compote, champagne buttercream.','🎂','#C4965A',
   'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80',true,85,80,70,95,ARRAY['contains gluten','contains dairy']),
  ('Lavender Crème Brûlée','Seasonal',9,'House-made lavender custard, caramelized sugar crust, edible florals.','🫙','#9B7EBC',
   'https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?w=600&q=80',true,75,65,90,100,ARRAY['seasonal','contains eggs']),
  ('Brown Butter Financier','Cakes',5,'French almond cake, noisette brown butter, fleur de sel finish.','🧁','#C4965A',
   'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&q=80',false,80,60,95,85,ARRAY['contains nuts','contains gluten']),
  ('Matcha Cloud Cookie','Cookies',6,'Ceremonial grade matcha, white chocolate chips, sea salt.','🍵','#6B8C7A',
   'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&q=80',false,85,55,65,90,ARRAY['vegan option']),
  ('Tahini Date Blondie','Vegan',7,'100% plant-based, medjool dates, sesame tahini, toasted walnut.','🟫','#C4965A',
   'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80',false,70,70,80,75,ARRAY['vegan','refined sugar-free']),
  ('Strawberry Basil Tart','Seasonal',10,'Pâte sucrée shell, vanilla pastry cream, fresh strawberries, basil oil.','🍓','#C9748F',
   'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80',false,82,78,72,93,ARRAY['seasonal','contains gluten']),
  ('Salted Caramel Truffle','Cookies',4,'Dark chocolate ganache, salted caramel center, cocoa dusted exterior.','🍫','#C9748F',
   'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=600&q=80',true,88,72,98,92,ARRAY['vegan option','gluten-free']);
