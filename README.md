# Ratings & Review Web App

A Flipkart-style full-stack product rating and review platform built with **Next.js**, **TypeScript**, and **Supabase**.

---

##  Tech Stack Used

| Layer                | Technology                                                   |
| -------------------- | ------------------------------------------------------------ |
| Frontend             | **Next.js** (App Router) + **TypeScript** + **Tailwind CSS** |
| Backend-as-a-Service | **Supabase** (PostgreSQL  + Storage)                   |
| Database             | **Supabase RDBMS (PostgreSQL)**                              |
| Storage              | **Supabase Storage** (for review images)                     |
| Deployment           | **Vercel** (frontend) + Supabase (serverless backend)        |

---

##  Why Supabase Instead of Manual PostgreSQL?

> Supabase *is* PostgreSQL under the hood, but offers serverless convenience and tooling.

###  Key Benefits of Supabase:

* **PostgreSQL-compatible RDBMS** (uses real Postgres)
* **Serverless**: No need to manage your own server, scaling is handled automatically
* Built-in **Auth**, **Realtime**, **Storage**, and **Edge Functions**
* Works seamlessly with frontend tools like Next.js
* Integrated **SQL Editor**, **Row-Level Security**, and **Dashboards**
* Ideal for rapid prototyping *and* production-grade apps

###  Why not just PostgreSQL?

* Requires manual hosting, backups, and scaling infrastructure
* No built-in storage bucket for image uploads
* No integrated row-level security or auth out of the box

---

## 🗃 Database Schema Overview

### `products` Table

```sql
id UUID PRIMARY KEY DEFAULT gen_random_uuid()
name TEXT
brand TEXT
category TEXT
description TEXT
price NUMERIC
image_url TEXT
created_at TIMESTAMP DEFAULT now()
```

### `reviews` Table

```sql
id UUID PRIMARY KEY DEFAULT gen_random_uuid()
product_id UUID REFERENCES products(id) ON DELETE CASCADE
user_name TEXT
rating INTEGER CHECK (rating BETWEEN 1 AND 5)
review_text TEXT
image_url TEXT
created_at TIMESTAMP DEFAULT now()
```

---

##  Security & Policies (RLS)

Supabase enforces **Row-Level Security** (RLS) by default.

### Policies Created:

* Allow `INSERT` and `SELECT` on `reviews` table for `public` role
* Allow `INSERT` and `SELECT` on `review-images` storage bucket

This allows anyone (even unauthenticated users) to write and view reviews and upload images.

---

##  Performance Optimization with Indexing

### 1. **Index on `product_id` in `reviews` table**

```sql
CREATE INDEX idx_product_id ON reviews(product_id);
```

>  Speeds up lookup when displaying all reviews for a specific product.

### 2. **Avoid N+1 Queries by Aggregating Ratings**

Ratings (avg, count) are calculated on the server and passed to the UI to reduce computation.

---

##  Image Handling

* Images uploaded via file input or drag/drop area
* Stored in Supabase **Storage bucket** (`review-images`)
* Made **publicly accessible** using RLS policies

---


##  Local Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/RickDeb2004/Product_Review/edit/main/README.md
 
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```



### 4. Run the Development Server

```bash
npm run dev
```

Open your browser at `http://localhost:3000` to view the website.

---

##  Prerequisites

* Node.js >= 18
* Supabase project with the correct schema and policies in place
* Supabase bucket named `review-images` with public upload access

