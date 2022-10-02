# Trần Anh Tuấn 20204701

# Bài tập cuối kì môn Project I

# Frontend

Công nghệ sử dụng: React 18, React Router v6

Clone project

    git clone git@github.com:TropicalDog17/project-1.git
    cd project-1
    git checkout frontend

Cài đặt các package cần thiết:

    npm install
 
Khởi chạy ứng dụng:

    npx webpack serve
hoặc:

    npm run start
    
    

# Backend

# Cài đặt

    git clone git@github.com:TropicalDog17/project-1.git
    git checkout backend

Tạo và kích hoạt môi trường ảo

    cd backend
    python3 -m venv env
    source env/bin/activate/ #Linux
    env/Scripts/activate #Windows
    

Cài đặt các packages cần thiết

    pip install -r requirements.txt

Khởi chạy API: 

    python3 main.py

Mô tả api: http://localhost:5000/docs



# Crawler

## Cài đặt

Clone về máy:

      git clone git@github.com:TropicalDog17/project-1.git
    git checkout crawler

Tạo và kích hoạt môi trường ảo

    cd crawler
    python3 -m venv env
    source env/bin/activate/ #Linux
    env/Scripts/activate #Windows

Cài đặt các packages cần thiết

    pip install -r requirements.txt

Khởi tạo SQLite DB

    flask --app api init-db

Khởi chạy ứng dụng

    flask --app api --debug run
