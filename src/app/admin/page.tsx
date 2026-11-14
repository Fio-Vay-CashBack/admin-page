"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import SbAdminLayout from "@/components/admin/SbAdminLayout";
import { AreaChartCard, BarChartCard } from "@/components/admin/SbAdminCharts";
import SbAdminDataTable from "@/components/admin/SbAdminDataTable";
import { API_BASE_URL } from "@/lib/api";

interface DashboardStats {
  totalLoans: number;
  activeLoans: number;
  zeroInterestLoans: number;
  totalBorrowers: number;
  totalClicks: number;
  totalLeads: number;
  totalContacts: number;
  storageMode: string;
}

export default function AdminDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState<DashboardStats>({
    totalLoans: 21,
    activeLoans: 10,
    zeroInterestLoans: 15,
    totalBorrowers: 31064,
    totalClicks: 31064,
    totalLeads: 3,
    totalContacts: 0,
    storageMode: "vercel-redis",
  });
  const [crawlUrl, setCrawlUrl] = useState("https://www.devaynhat.com");
  const [crawling, setCrawling] = useState(false);
  const [crawlNotice, setCrawlNotice] = useState("");

  const loadStats = () => {
    fetch(`${API_BASE_URL}/api/stats`)
      .then((r) => r.json())
      .then((res) => {
        if (res?.success && res?.data) {
          setStats(res.data);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleCrawlSync = async (e: React.FormEvent) => {
    e.preventDefault();
    setCrawling(true);
    setCrawlNotice("Đang thu thập thông tin khoản vay từ website...");
    try {
      const res = await fetch(`${API_BASE_URL}/api/crawler`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUrl: crawlUrl }),
      });
      const json = await res.json();
      setCrawlNotice(json.message || "Đồng bộ dữ liệu vào Vercel Redis thành công!");
      loadStats();
    } catch {
      setCrawlNotice("Lỗi kết nối khi đồng bộ.");
    } finally {
      setCrawling(false);
    }
  };

  const STATUS_CARDS = [
    {
      title: `Tổng Tổ Chức Cho Vay: ${stats.totalLoans} (${stats.activeLoans} Active)`,
      bg: "bg-[#0d6efd]",
      href: "/admin/loans",
    },
    {
      title: `Lượt Click Đối Tác: ${stats.totalClicks.toLocaleString()}`,
      bg: "bg-[#ffc107]",
      href: "/admin/affiliates",
    },
    {
      title: `Người Nhận Vay: ${stats.totalBorrowers.toLocaleString()}`,
      bg: "bg-[#198754]",
      href: "/admin/leads",
    },
    {
      title: `Hồ Sơ CashBack: ${stats.totalLeads} | Liên Hệ: ${stats.totalContacts}`,
      bg: "bg-[#dc3545]",
      href: "/admin/leads",
    },
  ];

  return (
    <SbAdminLayout searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-1 mb-3">
        <h1 className="text-[34px] font-medium text-[#212529] leading-tight">
          Dashboard Quản Trị Trung Gian Cho Vay
        </h1>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#d1e7dd] text-[#0f5132] text-[13px] font-semibold">
          ● Vercel Redis ({stats.storageMode})
        </span>
      </div>

      {/* Breadcrumb */}
      <ol className="bg-[#e9ecef] rounded-[4px] px-4 py-3 mb-6 text-[15px] text-[#6c757d] list-none">
        <li>Dashboard / Hệ thống quản trị Fio Vay CashBack (Mô hình DeVayNhat.Com)</li>
      </ol>

      {/* Crawler Box */}
      <div className="border border-[#0d6efd]/30 bg-[#f8f9fa] rounded-[4px] p-4 mb-6">
        <div className="font-semibold text-[15px] text-[#212529] mb-1">
          🕷️ Công cụ Thu thập Thông tin từ các Website Cho Vay (Loan Aggregator Crawler)
        </div>
        <p className="text-[13.5px] text-[#6c757d] mb-3">
          Chúng tôi đóng vai trò trung gian tài chính. Nhập URL trang web cho vay (ví dụ: https://www.devaynhat.com hoặc website đối tác) để thu thập và đồng bộ gói vay vào Vercel Redis.
        </p>
        <form onSubmit={handleCrawlSync} className="flex flex-col sm:flex-row gap-2">
          <input
            type="url"
            required
            value={crawlUrl}
            onChange={(e) => setCrawlUrl(e.target.value)}
            placeholder="https://www.devaynhat.com"
            className="flex-1 h-[38px] px-3 rounded-[4px] border border-[#ced4da] bg-white text-[14px]"
          />
          <button
            type="submit"
            disabled={crawling}
            className="px-4 h-[38px] rounded-[4px] bg-[#198754] hover:bg-[#157347] text-white font-medium text-[14px] cursor-pointer"
          >
            {crawling ? "Đang Crawl..." : "Thu Thập & Đồng Bộ Redis"}
          </button>
        </form>
        {crawlNotice && (
          <div className="mt-2 text-[13px] text-[#198754] font-medium">
            ✓ {crawlNotice}
          </div>
        )}
      </div>

      {/* 4 Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        {STATUS_CARDS.map((card) => (
          <div
            key={card.title}
            className={`${card.bg} text-white rounded-[4px] border border-black/15 flex flex-col justify-between overflow-hidden`}
          >
            <div className="px-4 py-5 text-[15px] font-semibold">
              {card.title}
            </div>
            <Link
              href={card.href}
              className="px-4 py-2.5 bg-black/[0.06] border-t border-black/15 flex items-center justify-between text-[12.5px] text-white hover:underline"
            >
              <span>Xem chi tiết</span>
              <svg
                className="w-2.5 h-2.5 text-white"
                fill="currentColor"
                viewBox="0 0 320 512"
              >
                <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
              </svg>
            </Link>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        <AreaChartCard footerText="Thống kê lưu lượng truy cập & lượt Click đối tác từ Vercel Redis" />
        <BarChartCard footerText="Thống kê chuyển đổi hồ sơ vay & hoa hồng trung gian theo tháng" />
      </div>

      {/* DataTable Card */}
      <SbAdminDataTable externalSearch={searchQuery} />
    </SbAdminLayout>
  );
}
