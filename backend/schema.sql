-- Enable UUID generation (Postgres 13+ has gen_random_uuid() built in;
-- run this line only if you get a "function does not exist" error)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. users (replaces Supabase's auth.users + profiles, combined into one table)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(30) NOT NULL,              -- 'inventory_manager' | 'warehouse_staff'
  otp_code VARCHAR(6),                     -- current password-reset OTP, null when unused
  otp_expires_at TIMESTAMP,                -- OTP validity window
  created_at TIMESTAMP DEFAULT NOW()
);

-- 2. category
CREATE TABLE category (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL
);

-- 3. warehouse
CREATE TABLE warehouse (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL
);

-- 4. location
CREATE TABLE location (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  warehouse_id UUID REFERENCES warehouse(id),
  parent_location_id UUID REFERENCES location(id),
  name VARCHAR(100) NOT NULL
);

-- 5. partner (suppliers & customers)
CREATE TABLE partner (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(150) NOT NULL,
  type VARCHAR(20) NOT NULL                -- 'supplier' | 'customer'
);

-- 6. product
CREATE TABLE product (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(150) NOT NULL,
  sku VARCHAR(50) UNIQUE NOT NULL,
  category_id UUID REFERENCES category(id),
  unit_of_measure VARCHAR(20) NOT NULL,
  reorder_threshold INT DEFAULT 0
);

-- 7. stock (current snapshot per product per location)
CREATE TABLE stock (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES product(id),
  location_id UUID REFERENCES location(id),
  quantity NUMERIC NOT NULL DEFAULT 0,
  UNIQUE(product_id, location_id)
);

-- 8. stock_document (receipts, deliveries, transfers, adjustments)
CREATE TABLE stock_document (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(20) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'draft',
  warehouse_id UUID REFERENCES warehouse(id),
  source_location_id UUID REFERENCES location(id),
  dest_location_id UUID REFERENCES location(id),
  partner_id UUID REFERENCES partner(id),
  scheduled_date TIMESTAMP,
  created_by UUID REFERENCES users(id),     -- now points to local users table
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 9. stock_document_line
CREATE TABLE stock_document_line (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID REFERENCES stock_document(id) ON DELETE CASCADE,
  product_id UUID REFERENCES product(id),
  quantity NUMERIC NOT NULL
);

-- 10. stock_ledger
CREATE TABLE stock_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES product(id),
  location_id UUID REFERENCES location(id),
  quantity_delta NUMERIC NOT NULL,
  document_id UUID REFERENCES stock_document(id),
  created_at TIMESTAMP DEFAULT NOW()
);