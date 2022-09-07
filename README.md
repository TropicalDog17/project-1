**Bài tập 1**

Tạo 1 file .env trong thư mục bt1 với nội dung: 


    DB_URI = "mongodb+srv://tropicaldog17:tropical@file-sharing-tropical.lzoqe.mongodb.net/test?retryWrites=true&w=majority"


Các thư viện sử dụng 

    aiohttp==3.8.1
    beautifulsoup4==4.11.1
    bs4==0.0.1
    mongoengine==0.24.2
    python-dotenv==0.20.0
    requests==2.28.1

File mainv1: Đã cài đặt được tính năng scrape dữ liệu, chạy lại khi ngắt kết nối mạng, tự động cập nhật bài viết sau 1 khoảng thời gian, scrape comment.

File mainv234: Cài đặt được tính năng đa luồng(Giảm thời gian chạy), tuy nhiên không lấy được comment do không tương thích.

File main_challenge: Cài đặt được đa luồng và lấy được comment.

# Bài tập 2

## Cài đặt

Clone về máy:

    git clone git@gitlab.com:tuantran_1702/training_exercise.git

Tạo và kích hoạt môi trường ảo

    cd bt2
    python3 -m venv env
    source env/bin/activate/

Cài đặt các packages cần thiết

    pip install -r requirements.txt

Khởi tạo SQLite DB

    flask --app api init-db

Khởi chạy ứng dụng

    flask --app api --debug run

# Bài tập 3

## Cài đặt

clone về máy 

    git clone git@gitlab.com:tuantran_1702/training_exercise.git

Tạo và kích hoạt môi trường ảo

    cd bt3
    python3 -m venv env
    source env/bin/activate/


Cài đặt các packages cần thiết

    pip install -r requirements.txt


Cài đặt RabbitMQ(Message broker), xem tại đây: https://docs.celeryq.dev/en/stable/getting-started/backends-and-brokers/rabbitmq.html#broker-rabbitmq

Khởi chạy RabbitMQ:
    sudo rabbitmq-server

Khởi chạy Celery worker:
    celery -A main worker --loglevel=INFO

Chạy chương trình scrape:
    python main.py

