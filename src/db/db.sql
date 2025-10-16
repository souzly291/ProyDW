CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name_f VARCHAR(100) NOT NULL,
    last_name_m VARCHAR(100),
    birth_date DATE,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    phone VARCHAR(20) UNIQUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    bit_status BOOLEAN DEFAULT TRUE
);