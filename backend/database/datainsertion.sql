-- =====================================================
-- STOCKSENSE MOCK DATA
-- =====================================================

-- =====================================================
-- 3. WAREHOUSES
-- =====================================================

INSERT INTO warehouse (name, short_code, address)
VALUES
    ('Main Warehouse', 'MW01', 'Industrial Area, Ludhiana, Punjab'),
    ('Secondary Warehouse', 'SW01', 'Sector 34, Chandigarh, Punjab'),
    ('Delhi Warehouse', 'DW01', 'Okhla Industrial Area, New Delhi')
ON CONFLICT DO NOTHING;


-- =====================================================
-- 4. LOCATIONS
-- =====================================================

-- Main Warehouse locations
INSERT INTO location
    (warehouse_id, parent_location_id, name, short_code)
SELECT
    w.id, NULL, 'Main Storage', 'MS01'
FROM warehouse w
WHERE w.short_code = 'MW01'
AND NOT EXISTS (
    SELECT 1 FROM location l
    WHERE l.name = 'Main Storage'
      AND l.warehouse_id = w.id
);

INSERT INTO location
    (warehouse_id, parent_location_id, name, short_code)
SELECT
    w.id, NULL, 'Receiving Area', 'REC01'
FROM warehouse w
WHERE w.short_code = 'MW01'
AND NOT EXISTS (
    SELECT 1 FROM location l
    WHERE l.name = 'Receiving Area'
      AND l.warehouse_id = w.id
);

INSERT INTO location
    (warehouse_id, parent_location_id, name, short_code)
SELECT
    w.id, NULL, 'Dispatch Area', 'DIS01'
FROM warehouse w
WHERE w.short_code = 'MW01'
AND NOT EXISTS (
    SELECT 1 FROM location l
    WHERE l.name = 'Dispatch Area'
      AND l.warehouse_id = w.id
);


-- Secondary Warehouse
INSERT INTO location
    (warehouse_id, parent_location_id, name, short_code)
SELECT
    w.id, NULL, 'Secondary Storage', 'SS01'
FROM warehouse w
WHERE w.short_code = 'SW01'
AND NOT EXISTS (
    SELECT 1 FROM location l
    WHERE l.name = 'Secondary Storage'
      AND l.warehouse_id = w.id
);


-- Delhi Warehouse
INSERT INTO location
    (warehouse_id, parent_location_id, name, short_code)
SELECT
    w.id, NULL, 'Delhi Storage', 'DS01'
FROM warehouse w
WHERE w.short_code = 'DW01'
AND NOT EXISTS (
    SELECT 1 FROM location l
    WHERE l.name = 'Delhi Storage'
      AND l.warehouse_id = w.id
);


-- =====================================================
-- 5. PARTNERS
-- =====================================================

INSERT INTO partner (name, type)
VALUES
    ('Tech Distributors Pvt Ltd', 'supplier'),
    ('ABC Electronics', 'supplier'),
    ('OfficeMart India', 'supplier'),
    ('XYZ Retail Store', 'customer'),
    ('Global IT Solutions', 'customer')
ON CONFLICT DO NOTHING;


-- =====================================================
-- 6. PRODUCTS
-- =====================================================

INSERT INTO product
    (name, sku, category_id, unit_of_measure, reorder_threshold, unit_cost)
SELECT
    'Dell Latitude 5440 Laptop',
    'LAP-DELL-5440',
    c.id,
    'units',
    5,
    65000
FROM category c
WHERE c.name = 'Computer Hardware'
AND NOT EXISTS (
    SELECT 1 FROM product WHERE sku = 'LAP-DELL-5440'
);


INSERT INTO product
    (name, sku, category_id, unit_of_measure, reorder_threshold, unit_cost)
SELECT
    'HP Wireless Keyboard',
    'KEY-HP-WL01',
    c.id,
    'units',
    10,
    1200
FROM category c
WHERE c.name = 'Computer Hardware'
AND NOT EXISTS (
    SELECT 1 FROM product WHERE sku = 'KEY-HP-WL01'
);


INSERT INTO product
    (name, sku, category_id, unit_of_measure, reorder_threshold, unit_cost)
SELECT
    'Logitech Wireless Mouse',
    'MOU-LOG-M185',
    c.id,
    'units',
    15,
    800
FROM category c
WHERE c.name = 'Computer Hardware'
AND NOT EXISTS (
    SELECT 1 FROM product WHERE sku = 'MOU-LOG-M185'
);


INSERT INTO product
    (name, sku, category_id, unit_of_measure, reorder_threshold, unit_cost)
SELECT
    'TP-Link WiFi Router',
    'RTR-TPL-001',
    c.id,
    'units',
    8,
    2500
FROM category c
WHERE c.name = 'Networking'
AND NOT EXISTS (
    SELECT 1 FROM product WHERE sku = 'RTR-TPL-001'
);


INSERT INTO product
    (name, sku, category_id, unit_of_measure, reorder_threshold, unit_cost)
SELECT
    'A4 Printer Paper',
    'PAP-A4-500',
    c.id,
    'reams',
    20,
    350
FROM category c
WHERE c.name = 'Office Supplies'
AND NOT EXISTS (
    SELECT 1 FROM product WHERE sku = 'PAP-A4-500'
);


INSERT INTO product
    (name, sku, category_id, unit_of_measure, reorder_threshold, unit_cost)
SELECT
    'Office Chair',
    'CHR-OFC-001',
    c.id,
    'units',
    5,
    7500
FROM category c
WHERE c.name = 'Furniture'
AND NOT EXISTS (
    SELECT 1 FROM product WHERE sku = 'CHR-OFC-001'
);


-- =====================================================
-- 7. STOCK
-- =====================================================

-- Laptop stock
INSERT INTO stock (product_id, location_id, quantity)
SELECT
    p.id,
    l.id,
    25
FROM product p
JOIN location l ON l.short_code = 'MS01'
WHERE p.sku = 'LAP-DELL-5440'
ON CONFLICT (product_id, location_id)
DO UPDATE SET quantity = EXCLUDED.quantity;


-- Keyboard stock
INSERT INTO stock (product_id, location_id, quantity)
SELECT
    p.id,
    l.id,
    80
FROM product p
JOIN location l ON l.short_code = 'MS01'
WHERE p.sku = 'KEY-HP-WL01'
ON CONFLICT (product_id, location_id)
DO UPDATE SET quantity = EXCLUDED.quantity;


-- Mouse stock
INSERT INTO stock (product_id, location_id, quantity)
SELECT
    p.id,
    l.id,
    120
FROM product p
JOIN location l ON l.short_code = 'MS01'
WHERE p.sku = 'MOU-LOG-M185'
ON CONFLICT (product_id, location_id)
DO UPDATE SET quantity = EXCLUDED.quantity;


-- Router stock
INSERT INTO stock (product_id, location_id, quantity)
SELECT
    p.id,
    l.id,
    35
FROM product p
JOIN location l ON l.short_code = 'SS01'
WHERE p.sku = 'RTR-TPL-001'
ON CONFLICT (product_id, location_id)
DO UPDATE SET quantity = EXCLUDED.quantity;


-- Printer paper
INSERT INTO stock (product_id, location_id, quantity)
SELECT
    p.id,
    l.id,
    15
FROM product p
JOIN location l ON l.short_code = 'MS01'
WHERE p.sku = 'PAP-A4-500'
ON CONFLICT (product_id, location_id)
DO UPDATE SET quantity = EXCLUDED.quantity;


-- Office chairs
INSERT INTO stock (product_id, location_id, quantity)
SELECT
    p.id,
    l.id,
    12
FROM product p
JOIN location l ON l.short_code = 'DS01'
WHERE p.sku = 'CHR-OFC-001'
ON CONFLICT (product_id, location_id)
DO UPDATE SET quantity = EXCLUDED.quantity;


-- =====================================================
-- 8. REORDERING RULES
-- =====================================================

INSERT INTO reordering_rule
    (product_id, warehouse_id, location_id, minimum_quantity, maximum_quantity)
SELECT
    p.id,
    w.id,
    l.id,
    5,
    50
FROM product p
JOIN warehouse w ON w.short_code = 'MW01'
JOIN location l ON l.short_code = 'MS01'
WHERE p.sku = 'LAP-DELL-5440'
ON CONFLICT (product_id, location_id)
DO UPDATE SET
    minimum_quantity = EXCLUDED.minimum_quantity,
    maximum_quantity = EXCLUDED.maximum_quantity;


INSERT INTO reordering_rule
    (product_id, warehouse_id, location_id, minimum_quantity, maximum_quantity)
SELECT
    p.id,
    w.id,
    l.id,
    20,
    150
FROM product p
JOIN warehouse w ON w.short_code = 'MW01'
JOIN location l ON l.short_code = 'MS01'
WHERE p.sku = 'KEY-HP-WL01'
ON CONFLICT (product_id, location_id)
DO UPDATE SET
    minimum_quantity = EXCLUDED.minimum_quantity,
    maximum_quantity = EXCLUDED.maximum_quantity;


INSERT INTO reordering_rule
    (product_id, warehouse_id, location_id, minimum_quantity, maximum_quantity)
SELECT
    p.id,
    w.id,
    l.id,
    25,
    200
FROM product p
JOIN warehouse w ON w.short_code = 'MW01'
JOIN location l ON l.short_code = 'MS01'
WHERE p.sku = 'MOU-LOG-M185'
ON CONFLICT (product_id, location_id)
DO UPDATE SET
    minimum_quantity = EXCLUDED.minimum_quantity,
    maximum_quantity = EXCLUDED.maximum_quantity;


-- =====================================================
-- 9. STOCK DOCUMENTS
-- =====================================================

-- Receipt document
INSERT INTO stock_document
    (
        type,
        status,
        warehouse_id,
        dest_location_id,
        partner_id,
        scheduled_date,
        created_by,
        responsible_id,
        reference,
        reason
    )
SELECT
    'receipt',
    'done',
    w.id,
    l.id,
    ptn.id,
    NOW() - INTERVAL '5 days',
    u.id,
    u.id,
    'REC-2026-001',
    'Initial stock receipt'
FROM warehouse w
JOIN location l ON l.short_code = 'REC01'
JOIN partner ptn ON ptn.name = 'Tech Distributors Pvt Ltd'
JOIN users u ON u.email = 'harleen@example.com'
WHERE w.short_code = 'MW01';


-- Delivery document
INSERT INTO stock_document
    (
        type,
        status,
        warehouse_id,
        source_location_id,
        partner_id,
        scheduled_date,
        created_by,
        responsible_id,
        reference,
        reason
    )
SELECT
    'delivery',
    'ready',
    w.id,
    l.id,
    ptn.id,
    NOW() + INTERVAL '2 days',
    u.id,
    u.id,
    'DEL-2026-001',
    'Customer order'
FROM warehouse w
JOIN location l ON l.short_code = 'MS01'
JOIN partner ptn ON ptn.name = 'XYZ Retail Store'
JOIN users u ON u.email = 'harleen@example.com'
WHERE w.short_code = 'MW01';


-- Transfer document
INSERT INTO stock_document
    (
        type,
        status,
        warehouse_id,
        source_location_id,
        dest_location_id,
        created_by,
        responsible_id,
        reference,
        reason
    )
SELECT
    'transfer',
    'waiting',
    w.id,
    source_l.id,
    dest_l.id,
    u.id,
    staff.id,
    'TRF-2026-001',
    'Move stock to secondary warehouse'
FROM warehouse w
JOIN location source_l ON source_l.short_code = 'MS01'
JOIN location dest_l ON dest_l.short_code = 'SS01'
JOIN users u ON u.email = 'harleen@example.com'
JOIN users staff ON staff.email = 'aman@example.com'
WHERE w.short_code = 'MW01';


-- Adjustment document
INSERT INTO stock_document
    (
        type,
        status,
        warehouse_id,
        source_location_id,
        created_by,
        responsible_id,
        reference,
        reason
    )
SELECT
    'adjustment',
    'done',
    w.id,
    l.id,
    u.id,
    u.id,
    'ADJ-2026-001',
    'Physical inventory correction'
FROM warehouse w
JOIN location l ON l.short_code = 'MS01'
JOIN users u ON u.email = 'harleen@example.com'
WHERE w.short_code = 'MW01';


-- =====================================================
-- 10. STOCK DOCUMENT LINES
-- =====================================================

-- Receipt line
INSERT INTO stock_document_line
    (document_id, product_id, quantity, expected_quantity, received_quantity)
SELECT
    sd.id,
    p.id,
    30,
    30,
    30
FROM stock_document sd
JOIN product p ON p.sku = 'LAP-DELL-5440'
WHERE sd.reference = 'REC-2026-001';


-- Delivery line
INSERT INTO stock_document_line
    (document_id, product_id, quantity, requested_quantity, picked_quantity, packed_quantity)
SELECT
    sd.id,
    p.id,
    10,
    10,
    10,
    10
FROM stock_document sd
JOIN product p ON p.sku = 'KEY-HP-WL01'
WHERE sd.reference = 'DEL-2026-001';


-- Transfer line
INSERT INTO stock_document_line
    (document_id, product_id, quantity, requested_quantity, picked_quantity, packed_quantity)
SELECT
    sd.id,
    p.id,
    20,
    20,
    20,
    20
FROM stock_document sd
JOIN product p ON p.sku = 'MOU-LOG-M185'
WHERE sd.reference = 'TRF-2026-001';


-- Adjustment line
INSERT INTO stock_document_line
    (document_id, product_id, quantity, system_quantity, counted_quantity)
SELECT
    sd.id,
    p.id,
    115,
    120,
    115
FROM stock_document sd
JOIN product p ON p.sku = 'MOU-LOG-M185'
WHERE sd.reference = 'ADJ-2026-001';


-- =====================================================
-- 11. STOCK LEDGER
-- =====================================================

INSERT INTO stock_ledger
    (product_id, location_id, quantity_delta, document_id)
SELECT
    p.id,
    l.id,
    30,
    sd.id
FROM product p
JOIN location l ON l.short_code = 'MS01'
JOIN stock_document sd ON sd.reference = 'REC-2026-001'
WHERE p.sku = 'LAP-DELL-5440';


INSERT INTO stock_ledger
    (product_id, location_id, quantity_delta, document_id)
SELECT
    p.id,
    l.id,
    -10,
    sd.id
FROM product p
JOIN location l ON l.short_code = 'MS01'
JOIN stock_document sd ON sd.reference = 'DEL-2026-001'
WHERE p.sku = 'KEY-HP-WL01';


INSERT INTO stock_ledger
    (product_id, location_id, quantity_delta, document_id)
SELECT
    p.id,
    l.id,
    -20,
    sd.id
FROM product p
JOIN location l ON l.short_code = 'MS01'
JOIN stock_document sd ON sd.reference = 'TRF-2026-001'
WHERE p.sku = 'MOU-LOG-M185';


INSERT INTO stock_ledger
    (product_id, location_id, quantity_delta, document_id)
SELECT
    p.id,
    l.id,
    -5,
    sd.id
FROM product p
JOIN location l ON l.short_code = 'MS01'
JOIN stock_document sd ON sd.reference = 'ADJ-2026-001'
WHERE p.sku = 'MOU-LOG-M185';

