Task Manager

  Một ứng dụng quản lý tác vụ đẹp mắt, giàu tính năng được xây dựng bằng React, TypeScript và Tailwind CSS. Nâng cao năng suất làm việc của bạn với giao diện thanh lịch và các tính năng mạnh mẽ.

Bao gồm:

- Chức năng chính:
    + Quản lý tác vụ thông minh - Thêm, xóa, sửa và đánh dấu hoàn thành tác vụ của bạn dễ dàng
    + Phân cấp độ ưu tiên - Các mức độ ưu tiên (cao, thường, thấp) được in màu để dễ phân biệt
    + Ngày tới hạn - Đặt deadline với 
    + Danh mục - Organize tasks with custom categories
    + Mô tả tác vụ - Thêm ghi chú chi tiết vào bất kỳ tác vụ nào
    + Tự động lưu - Tất cả dữ liệu được lưu cục bộ trong trình duyệt của bạn

- Chức năng nâng cao:
    + Tìm kiếm thông minh - Tìm nhanh nhiệm vụ theo tiêu đề, mô tả hoặc danh mục
    + Lọc nâng cao - Lọc theo trạng thái, mức độ ưu tiên và danh mục
    + Bảng thống kê - Theo dõi tỷ lệ hoàn thành và phân bổ tác vụ
    + Phân trang - Tự động phân trang khi có nhiều tác vụ
    + Chỉnh sửa nội tuyến - Chỉnh sửa nhiệm vụ mà không cần rời khỏi chế độ xem danh sách
    + Hình ảnh động đẹp mắt - Chuyển tiếp mượt mà trong suốt ứng dụng
    + Thiết kế hiện đại - Chuyển màu từ tím sang xanh lam với hiệu ứng hình thái thủy tinh

- Trải nghiệm người dùng:
    + Hoàn toàn đáp ứng - Hoạt động hoàn hảo trên thiết bị di động, máy tính bảng và máy tính để bàn
    + Nhanh & Nhẹ - Được xây dựng với Vite cho hiệu suất tối ưu
    + Giao diện trực quan - Bố cục gọn gàng, rộng rãi lấy cảm hứng từ các ứng dụng năng suất hiện đại
    + Thông báo Toast - Nhận phản hồi tức thì về mọi hành động
    + Tùy chỉnh sáng/tối - Tùy chỉnh màn hình sáng/tối theo ý muốn của người dùng

CÔNG NGHỆ ĐÃ SỬ DỤNG:

  - React 18 - React hiện đại, ổn định cùng hooks
  - React Router DOM - Thư viện mạnh mẽ quản lý điều hướng và định tuyến trong các ứng dụng React 
  - TypeScript - Mở rộng của JavaScript
  - Tailwind CSS - Frontend
  - shadcn/ui - Thư viện mở cho components
  - Vite - Công cụ tăng hiệu suất tối ưu cho app
  - date-fns - Điều chỉnh ngày tháng dễ dàng hơn
  - Sonner - Hiển thị thông báo cho từng hành động
  - Lucide React - Thư viện Icon

KHỞI ĐỘNG

- Điều kiện cần:
    + Node.js 16+ và npm đã được cài đặt

- Cài đặt chương trình

1. Sao chép repo
  git clone https://github.com/chethanaperavali/page-to-spark.git
  cd task-manager-pro

2. Cài đặt các dependacies
  npm install

3. Khởi động server phát triển
  npm run dev

4. Mở trình duyệt của bạn
  Sau đó nhập vào địa chỉ: `http://localhost:8080`

CÁCH SỬ DỤNG:

- Thêm tác vụ:
1. Nhấn vào thanh văn bản trên cùng có chữ 'Tiêu Đề Tác Vụ'
2. Nhập tiêu đề
3. Có thể thêm ưu tiên, ngày tới hạn và danh mục
4. Nhấn vào nút 'Thêm Tác Vụ' hoặc gõ phím Enter

- Quản lý tác vụ:
  + Hoàn thành tác vụ - Nhân vào ô trống để tick vào
  + Sửa tác vụ - Nhấn vào biểu tượng cây bút để sửa tác vụ
  + Xóa tác vụ - Nhấn vào biểu tượng thùng rác
  + Hiển thị chi tiết - Mọi tác vụ đều hiển thị chi tiết ở dưới

- Lọc và Tìm kiếm
  + Dùng thanh tìm kiếm để tìm tác vụ thông qua từ khóa
  + Lọc theo trạng thái (Đang Làm/Đã Hoàn Thành)
  + Lọc theo mức độ ưu tiên
  + Lọc theo danh lục
  + Kết hợp các bộ lọc khác nhau để có kết quả chính xác 

- Bảng thống kê:
  + Hiển thị tống số tác vụ và số tác vụ bạn đang làm/đã hàn thành
  + Theo dõi tỉ lệ hoàn thành tác vụ của bạn

PHẦN THIẾT KẾ:

App được thiết kế cẩn thận bawfng những gam màu khác nhau:
- Màu chính: Tím (#9D4EDD) - Cho hoạt động chính
- Màu chủ đạo: Hồng - Làm nổi bật tác vụ
- Màu hoàn thành: Xanh lá - Cho tác vụ hoàn thành
- Ưu tiên cao: Đỏ - Cho hoạt động cần thiết nhất
- Ưu tiên thường: Cam - Cho hoạt động cần thiết thường
- Ưu tiên thấp: Xanh dương - Cho hoạt động ít cần thiết nhất

Mọi màu được thiết kế theo format HSL để dễ điều chỉnh.

CẤU TRÚC DỰ ÁN:

```
src/
├── components/          # Phần components cho React
│   ├── ui/              # shadcn/ui components
│   ├── TaskForm.tsx     # Form tạo tác vụ
│   ├── TaskItem.tsx     # Hiển thị các task sau khi tạo
│   ├── TaskFilters.tsx  # Điều chỉnh bộ lọc
│   └── TaskStats.tsx    # Điều chỉnh thống kê
├── hooks/               # Hooks của React
│   └── useLocalStorage.ts
├── types/               # Mã lệnh TypeScript
│   └── task.ts
├── pages/               # Phần components của trang
│   └── Index.tsx        # Trang chính của app
│   └── NotFound.tsx     # Trang chính của app
│   └── Index.tsx        # Trang chính của app
└── lib/                 # Các hàm thiết thực
```

CHỈNH SỬA:

- Thêm danh mục:
  Danh mục mặc định (Công Việc, Cá Nhân, Mua Sắm) được thêm ở `src/pages/Index.tsx`. Bạn có thể chỉnh sửa hoặc thêm danh mục riêng:
    const [categories, setCategories] = useLocalStorage<string[]>("categories", [
      "Công Việc",
      "Cá Nhân",
      "Mua Sắm",
      "Thêm vào"
    ]);


- Thay đổi design:
  Thay đổi màu sắc và kiểu dáng ở `src/index.css` và `tailwind.config.ts`.


CẬP NHẬT TƯƠNG LAI:

Cập nhật cho những phiên bản tương lai:
- Kéo thả tác vụ 
- Chia sẻ tác vụ 
- Bảng thống kê nâng cao
- Nhắc nhở tác vụ
- Đính kèm file

