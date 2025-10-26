# WEB_BT2
Bài tập 2
Bài tập 02: Lập trình web.
==============================
NGÀY GIAO: 19/10/2025
==============================
DEADLINE: 26/10/2025
==============================
1. Sử dụng github để ghi lại quá trình làm, tạo repo mới, để truy cập public, edit file `readme.md`:
   chụp ảnh màn hình (CTRL+Prtsc) lúc đang làm, paste vào file `readme.md`, thêm mô tả cho ảnh.
2. NỘI DUNG BÀI TẬP:
2.1. Cài đặt Apache web server:
- Vô hiệu hoá IIS: nếu iis đang chạy thì mở cmd quyền admin để chạy lệnh: iisreset /stop
- Download apache server, giải nén ra ổ D, cấu hình các file:
  + D:\Apache24\conf\httpd.conf
  + D:Apache24\conf\extra\httpd-vhosts.conf
  để tạo website với domain: fullname.com
  code web sẽ đặt tại thư mục: `D:\Apache24\fullname` (fullname ko dấu, liền nhau)
- sử dụng file `c:\WINDOWS\SYSTEM32\Drivers\etc\hosts` để fake ip 127.0.0.1 cho domain này
  ví dụ sv tên là: `Đỗ Duy Cốp` thì tạo website với domain là fullname ko dấu, liền nhau: `doduycop.com`
- thao tác dòng lệnh trên file `D:\Apache24\bin\httpd.exe` với các tham số `-k install` và `-k start` để cài đặt và khởi động web server apache.
2.2. Cài đặt nodejs và nodered => Dùng làm backend:
- Cài đặt nodejs:
  + download file `https://nodejs.org/dist/v20.19.5/node-v20.19.5-x64.msi`  (đây ko phải bản mới nhất, nhưng ổn định)
  + cài đặt vào thư mục `D:\nodejs`
- Cài đặt nodered:
  + chạy cmd, vào thư mục `D:\nodejs`, chạy lệnh `npm install -g --unsafe-perm node-red --prefix "D:\nodejs\nodered"`
  + download file: https://nssm.cc/release/nssm-2.24.zip
    giải nén được file nssm.exe
    copy nssm.exe vào thư mục `D:\nodejs\nodered\`
  + tạo file "D:\nodejs\nodered\run-nodered.cmd" với nội dung (5 dòng sau):
@echo off
REM fix path
set PATH=D:\nodejs;%PATH%
REM Run Node-RED
node "D:\nodejs\nodered\node_modules\node-red\red.js" -u "D:\nodejs\nodered\work" %*
  + mở cmd, chuyển đến thư mục: `D:\nodejs\nodered`
  + cài đặt service `a1-nodered` bằng lệnh: nssm.exe install a1-nodered "D:\nodejs\nodered\run-nodered.cmd"
  + chạy service `a1-nodered` bằng lệnh: `nssm start a1-nodered`
2.3. Tạo csdl tuỳ ý trên mssql (sql server 2022), nhớ các thông số kết nối: ip, port, username, password, db_name, table_name
2.4. Cài đặt thư viện trên nodered:
- truy cập giao diện nodered bằng url: http://localhost:1880
- cài đặt các thư viện: node-red-contrib-mssql-plus, node-red-node-mysql, node-red-contrib-telegrambot, node-red-contrib-moment, node-red-contrib-influxdb, node-red-contrib-duckdns, node-red-contrib-cron-plus
- Sửa file `D:\nodejs\nodered\work\settings.js` : 
  tìm đến chỗ adminAuth, bỏ comment # ở đầu dòng (8 dòng), thay chuỗi mã hoá mật khẩu bằng chuỗi mới
    adminAuth: {
        type: "credentials",
        users: [{
            username: "admin",
            password: "chuỗi_mã_hoá_mật_khẩu",
            permissions: "*"
        }]
    },   
   với mã hoá mật khẩu có thể thiết lập bằng tool: https://tms.tnut.edu.vn/pw.php
- chạy lại nodered bằng cách: mở cmd, vào thư mục `D:\nodejs\nodered` và chạy lệnh `nssm restart a1-nodered`
  khi đó nodered sẽ yêu cầu nhập mật khẩu mới vào được giao diện cho admin tại: http://localhost:1880
2.5. tạo api back-end bằng nodered:
- tại flow1 trên nodered, sử dụng node `http in` và `http response` để tạo api
- thêm node `MSSQL` để truy vấn tới cơ sở dữ liệu
- logic flow sẽ gồm 4 node theo thứ tự sau (thứ tự nối dây): 
  1. http in  : dùng GET cho đơn giản, URL đặt tuỳ ý, ví dụ: /timkiem
  2. function : để tiền xử lý dữ liệu gửi đến
  3. MSSQL: để truy vấn dữ liệu tới CSDL, nhận tham số từ node tiền xử lý
  4. http response: để phản hồi dữ liệu về client: Status Code=200, Header add : Content-Type = application/json
  có thể thêm node `debug` để quan sát giá trị trung gian.
- test api thông qua trình duyệt, ví dụ: http://localhost:1880/timkiem?q=thị
2.6. Tạo giao diện front-end:
- html form gồm các file : index.html, fullname.js, fullname.css
  cả 3 file này đặt trong thư mục: `D:\Apache24\fullname`
  nhớ thay fullname là tên của bạn, viết liền, ko dấu, chữ thường, vd tên là Đỗ Duy Cốp thì fullname là `doduycop`
  khi đó 3 file sẽ là: index.html, doduycop.js và doduycop.css
- index.html và fullname.css: trang trí tuỳ ý, có dấu ấn cá nhân, có form nhập được thông tin.
- fullname.js: lấy dữ liệu trên form, gửi đến api nodered đã làm ở bước 2.5, nhận về json, dùng json trả về để tạo giao diện phù hợp với kết quả truy vấn của bạn.
2.7. Nhận xét bài làm của mình:
- đã hiểu quá trình cài đặt các phần mềm và các thư viện như nào?
- đã hiểu cách sử dụng nodered để tạo api back-end như nào?
- đã hiểu cách frond-end tương tác với back-end ra sao?
==============================
TIÊU CHÍ CHẤM ĐIỂM:
1. y/c bắt buộc về thời gian: ko quá Deadline, quá: 0 điểm (ko có ngoại lệ)
2. cài đặt được apache và nodejs và nodered: 1đ
3. cài đặt được các thư viện của nodered: 1đ
4. nhập dữ liệu demo vào sql-server: 1đ
5. tạo được back-end api trên nodered, test qua url thành công: 1đ
6. tạo được front-end html css js, gọi được api, hiển thị kq: 1đ
7. trình bày độ hiểu về toàn bộ quá trình (mục 2.7): 5đ
==============================
GHI CHÚ:
1. yêu cầu trên cài đặt trên ổ D, nếu máy ko có ổ D có thể linh hoạt chuyển sang ổ khác, path khác.
2. có thể thực hiện trực tiếp trên máy tính windows, hoặc máy ảo
3. vì csdl là tuỳ ý: sv cần mô tả rõ db chứa dữ liệu gì, nhập nhiều dữ liệu test có nghĩa, json trả về sẽ có dạng như nào cũng cần mô tả rõ.
4. có thể xây dựng nhiều API cùng cơ chế, khác tính năng: như tìm kiếm, thêm, sửa, xoá dữ liệu trong DB.
5. bài làm phải có dấu ấn cá nhân, nghiêm cấm mọi hình thức sao chép, gian lận (sẽ cấm thi nếu bị phát hiện gian lận).
6. bài tập thực làm sẽ tốn nhiều thời gian, sv cần chứng minh quá trình làm: save file `readme.md` mỗi khoảng 15-30 phút làm : lịch sử sửa đổi sẽ thấy quá trình làm này!
7. nhắc nhẹ: github ko fake datetime được. (THẦY CHƯA BAO GIỜ NÓI ĐÙA VỀ CHUYỆN CẤM THI)
8. sv được sử dụng AI để tham khảo.
==============================
DEADLINE: 26/10/2025
==============================
./.
------------------------------------------------------------------------------- 
# THẦY CHƯA BAO GIỜ NÓI ĐÙA VỀ CHUYỆN CẤM THI(THẦY THIẾU CÂU NÀY RỒI NÊN EM CHO THÊM VÀO)
--------------------------------------------------------------------------------
# 2.1. CÀI ĐẶT APACHE
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/96728d7b-b147-4fb3-b8e5-1aed3c2602e3" />

- download apache bản win64 về
<img width="1302" height="487" alt="image" src="https://github.com/user-attachments/assets/2fa71e96-9fd1-447f-8da0-81d3bc489e5a" />
- Giải nén sang ổ D
<img width="1346" height="765" alt="image" src="https://github.com/user-attachments/assets/7c0fcc99-8939-496e-b3d5-20136cdcd388" />
- Tìm theo đường dẫn D://Apache24/conf/httpd.conf để sửa file , kích hoạt Vitual Host
<img width="1292" height="578" alt="image" src="https://github.com/user-attachments/assets/e8478be1-c320-43a0-b2c1-5bff224d181e" />
- Chỉnh file httpd-vhosts.conf để sửa file , chỉnh file để tạo website với domain: nguyenthithuhien.com
<img width="685" height="759" alt="image" src="https://github.com/user-attachments/assets/70e5fb1a-0254-46c2-a85a-2d9f1b7b4499" />
- sử dụng file `c:\WINDOWS\SYSTEM32\Drivers\etc\hosts` để fake ip 127.0.0.1 cho domain nguyenthithuhien.com
<img width="1658" height="712" alt="image" src="https://github.com/user-attachments/assets/a86bb9ff-8623-41a2-9982-94e645a6b7f4" />
- Tạo một file mới, code web sẽ đặt tại thư mục: `D:\Apache24\nguyenthithuhien. tạo thêm file index.html để test thử
<img width="1244" height="320" alt="image" src="https://github.com/user-attachments/assets/7e406b44-ac72-4247-8e70-6bbf0a6e8261" />
- test ok
<img width="849" height="276" alt="image" src="https://github.com/user-attachments/assets/8ac02ab8-7f0b-4c83-9ccf-5530bbc3f5d2" />
- thao tác dòng lệnh trên file `D:\Apache24\bin\httpd.exe` với các tham số `-k install` và `-k start` để cài đặt và khởi động web server apache. Oử đây e chạy qua cmd adm
<img width="888" height="334" alt="image" src="https://github.com/user-attachments/assets/1209817f-d06d-4c6a-aac5-dba0ff532485" />
- Vì cổng 80 bị chiếm , tắt hết sẽ rất phức tạp nên listen cổng 8080 cho dễ
------------------------------------------
# Cài đặt nodejs:
  + download file `https://nodejs.org/dist/v20.19.5/node-v20.19.5-x64.msi`  (đây ko phải bản mới nhất, nhưng ổn định)
  + cài đặt vào thư mục `D:\nodejs`
- Cài đặt nodered:
  + chạy cmd, vào thư mục `D:\nodejs`, chạy lệnh `npm install -g --unsafe-perm node-red --prefix "D:\nodejs\nodered"`
<img width="1171" height="546" alt="image" src="https://github.com/user-attachments/assets/e49b2d82-1e85-4278-b033-5878cfe6fe4e" />
<img width="1275" height="461" alt="image" src="https://github.com/user-attachments/assets/254df6ea-06c2-46f7-a27a-988a7c63d0f1" />
+ download file: https://nssm.cc/release/nssm-2.24.zip
    giải nén được file nssm.exe
    copy nssm.exe vào thư mục `D:\nodejs\nodered\`
<img width="1119" height="575" alt="image" src="https://github.com/user-attachments/assets/bc8e1f41-092f-4eb8-b5f5-1126828d9283" />
--------------------------
+ tạo file "D:\nodejs\nodered\run-nodered.cmd" với nội dung (5 dòng sau):
@echo off
REM fix path
set PATH=D:\nodejs;%PATH%
REM Run Node-RED
node "D:\nodejs\nodered\node_modules\node-red\red.js" -u 
<img width="1199" height="606" alt="image" src="https://github.com/user-attachments/assets/de8d8d5b-f6b3-445e-ace1-610144fee90a" />
  + mở cmd, chuyển đến thư mục: `D:\nodejs\nodered`
  + cài đặt service `a1-nodered` bằng lệnh: nssm.exe install a1-nodered "D:\nodejs\nodered\run-nodered.cmd"
  + chạy service `a1-nodered` bằng lệnh: `nssm start a1-nodered`
<img width="980" height="407" alt="image" src="https://github.com/user-attachments/assets/93425cce-e2b9-4f12-a323-5e8dd003083e" />
- Chạy trên trình duyệt http://localhost:1880 hiện giao diện là đã thành công
<img width="1912" height="1039" alt="image" src="https://github.com/user-attachments/assets/ff46da36-93e4-45d1-8212-3baa647fb740" />
----------------------------------------
# 2.3. Tạo csdl tuỳ ý trên mssql (sql server 2022), nhớ các thông số kết nối: ip, port, username, password, db_name, table_name
<img width="1919" height="773" alt="image" src="https://github.com/user-attachments/assets/d65e4643-ff39-4dc4-95de-1401c48fc401" />
# 2.4. Cài đặt thư viện trên nodered:
- truy cập giao diện nodered bằng url: http://localhost:1880
<img width="1890" height="1075" alt="image" src="https://github.com/user-attachments/assets/b6a272c4-1544-4719-a9cb-639502c8f74a" />
- cài đặt các thư viện: node-red-contrib-mssql-plus, node-red-node-mysql, node-red-contrib-telegrambot, node-red-contrib-moment, node-red-contrib-influxdb, node-red-contrib-duckdns, node-red-contrib-cron-plus
<img width="944" height="593" alt="image" src="https://github.com/user-attachments/assets/66d77bfc-6d7b-499d-a019-04bfe79aec30" />
- Truy cập trang node-red, tìm mananager pallet -> chọn mục install và cài từng thư viện thầy yêu cầu:
<img width="947" height="735" alt="image" src="https://github.com/user-attachments/assets/f0b9ae09-3288-46c2-9124-28f7aaadeea0" />
--->ví dụ như trên
- Sửa file `D:\nodejs\nodered\work\settings.js` : 
  tìm đến chỗ adminAuth, bỏ comment # ở đầu dòng (8 dòng), thay chuỗi mã hoá mật khẩu bằng chuỗi mới
    adminAuth: {
        type: "credentials",
        users: [{
            username: "admin",
            password: "chuỗi_mã_hoá_mật_khẩu",
            permissions: "*"
        }]
    },   
<img width="510" height="491" alt="image" src="https://github.com/user-attachments/assets/28a550e3-303c-4d23-84ec-0303decd0e1b" />
- mã hoá mật khẩu có thể thiết lập bằng tool: https://tms.tnut.edu.vn/pw.php, chọn mật khẩu tùy ý rồi coppy đoạn mã hóa, sau đó dán chuỗi đó vào phần"passwoed" trong đoạn code trên 
<img width="1243" height="505" alt="image" src="https://github.com/user-attachments/assets/dbe98936-8711-4cb8-b70b-9429bec644cc" />
- chạy lại nodered bằng cách: mở cmd, vào thư mục `D:\nodejs\nodered` và chạy lệnh `nssm restart a1-nodered`
<img width="794" height="390" alt="image" src="https://github.com/user-attachments/assets/a9d3948b-327d-4dfc-845f-6ac5520839c5" />
- khi đó nodered sẽ yêu cầu nhập mật khẩu mới vào được giao diện cho admin tại: http://localhost:1880
<img width="1863" height="1043" alt="image" src="https://github.com/user-attachments/assets/e469dbe2-d341-4369-8d28-ea67a6d2e42e" />
  -> xong đăng nhập chờ nó chạy lâu một cách khủng hoảng :(( , nên em đổi port 1881, tắt hết các tiến trình đang listen cổng 1881 . Vào file setting.js rồi sửa lại cổng . chạy lệnh khởi động lại trên cmd adm ròi sau đó truy cập localhost:1881 , đăng nhập được vào node red luôn
<img width="885" height="245" alt="image" src="https://github.com/user-attachments/assets/f1bbf946-727e-4709-b62b-24d66d993ef7" />






# 2.6. Tạo giao diện front-end:
- html form gồm các file : index.html, fullname.js, fullname.css <=> index.html , nguyenthithuhien.js, nguyenthithuhien.css
<img width="1545" height="489" alt="image" src="https://github.com/user-attachments/assets/7d777606-ff20-4e4c-aec6-2df4bf5b53df" />
- index.html và fullname.css: trang trí tuỳ ý, có dấu ấn cá nhân, có form nhập được thông tin.
- fullname.js: lấy dữ liệu trên form, gửi đến api nodered đã làm ở bước 2.5, nhận về json, dùng json trả về để tạo giao diện phù hợp với kết quả truy vấn của bạn.
<img width="1861" height="985" alt="image" src="https://github.com/user-attachments/assets/acf3dd55-bb4a-446b-88dd-3aacfa96efc3" />
--> Giao diện được để màu mè như trên
  
# 2.7. Nhận xét bài làm của mình:
- đã hiểu quá trình cài đặt các phần mềm và các thư viện như nào?
+ Em hiểu về cách cài đặt phần mềm rồi , chỉnh sửa thay đổi các dữ liệu ở file hosts , fake ip cho domain em tạo. Em biết xử lý khi cổng 80 bị chiếm ,em biết cách cài nodered  về máy. Biết truy cập giao diện nodered để install các thư viện cần thiết và tạo tài khoản nodered của bản thân

- đã hiểu cách sử dụng nodered để tạo api back-end như nào?
  + em biết sử dụng các flow cơ bản http in, fuction, mssql, http responce và cách kết nối được với sql server của em để chạy nodered
- đã hiểu cách frond-end tương tác với back-end ra sao?
   + Em tạo được 3 file index.html, js, css. thì index em dùng để tạo cái khung để tương tác với dữ liệu để hiện thị. Css để tạo thiết kế giao diện theo ý muốn . js dùng để em giao tiếp được dữ liệu backend tới fronted.



























