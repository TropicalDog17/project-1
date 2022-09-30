
# Bài tập 3

## Cài đặt

clone về máy 

    git clone git@gitlab.com:tuantran_1702/training_exercise.git
    git checkout bt3

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
