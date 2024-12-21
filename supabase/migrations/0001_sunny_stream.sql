/*
  # Initial Schema Setup for Pricing Management System

  1. New Tables
    - users (managed by Supabase Auth)
    - products
      - id (uuid, primary key)
      - catalog_number (text)
      - description (text)
      - uom (text)
      - product_group (text)
      - quantity_break (integer)
      - us_list_price_2025 (decimal)
      - distributor_transfer_price_2025 (decimal)
      - created_at (timestamp)
      - created_by (uuid, references auth.users)
    - user_roles
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - role (text)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users based on roles
*/

-- Products table
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  catalog_number text NOT NULL,
  description text,
  uom text,
  product_group text,
  quantity_break integer,
  us_list_price_2025 decimal(10,2),
  distributor_transfer_price_2025 decimal(10,2),
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- User roles table
CREATE TABLE user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  role text NOT NULL CHECK (role IN ('admin', 'viewer')),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Policies for products
CREATE POLICY "Users can view products"
  ON products
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

-- Policies for user_roles
CREATE POLICY "Admins can manage roles"
  ON user_roles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );