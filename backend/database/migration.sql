-- =====================================================
-- STOCKSENSE DATABASE MIGRATION
-- =====================================================

-- Make sure UUID generation exists
CREATE EXTENSION IF NOT EXISTS "pgcrypto";


-- =====================================================
-- CATEGORY
-- =====================================================

ALTER TABLE category
ADD COLUMN IF NOT EXISTS description TEXT;


-- =====================================================
-- WAREHOUSE
-- =====================================================

ALTER TABLE warehouse
ADD COLUMN IF NOT EXISTS short_code VARCHAR(20);

ALTER TABLE warehouse
ADD COLUMN IF NOT EXISTS address TEXT;


-- =====================================================
-- LOCATION
-- =====================================================

ALTER TABLE location
ADD COLUMN IF NOT EXISTS short_code VARCHAR(20);


-- =====================================================
-- PRODUCT
-- =====================================================

ALTER TABLE product
ADD COLUMN IF NOT EXISTS unit_cost NUMERIC(12,2) NOT NULL DEFAULT 0;


-- =====================================================
-- STOCK DOCUMENT
-- =====================================================

ALTER TABLE stock_document
ADD COLUMN IF NOT EXISTS reference VARCHAR(50);

ALTER TABLE stock_document
ADD COLUMN IF NOT EXISTS responsible_id UUID;

ALTER TABLE stock_document
ADD COLUMN IF NOT EXISTS reason TEXT;


-- =====================================================
-- RESPONSIBLE USER FOREIGN KEY
-- =====================================================

ALTER TABLE stock_document
ADD CONSTRAINT fk_stock_document_responsible
FOREIGN KEY (responsible_id)
REFERENCES users(id);


-- =====================================================
-- STOCK DOCUMENT LINE
-- =====================================================

ALTER TABLE stock_document_line
ADD COLUMN IF NOT EXISTS expected_quantity NUMERIC;

ALTER TABLE stock_document_line
ADD COLUMN IF NOT EXISTS received_quantity NUMERIC;

ALTER TABLE stock_document_line
ADD COLUMN IF NOT EXISTS requested_quantity NUMERIC;

ALTER TABLE stock_document_line
ADD COLUMN IF NOT EXISTS picked_quantity NUMERIC;

ALTER TABLE stock_document_line
ADD COLUMN IF NOT EXISTS packed_quantity NUMERIC;

ALTER TABLE stock_document_line
ADD COLUMN IF NOT EXISTS system_quantity NUMERIC;

ALTER TABLE stock_document_line
ADD COLUMN IF NOT EXISTS counted_quantity NUMERIC;


-- =====================================================
-- REORDERING RULES
-- =====================================================

CREATE TABLE IF NOT EXISTS reordering_rule (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    product_id UUID NOT NULL
        REFERENCES product(id)
        ON DELETE CASCADE,

    warehouse_id UUID NOT NULL
        REFERENCES warehouse(id)
        ON DELETE CASCADE,

    location_id UUID NOT NULL
        REFERENCES location(id)
        ON DELETE CASCADE,

    minimum_quantity NUMERIC NOT NULL DEFAULT 0,

    maximum_quantity NUMERIC NOT NULL DEFAULT 0,

    created_at TIMESTAMP DEFAULT NOW(),

    updated_at TIMESTAMP DEFAULT NOW(),

    UNIQUE(product_id, location_id),

    CHECK (minimum_quantity >= 0),

    CHECK (maximum_quantity >= minimum_quantity)
);


-- =====================================================
-- STOCK CONSTRAINT
-- =====================================================

ALTER TABLE stock
ADD CONSTRAINT stock_quantity_non_negative
CHECK (quantity >= 0);


-- =====================================================
-- DOCUMENT TYPE
-- =====================================================

ALTER TABLE stock_document
ADD CONSTRAINT stock_document_type_check
CHECK (
    type IN (
        'receipt',
        'delivery',
        'transfer',
        'adjustment'
    )
);


-- =====================================================
-- DOCUMENT STATUS
-- =====================================================

ALTER TABLE stock_document
ADD CONSTRAINT stock_document_status_check
CHECK (
    status IN (
        'draft',
        'waiting',
        'ready',
        'done',
        'canceled'
    )
);


-- =====================================================
-- PARTNER TYPE
-- =====================================================

ALTER TABLE partner
ADD CONSTRAINT partner_type_check
CHECK (
    type IN (
        'supplier',
        'customer'
    )
);


-- =====================================================
-- USER ROLE
-- =====================================================

ALTER TABLE users
ADD CONSTRAINT users_role_check
CHECK (
    role IN (
        'inventory_manager',
        'warehouse_staff'
    )
);


-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_stock_product
ON stock(product_id);

CREATE INDEX IF NOT EXISTS idx_stock_location
ON stock(location_id);

CREATE INDEX IF NOT EXISTS idx_stock_document_type
ON stock_document(type);

CREATE INDEX IF NOT EXISTS idx_stock_document_status
ON stock_document(status);

CREATE INDEX IF NOT EXISTS idx_stock_document_created_by
ON stock_document(created_by);

CREATE INDEX IF NOT EXISTS idx_stock_document_responsible
ON stock_document(responsible_id);

CREATE INDEX IF NOT EXISTS idx_stock_document_line_document
ON stock_document_line(document_id);

CREATE INDEX IF NOT EXISTS idx_stock_document_line_product
ON stock_document_line(product_id);

CREATE INDEX IF NOT EXISTS idx_stock_ledger_product
ON stock_ledger(product_id);

CREATE INDEX IF NOT EXISTS idx_stock_ledger_location
ON stock_ledger(location_id);

CREATE INDEX IF NOT EXISTS idx_stock_ledger_document
ON stock_ledger(document_id);

CREATE INDEX IF NOT EXISTS idx_location_warehouse
ON location(warehouse_id);