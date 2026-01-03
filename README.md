qq# SMART GARDEN – BACKEND API (NODE.JS)

Backend API cho hệ thống **Smart Garden / Smart Agriculture**, phục vụ thu thập dữ liệu cảm biến, điều khiển thiết bị IoT, cảnh báo và lưu lịch sử hoạt động thông qua REST API kết hợp MQTT.

## Giới thiệu

Hệ thống Smart Garden cho phép:

        - Theo dõi dữ liệu môi trường (nhiệt độ, độ ẩm, ánh sáng, độ ẩm đất…)

        - Điều khiển thiết bị (bơm nước, đèn, quạt…)

        - Tự động cảnh báo khi thông số vượt ngưỡng

        - Lưu lịch sử hoạt động để phục vụ thống kê và giám sát

Backend được xây dựng bằng Node.js, phù hợp với các hệ thống IoT thời gian thực.

## Kiến trúc hệ thống
        Thiết bị IoT (ESP32 / Arduino)
                |
                | MQTT
                v
        MQTT Broker (HiveMQ)
                |
                v
        Backend API (Node.js + Express)
                |
                v
        Cơ sở dữ liệu MySQL
                |
                v
        Ứng dụng Mobile / Web

## Công nghệ sử dụng

Node.js

Express.js

MQTT (mqtt.js)

MySQL

JWT Authentication

RESTful API

Mô hình MVC

## Các chức năng chính của API
### 1. Authentication

Đăng nhập hệ thống

Xác thực bằng JWT

### 2. Collect Data (Thu thập dữ liệu)

Nhận dữ liệu cảm biến từ thiết bị IoT

Dữ liệu được gửi qua MQTT

Lưu vào cơ sở dữ liệu

### 3. Control House Device (Điều khiển thiết bị)

Bật / tắt thiết bị (bơm nước, đèn, quạt…)

Gửi lệnh từ Backend xuống thiết bị IoT thông qua MQTT

### 4. Keep Alive

Kiểm tra trạng thái online / offline của thiết bị

Giúp hệ thống giám sát thiết bị hoạt động ổn định

### 5. Dashboard

Cung cấp dữ liệu hiện tại cho giao diện Dashboard

Phục vụ hiển thị realtime trên Mobile/Web App

### 6. Alert (Cảnh báo)

Tự động tạo cảnh báo khi giá trị cảm biến vượt ngưỡng

Ví dụ:

Nhiệt độ quá cao

Độ ẩm đất quá thấp

Lưu cảnh báo vào database

### 7. History (Lịch sử hoạt động)

Lưu lịch sử hệ thống dưới dạng log đơn giản

Bao gồm:

        - Dữ liệu cảm biến

        - Lệnh điều khiển

        - Cảnh báo

        - Phục vụ theo dõi và báo cáo

## Hướng dẫn cài đặt & chạy project
### Bước 1: Clone project
git clone https://github.com/RiinaRinaRi/smart-garden-api.git
cd smart-garden-api

### Bước 2: Cài đặt thư viện
npm install

### Bước 3: Cấu hình môi trường

Copy file:

.env.example → .env


Chỉnh các thông tin:

DB_HOST
DB_USER
DB_PASSWORD
DB_NAME
MQTT_BROKER_URL
JWT_SECRET

### Bước 4: Import Database

Mở MySQL

Import file:

database/schema.sql

### Bước 5: Chạy server
npm start


Server chạy tại:

http://localhost:3000
http://localhost:3000/api-docs

## Kiểm thử API

Sử dụng Postman

Các nhóm API chính:

/api/auth
/api/sensor
/api/control
/api/alert
/api/history

## Mục đích sử dụng
Môn học IoT / Hệ thống nhúng

Demo hệ thống Smart Garden / Smart Agriculture

## Tác giả

Pham Thi Thuy Ngan
