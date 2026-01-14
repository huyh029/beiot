-- ================================
-- SMART GARDEN DATABASE SCHEMA
-- ================================

CREATE DATABASE IF NOT EXISTS smart_garden
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE smart_garden;

-- ================================
-- 1. USERS
-- ================================
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'MANAGER', 'USER') DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ================================
-- 2. HOUSES (GARDEN)
-- ================================
CREATE TABLE houses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    owner_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_house_owner
        FOREIGN KEY (owner_id) REFERENCES users(id)
        ON DELETE CASCADE
);

-- ================================
-- 3. HOUSE MEMBERS (N-N)
-- ================================
CREATE TABLE house_members (
    house_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    role ENUM('OWNER', 'MEMBER') DEFAULT 'MEMBER',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (house_id, user_id),

    CONSTRAINT fk_hm_house
        FOREIGN KEY (house_id) REFERENCES houses(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_hm_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
);

-- ================================
-- 4. DEVICES
-- ================================
CREATE TABLE devices (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    house_id BIGINT NOT NULL,
    device_code VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(100),
    location VARCHAR(100),
    status ENUM('ONLINE', 'OFFLINE') DEFAULT 'OFFLINE',
    last_seen TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_device_house
        FOREIGN KEY (house_id) REFERENCES houses(id)
        ON DELETE CASCADE
);

-- ================================
-- 5. SENSOR DATA
-- ================================
CREATE TABLE sensor_data (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    device_id BIGINT NOT NULL,

    temperature FLOAT,
    humidity FLOAT,
    soil_moisture FLOAT,
    light FLOAT,
    wind_speed FLOAT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_sensor_device
        FOREIGN KEY (device_id) REFERENCES devices(id)
        ON DELETE CASCADE
);

-- ================================
-- 6. ALERTS
-- ================================
CREATE TABLE alerts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    house_id BIGINT NOT NULL,
    device_id BIGINT NULL,

    type VARCHAR(50),
    message TEXT,
    level ENUM('INFO', 'WARNING', 'CRITICAL') DEFAULT 'INFO',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_alert_house
        FOREIGN KEY (house_id) REFERENCES houses(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_alert_device
        FOREIGN KEY (device_id) REFERENCES devices(id)
        ON DELETE SET NULL
);

-- ================================
-- 7. EVENTS
-- ================================
CREATE TABLE events (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    house_id BIGINT NOT NULL,
    device_id BIGINT NULL,

    event_type VARCHAR(100),
    description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_event_house
        FOREIGN KEY (house_id) REFERENCES houses(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_event_device
        FOREIGN KEY (device_id) REFERENCES devices(id)
        ON DELETE SET NULL
);

-- ================================
-- 8. PLANTS 
-- ================================
CREATE TABLE plants (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    house_id BIGINT NOT NULL,
    zone_id BIGINT NOT NULL,

    plant_type VARCHAR(100) NOT NULL,
    variety VARCHAR(100),

    planting_date DATE,
    expected_harvest_date DATE,

    moisture_min INT,
    moisture_max INT,

    light_min INT,
    light_max INT,

    temperature_min INT,
    temperature_max INT,

    notes TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_plants_house
        FOREIGN KEY (house_id) REFERENCES houses(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_plants_zone
        FOREIGN KEY (zone_id) REFERENCES plant_zones(id)
        ON DELETE CASCADE
);

CREATE TABLE plant_zones (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    house_id BIGINT NOT NULL,

    name VARCHAR(100) NOT NULL,
    description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_zone_house
        FOREIGN KEY (house_id) REFERENCES houses(id)
        ON DELETE CASCADE
);
ALTER TABLE plant_zones
ADD COLUMN area_m2 DECIMAL(10,2) NULL AFTER description;

