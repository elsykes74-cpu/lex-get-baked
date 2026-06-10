-- lex-get-baked: initial schema
-- Run this once in Supabase SQL Editor to set up all tables

-- ── Menu items ────────────────────────────────────────────────────────────────
create table if not exists menu_items (
  id               serial primary key,
  name             text        not null,
  category         text        not null,
  price            numeric(6,2) not null,
  description      text        default '',
  emoji            text        default '🍪',
  color            text        default '#C9748F',
  image_url        text        default '',
  featured         boolean     default false,
  available        boolean     default true,
  sensory_texture  int         default 70,
  sensory_sweetness int        default 70,
  sensory_richness int         default 70,
  sensory_aroma    int         default 70,
  notes            text[]      default '{}',
  created_at       timestamptz default now()
);

-- ── Orders ────────────────────────────────────────────────────────────────────
create table if not exists orders (
  id               serial primary key,
  status           text        not null default 'pending'
    check (status in ('pending','confirmed','preparing','ready','delivered','cancelled')),
  delivery_type    text        not null default 'pickup',
  customer_name    text        default '',
  customer_email   text        default '',
  delivery_address text        default '',
  special_notes    text        default '',
  subtotal         numeric(8,2) not null default 0,
  delivery_fee     numeric(6,2) not null default 0,
  total            numeric(8,2) not null default 0,
  created_at       timestamptz default now()
);

-- ── Order line items ──────────────────────────────────────────────────────────
create table if not exists order_items (
  id           serial primary key,
  order_id     int  references orders(id) on delete cascade,
  menu_item_id int  references menu_items(id) on delete set null,
  item_name    text        not null,
  item_price   numeric(6,2) not null,
  quantity     int         not null default 1,
  size         text        default 'Regular'
);

-- ── Custom orders ─────────────────────────────────────────────────────────────
create table if not exists custom_orders (
  id         serial primary key,
  order_id   int  references orders(id) on delete cascade,
  base       text not null,
  filling    text not null,
  finish     text not null,
  size       text not null,
  quantity   int  not null default 1,
  unit_price numeric(6,2) not null
);

-- ── Row Level Security (public read for menu, no public write) ─────────────────
alter table menu_items  enable row level security;
alter table orders      enable row level security;
alter table order_items enable row level security;
alter table custom_orders enable row level security;

-- Allow anyone to read available menu items
create policy "Public can read available menu items"
  on menu_items for select
  using (available = true);

-- Allow anyone to insert an order (customers placing orders)
create policy "Anyone can place an order"
  on orders for insert
  with check (true);

create policy "Anyone can insert order items"
  on order_items for insert
  with check (true);

create policy "Anyone can insert custom orders"
  on custom_orders for insert
  with check (true);

-- Allow reading own order by id (used for order status page)
create policy "Anyone can read orders"
  on orders for select
  using (true);

-- ── Seed a few sample menu items ──────────────────────────────────────────────
insert into menu_items (name, category, price, description, emoji, color, featured, available, sensory_texture, sensory_sweetness, sensory_richness, sensory_aroma, notes)
values
  ('Velvet Stuffed Cookie', 'Cookies', 6.00,  'A thick, pillowy cookie stuffed with a dreamy cream cheese filling. Soft edges, crisp base.', '🍪', '#C9748F', true,  true, 88, 72, 85, 60, ARRAY['vanilla','cream cheese','brown sugar']),
  ('Rose Gold Mini Cake',   'Cakes',   12.00, 'A single-serving rose gold cake with champagne buttercream and edible gold leaf.', '🎂', '#D4956A', true,  true, 65, 80, 90, 75, ARRAY['champagne','rose water','buttercream']),
  ('Lavender Shortbread',   'Cookies', 4.00,  'Delicate French-style shortbread infused with dried lavender and lemon zest.', '🫐', '#9B7EBC', false, true, 40, 55, 65, 90, ARRAY['lavender','lemon','butter']),
  ('Champagne Cake Pop',    'Cake Pops', 3.50, 'Moist vanilla cake dipped in champagne white chocolate. Individually wrapped.', '🍭', '#EDD4A8', false, true, 55, 85, 70, 55, ARRAY['champagne','white chocolate','sprinkles']),
  ('Stuffed Brownie Box',   'Brownies', 18.00, 'A box of 4 fudge brownies stuffed with your choice of filling: Oreo, Biscoff, or PB.', '🍫', '#6B4E8C', true,  true, 90, 88, 95, 80, ARRAY['fudge','biscoff','dark chocolate']),
  ('Custom Cookie Set',     'Custom',  24.00, 'Fully custom decorated cookies — your design, colors, and message. Box of 6.', '✨', '#C9748F', true,  true, 75, 70, 75, 65, ARRAY['royal icing','custom design','gift box'])
on conflict do nothing;
