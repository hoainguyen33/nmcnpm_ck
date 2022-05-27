# Đồ án Quản lý giải vô địch bóng đá
## Giới thiệu đồ án: 
Ứng dụng được nhóm em xây dựng nhằm mục đích quản lý giải thi đấu bóng đá (quy mô nhỏ). Bao gồm các chức năng quản lý thông tin cầu thủ tham dự giải, thông tin đội bỏng tham gia giải đấu, quản lý giải đấu, trận đấu. Xây dựng giao diện cho người dùng nắm bắt thông tin giải đấu, cầu thủ, đội bóng và các trận đấu, cũng như cung cấp công cụ quản lý cho ban tổ chức giải đấu. 
## Tham khảo các project có liên quan
Các project tham khảo:
- [Tham khảo về phần fontend](https://www.youtube.com/watch?v=pl8s9aRRZL8)
## Môi trường thực thi
- Devtools: redux
- Hệ điều hành: Windows 11
- Cơ sở dữ liệu: Postgresql
- API: postman

## Hướng dẫn cấu hình project chạy local PC
### Frontend:
Project này bootstrap bởi [NPM Init](https://docs.npmjs.com/cli/v8/commands/npm-init), [Create React App](https://github.com/facebook/create-react-app) và Design bởi [React Bootstrap](https://react-bootstrap.github.io/)
### Cấu hình
Ở project này, bạn có thể:
#### `npm install`
Để tải package
#### `npm run build`
Cài đặt package vào thư mục `frontend` và build ứng dụng vào thư mục `fronted/build`. 
Xem để biết thêm thông tin [deployment](https://facebook.github.io/create-react-app/docs/deployment).
### npm start
khởi chạy app dưới chế độ developemnt
Mở [http://localhost:8080](http://localhost:8080) để thấy giao diện trên browser.
## Config
Ứng dụng mặc định prort là 8080.\

## Account Admin test
email: admin@admin.com \
password: admin
### Backend:
1. Clone repo 
2. Setup môi trường ảo
 `pip install virtualenv` tạo mtr ảo: python -m <tên mtruong ảo> activate: <tên mtr ảo>/Scripts/activate
3. Migrate database
 `python manage.py makemigrations`
 `python manage.py migrate`
4. Chạy server dưới local
 `python manage.py runserver`
## Hướng dẫn deploy project lên Heroku
Updating...
## Current status:
- Xây dựng phần frontend.
- Schema PostgreSQL.
- Login/ Register.
- CRUD cầu thủ
## Future works
- CRUD mùa giải 
- CRUD đội bóng