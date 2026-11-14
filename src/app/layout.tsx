import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.devaynhat.com"),
  title: "Dễ Vay Nhất | Vay Online Có Tiền Ngay | Không Từ Chối",
  description:
    "Dễ Dàng Chọn Khoản Vay Tốt Tại Các Đơn Vị Uy Tín. Quy Trình Đơn Giản, Chỉ Cần CMND/CCCD. Đăng Ký Ngay!",
  icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
  openGraph: {
    title: "Dễ Vay Nhất | Vay Online Có Tiền Ngay | Không Từ Chối",
    description:
      "Dễ Dàng Chọn Khoản Vay Tốt Tại Các Đơn Vị Uy Tín. Quy Trình Đơn Giản, Chỉ Cần CMND/CCCD. Đăng Ký Ngay!",
    url: "https://www.devaynhat.com",
    type: "website",
    images: ["/images/og-image.png"],
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={roboto.variable}>
      <body className="min-h-screen bg-white font-[Roboto,sans-serif] text-[#384251] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
