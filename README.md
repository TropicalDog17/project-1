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
