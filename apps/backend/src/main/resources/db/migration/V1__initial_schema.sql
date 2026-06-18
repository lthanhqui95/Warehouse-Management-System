CREATE TABLE app_user (
    id UUID PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(180) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(40) NOT NULL,
    status VARCHAR(30) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE product (
    id UUID PRIMARY KEY,
    sku VARCHAR(80) NOT NULL UNIQUE,
    name VARCHAR(180) NOT NULL,
    category VARCHAR(120),
    unit VARCHAR(40) NOT NULL,
    barcode VARCHAR(120),
    purchase_price NUMERIC(14, 2) NOT NULL DEFAULT 0,
    selling_price NUMERIC(14, 2) NOT NULL DEFAULT 0,
    expiration_date DATE,
    status VARCHAR(30) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE warehouse (
    id UUID PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    code VARCHAR(40) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE warehouse_location (
    id UUID PRIMARY KEY,
    warehouse_id UUID NOT NULL REFERENCES warehouse(id),
    shelf VARCHAR(80) NOT NULL,
    bin VARCHAR(80) NOT NULL,
    UNIQUE (warehouse_id, shelf, bin)
);

CREATE TABLE inventory_balance (
    id UUID PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES product(id),
    location_id UUID NOT NULL REFERENCES warehouse_location(id),
    quantity NUMERIC(14, 3) NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (product_id, location_id)
);

CREATE TABLE inventory_request (
    id UUID PRIMARY KEY,
    requested_by UUID NOT NULL REFERENCES app_user(id),
    approved_by UUID REFERENCES app_user(id),
    status VARCHAR(30) NOT NULL,
    reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE inventory_request_item (
    id UUID PRIMARY KEY,
    request_id UUID NOT NULL REFERENCES inventory_request(id),
    product_id UUID NOT NULL REFERENCES product(id),
    quantity NUMERIC(14, 3) NOT NULL
);

CREATE TABLE inventory_transaction (
    id UUID PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES product(id),
    location_id UUID NOT NULL REFERENCES warehouse_location(id),
    request_id UUID REFERENCES inventory_request(id),
    transaction_type VARCHAR(30) NOT NULL,
    quantity NUMERIC(14, 3) NOT NULL,
    supplier VARCHAR(180),
    performed_by UUID NOT NULL REFERENCES app_user(id),
    note TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE audit_event (
    id UUID PRIMARY KEY,
    actor_id UUID REFERENCES app_user(id),
    action VARCHAR(120) NOT NULL,
    entity_type VARCHAR(80) NOT NULL,
    entity_id UUID,
    details JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
