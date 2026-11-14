# 🛠️ Fio Vay CashBack — Admin Portal & Crawler Manager (`admin-page`)

Hệ thống quản trị trung tâm (**Admin Dashboard & CMS**) dành cho nền tảng trung gian tài chính **Fio Vay CashBack**, kết nối trực tiếp với **Backend API** và cơ sở dữ liệu **Vercel Upstash Redis**.

---

## 🚀 Link Deploy Production Trên Vercel ( Toàn Hệ Thống )

| Phân Hệ | GitHub Repository | Link Deploy Production (Vercel) |
| :--- | :--- | :--- |
| **1. Admin Portal (Repo này)** | [`Fio-Vay-CashBack/admin-page`](https://github.com/Fio-Vay-CashBack/admin-page) | 🛠️ **[https://fio-vay-admin-page.vercel.app](https://fio-vay-admin-page.vercel.app)** |
| **2. Backend API & Crawler** | [`Fio-Vay-CashBack/backend-api`](https://github.com/Fio-Vay-CashBack/backend-api) | ⚙️ **[https://fio-vay-backend-api.vercel.app](https://fio-vay-backend-api.vercel.app)** |
| **3. Website So Sánh Vay** | [`Fio-Vay-CashBack/website`](https://github.com/Fio-Vay-CashBack/website) | 🌐 **[https://fio-vay-website.vercel.app](https://fio-vay-website.vercel.app)** |
| **4. Mobile App (PWA)** | [`Fio-Vay-CashBack/mobile-app`](https://github.com/Fio-Vay-CashBack/mobile-app) | 📱 **[https://fio-vay-mobile-app.vercel.app](https://fio-vay-mobile-app.vercel.app)** |

---

## 📊 Các Phân Hệ Quản Trị Chính

- **Dashboard Tổng Quan (`/admin`)**: Thống kê thời gian thực từ Vercel Redis (tổng số gói vay, tổng lượt click chuyển hướng sang đối tác, số lượng hồ sơ đăng ký vay & mã CashBack, trạng thái Crawler).
- **Quản Lý Gói Vay & Crawler (`/admin/loans`)**:
  - Thêm mới, chỉnh sửa, xóa các gói vay đối tác trên Vercel Redis.
  - Kích hoạt **Loan Website Crawler** (`POST /api/crawler`) để tự động quét và cập nhật thông tin lãi suất, hạn mức từ các website cho vay.
- **Quản Lý Hồ Sơ Vay & CashBack (`/admin/leads`)**:
  - Theo dõi danh sách khách hàng đăng ký vay, mã hoàn tiền `FIO-CB-*` và tin nhắn liên hệ từ người dùng.
- **Quản Lý Mạng Lưới Affiliate (`/admin/affiliates`)**:
  - Quản lý chiến dịch tiếp thị liên kết tài chính (Accesstrade, MasOffer, Jeff, Crezu, GoodAff,Leadbit...).

---

## 💻 Chạy Local Với `pnpm`

```bash
pnpm install
pnpm dev
```
