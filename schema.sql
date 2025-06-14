create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  image_url text,
  category text,
  brand text,
  price numeric,
  created_at timestamp default now()
);

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  user_name text,
  rating integer check (rating >= 1 and rating <= 5),
  review_text text,
  image_url text,
  created_at timestamp default now()
);

create index if not exists idx_product_id on reviews (product_id);
