-- M4 Movers database schema (PostgreSQL)

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id                        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name                 VARCHAR(150) NOT NULL,
  email                     VARCHAR(190) NOT NULL UNIQUE,
  phone                     VARCHAR(30)  NOT NULL,
  password_hash             VARCHAR(255) NOT NULL,
  role                      VARCHAR(20)  NOT NULL DEFAULT 'customer', -- 'customer' | 'admin'
  is_verified               BOOLEAN NOT NULL DEFAULT FALSE,
  verification_code         VARCHAR(6),
  verification_code_expires TIMESTAMPTZ,
  reset_code                VARCHAR(6),
  reset_code_expires        TIMESTAMPTZ,
  status                    VARCHAR(20) NOT NULL DEFAULT 'active', -- active | blocked | inactive
  created_at                TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at                TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Covers both the "Request a Free Quote" form and general contact messages
-- (the Contact page form on the site captures full quote details).
CREATE TABLE IF NOT EXISTS contact_requests (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID REFERENCES users(id) ON DELETE SET NULL,
  full_name           VARCHAR(150) NOT NULL,
  email               VARCHAR(190) NOT NULL,
  phone               VARCHAR(30)  NOT NULL,
  company             VARCHAR(150),
  service             VARCHAR(150),
  moving_date         DATE,
  pickup_address      VARCHAR(255),
  destination_address VARCHAR(255),
  message             TEXT,
  status              VARCHAR(20) NOT NULL DEFAULT 'new', -- new | read | replied
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Logs every time a visitor opens WhatsApp from the site, along with
-- whatever contact info we have for them, so the admin gets a record too.
CREATE TABLE IF NOT EXISTS whatsapp_clicks (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES users(id) ON DELETE SET NULL,
  name        VARCHAR(150),
  email       VARCHAR(190),
  phone       VARCHAR(30),
  source_page VARCHAR(120),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contact_requests_created_at ON contact_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_whatsapp_clicks_created_at ON whatsapp_clicks (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
