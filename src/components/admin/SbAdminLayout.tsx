"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { API_BASE_URL, MOBILE_APP_URL, WEBSITE_URL } from "@/lib/api";

interface SbAdminLayoutProps {
  children: React.ReactNode;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export default function SbAdminLayout({
  children,
  searchQuery = "",
  onSearchChange,
}: SbAdminLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [layoutsOpen, setLayoutsOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [lightSidenav, setLightSidenav] = useState(false);

  const handleSearch = (val: string) => {
    setLocalSearch(val);
    if (onSearchChange) {
      onSearchChange(val);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,'Helvetica_Neue',Arial,sans-serif] text-[#212529] bg-white">
      {/* Top Navbar (sb-topnav) */}
      <nav className="sticky top-0 z-40 h-[56px] w-full bg-[#212529] flex items-center justify-between px-4 select-none">
        <div className="flex items-center">
          {/* Navbar Brand */}
          <Link
            href="/admin"
            className="w-[209px] text-[19px] font-semibold text-white hover:text-white tracking-tight truncate flex items-center gap-2"
          >
            <span className="w-6 h-6 rounded bg-[#00d385] text-[#212529] font-black text-sm flex items-center justify-center">
              F
            </span>
            <span>FioVay Admin</span>
          </Link>

          {/* Sidebar Toggle Button */}
          <button
            type="button"
            onClick={() => setSidebarOpen((prev) => !prev)}
            aria-label="Toggle navigation"
            className="p-2 text-white/55 hover:text-white cursor-pointer focus:outline-none"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 448 512"
            >
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
          </button>
        </div>

        {/* Right Side: Search Form + User Menu */}
        <div className="flex items-center gap-4">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="hidden sm:flex items-center"
          >
            <input
              type="text"
              placeholder="Tìm kiếm gói vay, đối tác..."
              value={onSearchChange ? searchQuery : localSearch}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-[215px] md:w-[250px] h-[38px] px-3 bg-white text-[#212529] placeholder:text-[#6c757d] text-[15px] rounded-l-[4px] border border-[#ced4da] focus:outline-none focus:border-[#86b7fe]"
            />
            <button
              type="submit"
              aria-label="Search"
              className="h-[38px] w-[42px] bg-[#0d6efd] hover:bg-[#0b5ed7] text-white rounded-r-[4px] flex items-center justify-center cursor-pointer transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 512 512"
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
            </button>
          </form>

          {/* User Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setUserMenuOpen((prev) => !prev)}
              className="flex items-center gap-1.5 text-white/55 hover:text-white py-1 px-2 cursor-pointer focus:outline-none"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 448 512"
              >
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
              </svg>
              <svg
                className="w-2.5 h-2.5"
                fill="currentColor"
                viewBox="0 0 320 512"
              >
                <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
              </svg>
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-[4px] shadow-lg border border-black/15 py-1.5 z-50 text-[14px] text-[#212529]">
                <Link
                  href="/admin/loans"
                  onClick={() => setUserMenuOpen(false)}
                  className="block px-4 py-1.5 hover:bg-[#e9ecef]"
                >
                  Quản lý Gói Vay (Redis)
                </Link>
                <Link
                  href="/admin/leads"
                  onClick={() => setUserMenuOpen(false)}
                  className="block px-4 py-1.5 hover:bg-[#e9ecef]"
                >
                  Hồ sơ Vay &amp; CashBack Leads
                </Link>
                <a
                  href={WEBSITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-1.5 hover:bg-[#e9ecef]"
                >
                  Mở Website Cho Vay ↗
                </a>
                <a
                  href={MOBILE_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-1.5 hover:bg-[#e9ecef]"
                >
                  Mở Mobile App ↗
                </a>
                <a
                  href={API_BASE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-1.5 hover:bg-[#e9ecef]"
                >
                  Mở Backend API Explorer ↗
                </a>
                <div className="my-1 border-t border-[#e9ecef]" />
                <Link
                  href="/admin/login"
                  onClick={() => setUserMenuOpen(false)}
                  className="block px-4 py-1.5 hover:bg-[#e9ecef]"
                >
                  Đăng xuất
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Wrapper: Sidebar + Content */}
      <div className="flex flex-1 min-h-[calc(100vh-56px)]">
        {/* Left Sidebar (sb-sidenav) */}
        {sidebarOpen && (
          <aside
            className={`w-[225px] shrink-0 flex flex-col justify-between select-none transition-colors ${
              lightSidenav
                ? "bg-[#f8f9fa] text-[#212529] border-r border-[#dee2e6]"
                : "bg-[#212529] text-white/50"
            }`}
          >
            <div className="py-2 overflow-y-auto">
              {/* CORE */}
              <div
                className={`px-4 pt-6 pb-3 text-[11px] font-bold uppercase tracking-wider ${
                  lightSidenav ? "text-[#adb5bd]" : "text-white/25"
                }`}
              >
                Core
              </div>
              <Link
                href="/admin"
                className={`flex items-center gap-3 px-4 py-3 text-[15px] transition-colors ${
                  pathname === "/admin" || pathname === "/"
                    ? lightSidenav
                      ? "text-[#0d6efd] font-medium"
                      : "text-white"
                    : lightSidenav
                    ? "text-[#212529]/75 hover:text-[#212529]"
                    : "text-white/50 hover:text-white"
                }`}
              >
                <svg
                  className="w-4 h-4 shrink-0 opacity-80"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                >
                  <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm320 96c0-26.9-16.5-49.9-40-59.3V88c0-13.3-10.7-24-24-24s-24 10.7-24 24V292.7c-23.5 9.5-40 32.5-40 59.3c0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
                </svg>
                <span>Dashboard</span>
              </Link>

              {/* QUẢN LÝ CHO VAY */}
              <div
                className={`px-4 pt-6 pb-3 text-[11px] font-bold uppercase tracking-wider ${
                  lightSidenav ? "text-[#adb5bd]" : "text-white/25"
                }`}
              >
                Trung Gian Cho Vay
              </div>

              <Link
                href="/admin/loans"
                className={`flex items-center gap-3 px-4 py-2.5 text-[14.5px] transition-colors ${
                  pathname.startsWith("/admin/loans")
                    ? lightSidenav
                      ? "text-[#0d6efd] font-medium"
                      : "text-white"
                    : lightSidenav
                    ? "text-[#212529]/75 hover:text-[#212529]"
                    : "text-white/50 hover:text-white"
                }`}
              >
                <span>💳</span>
                <span>Gói Vay &amp; Crawler</span>
              </Link>

              <Link
                href="/admin/leads"
                className={`flex items-center gap-3 px-4 py-2.5 text-[14.5px] transition-colors ${
                  pathname.startsWith("/admin/leads")
                    ? lightSidenav
                      ? "text-[#0d6efd] font-medium"
                      : "text-white"
                    : lightSidenav
                    ? "text-[#212529]/75 hover:text-[#212529]"
                    : "text-white/50 hover:text-white"
                }`}
              >
                <span>🎁</span>
                <span>Khách Vay &amp; CashBack</span>
              </Link>

              <Link
                href="/admin/affiliates"
                className={`flex items-center gap-3 px-4 py-2.5 text-[14.5px] transition-colors ${
                  pathname.startsWith("/admin/affiliates")
                    ? lightSidenav
                      ? "text-[#0d6efd] font-medium"
                      : "text-white"
                    : lightSidenav
                    ? "text-[#212529]/75 hover:text-[#212529]"
                    : "text-white/50 hover:text-white"
                }`}
              >
                <span>🔗</span>
                <span>Mạng Lưới Affiliate</span>
              </Link>

              {/* INTERFACE */}
              <div
                className={`px-4 pt-6 pb-3 text-[11px] font-bold uppercase tracking-wider ${
                  lightSidenav ? "text-[#adb5bd]" : "text-white/25"
                }`}
              >
                Hệ Sinh Thái
              </div>

              {/* Layouts Collapse */}
              <button
                type="button"
                onClick={() => setLayoutsOpen((prev) => !prev)}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-[14.5px] cursor-pointer transition-colors ${
                  lightSidenav
                    ? "text-[#212529]/75 hover:text-[#212529]"
                    : "text-white/50 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span>🎨</span>
                  <span>Giao diện</span>
                </span>
                <svg
                  className={`w-3 h-3 transition-transform ${
                    layoutsOpen ? "rotate-90" : ""
                  }`}
                  fill="currentColor"
                  viewBox="0 0 320 512"
                >
                  <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                </svg>
              </button>
              {layoutsOpen && (
                <div className="pl-11 pr-4 py-1 space-y-1 text-[13.5px]">
                  <button
                    type="button"
                    onClick={() => setLightSidenav(false)}
                    className="block w-full text-left py-1.5 hover:text-white cursor-pointer"
                  >
                    Dark Sidenav
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightSidenav(true)}
                    className="block w-full text-left py-1.5 hover:text-white cursor-pointer"
                  >
                    Light Sidenav
                  </button>
                </div>
              )}

              {/* Pages Collapse */}
              <button
                type="button"
                onClick={() => setPagesOpen((prev) => !prev)}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-[14.5px] cursor-pointer transition-colors ${
                  lightSidenav
                    ? "text-[#212529]/75 hover:text-[#212529]"
                    : "text-white/50 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span>🌐</span>
                  <span>Liên Kết Hệ Thống</span>
                </span>
                <svg
                  className={`w-3 h-3 transition-transform ${
                    pagesOpen ? "rotate-90" : ""
                  }`}
                  fill="currentColor"
                  viewBox="0 0 320 512"
                >
                  <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                </svg>
              </button>
              {pagesOpen && (
                <div className="pl-11 pr-4 py-1 space-y-1 text-[13.5px]">
                  <a
                    href={WEBSITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-1.5 hover:text-white"
                  >
                    Website (DeVayNhat) ↗
                  </a>
                  <a
                    href={MOBILE_APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-1.5 hover:text-white"
                  >
                    Mobile App ↗
                  </a>
                  <a
                    href={API_BASE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-1.5 hover:text-white"
                  >
                    Backend API (Redis) ↗
                  </a>
                  <Link
                    href="/admin/login"
                    className="block py-1.5 hover:text-white"
                  >
                    Trang Đăng Nhập
                  </Link>
                </div>
              )}

              {/* ADDONS */}
              <div
                className={`px-4 pt-6 pb-3 text-[11px] font-bold uppercase tracking-wider ${
                  lightSidenav ? "text-[#adb5bd]" : "text-white/25"
                }`}
              >
                Báo Cáo &amp; Biểu Đồ
              </div>

              <Link
                href="/admin/charts"
                className={`flex items-center gap-3 px-4 py-2.5 text-[14.5px] transition-colors ${
                  pathname === "/admin/charts"
                    ? lightSidenav
                      ? "text-[#0d6efd] font-medium"
                      : "text-white"
                    : lightSidenav
                    ? "text-[#212529]/75 hover:text-[#212529]"
                    : "text-white/50 hover:text-white"
                }`}
              >
                <span>📈</span>
                <span>Biểu Đồ (Charts)</span>
              </Link>

              <Link
                href="/admin/tables"
                className={`flex items-center gap-3 px-4 py-2.5 text-[14.5px] transition-colors ${
                  pathname === "/admin/tables"
                    ? lightSidenav
                      ? "text-[#0d6efd] font-medium"
                      : "text-white"
                    : lightSidenav
                    ? "text-[#212529]/75 hover:text-[#212529]"
                    : "text-white/50 hover:text-white"
                }`}
              >
                <span>📋</span>
                <span>Bảng Dữ Liệu (Tables)</span>
              </Link>
            </div>

            {/* Sidebar Footer */}
            <div
              className={`px-4 py-3 text-[13px] ${
                lightSidenav
                  ? "bg-[#e9ecef] text-[#6c757d]"
                  : "bg-[#343a40] text-white/50"
              }`}
            >
              <div className="text-[11px] leading-tight">Database:</div>
              <div
                className={`text-[13px] font-semibold mt-0.5 ${
                  lightSidenav ? "text-[#198754]" : "text-[#00d385]"
                }`}
              >
                ● Vercel Redis Connected
              </div>
            </div>
          </aside>
        )}

        {/* Right Content Column */}
        <div className="flex-1 flex flex-col justify-between min-w-0 bg-white">
          <main className="px-6 pt-6 pb-8">{children}</main>

          {/* Admin Footer */}
          <footer className="py-6 px-6 bg-[#f8f9fa] border-t border-[#dee2e6] mt-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between text-[13px] text-[#6c757d] gap-2">
              <div>
                Copyright &copy; Fio Vay CashBack (Mô hình DeVayNhat.Com) 2026
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/orgs/Fio-Vay-CashBack/repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0d6efd] hover:underline"
                >
                  GitHub Organization
                </a>
                <span>&middot;</span>
                <a
                  href={API_BASE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0d6efd] hover:underline"
                >
                  Backend API
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
