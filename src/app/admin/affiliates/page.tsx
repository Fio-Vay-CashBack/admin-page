"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import SbAdminLayout from "@/components/admin/SbAdminLayout";
import {
  affiliateNetworks,
  loanAffiliatePrograms,
  LoanAffiliateProgram,
} from "@/data/affiliates";

export default function AdminAffiliatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedModel, setSelectedModel] = useState<string>("ALL");
  const [affId, setAffId] = useState<string>("your_publisher_id");

  const filteredPrograms = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return loanAffiliatePrograms.filter((prog) => {
      const matchCategory =
        selectedCategory === "ALL" || prog.category === selectedCategory;
      const matchModel =
        selectedModel === "ALL" || prog.model.includes(selectedModel);
      const matchSearch =
        !q ||
        prog.name.toLowerCase().includes(q) ||
        prog.commission.toLowerCase().includes(q) ||
        prog.networks.join(" ").toLowerCase().includes(q) ||
        prog.condition.toLowerCase().includes(q);
      return matchCategory && matchModel && matchSearch;
    });
  }, [searchQuery, selectedCategory, selectedModel]);

  return (
    <SbAdminLayout searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-1 mb-3">
        <h1 className="text-[36px] font-medium text-[#212529] leading-tight">
          Chương Trình Giới Thiệu Khách Vay (Affiliate Tài Chính)
        </h1>
        <Link
          href="/admin/loans"
          className="px-4 py-2 bg-[#0d6efd] hover:bg-[#0b5ed7] text-white text-[14px] rounded-[4px] self-start sm:self-auto"
        >
          Gắn Link Vào Danh Sách Vay →
        </Link>
      </div>

      {/* Breadcrumb */}
      <ol className="bg-[#e9ecef] rounded-[4px] px-4 py-3 mb-6 text-[15px] text-[#6c757d] flex items-center gap-2 list-none">
        <li>
          <Link href="/admin" className="text-[#0d6efd] hover:underline">
            Dashboard
          </Link>
        </li>
        <li>/</li>
        <li>Affiliate Programs &amp; Networks</li>
      </ol>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        <div className="bg-[#0d6efd] text-white rounded-[4px] border border-black/15 p-4">
          <div className="text-[13px] opacity-85">
            Tổng Chiến Dịch Cho Vay Có Affiliate
          </div>
          <div className="text-[24px] font-semibold mt-1">
            {loanAffiliatePrograms.length}+ Ứng dụng
          </div>
          <div className="text-[12px] opacity-80 mt-1">
            H5 Vay nhanh, Sàn CPL, Công ty tài chính, Ngân hàng số
          </div>
        </div>

        <div className="bg-[#198754] text-white rounded-[4px] border border-black/15 p-4">
          <div className="text-[13px] opacity-85">
            Hoa Hồng Điền Form (CPL / CPQL)
          </div>
          <div className="text-[24px] font-semibold mt-1">
            25.000 ₫ – 120.000 ₫
          </div>
          <div className="text-[12px] opacity-80 mt-1">
            Nhận tiền ngay khi khách điền thông tin (Dễ ra đơn nhất)
          </div>
        </div>

        <div className="bg-[#ffc107] text-white rounded-[4px] border border-black/15 p-4">
          <div className="text-[13px] opacity-90">
            Hoa Hồng Giải Ngân App H5 (CPS)
          </div>
          <div className="text-[24px] font-semibold mt-1">
            280.000 ₫ – 500.000 ₫
          </div>
          <div className="text-[12px] opacity-90 mt-1">
            VayVND, MoneyCat, Moneyveo, Cây Vàng, VayXanh...
          </div>
        </div>

        <div className="bg-[#dc3545] text-white rounded-[4px] border border-black/15 p-4">
          <div className="text-[13px] opacity-85">
            Hoa Hồng Vay Tín Chấp Lớn (MFast/AT)
          </div>
          <div className="text-[24px] font-semibold mt-1">
            600.000 ₫ – 1.800.000 ₫
          </div>
          <div className="text-[12px] opacity-80 mt-1">
            FE Credit, Mcredit, Mirae Asset, Lotte Finance, F88
          </div>
        </div>
      </div>

      {/* Top 5 Affiliate Networks Card */}
      <div className="border border-black/15 rounded-[4px] bg-white overflow-hidden mb-6">
        <div className="bg-[#f7f7f7] border-b border-black/12 px-4 py-2.5 flex items-center justify-between text-[14.5px] font-semibold text-[#212529]">
          <span>
            1. Top 5 Mạng Lưới (Affiliate Network) Để Lấy Link Giới Thiệu Khách Vay
          </span>
          <span className="text-[12.5px] font-normal text-[#6c757d]">
            Đăng ký tài khoản Publisher miễn phí
          </span>
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full border-collapse border border-[#dee2e6] text-[14px]">
            <thead>
              <tr className="bg-[#f8f9fa]">
                <th className="border border-[#dee2e6] px-3 py-2 text-left">
                  Nền Tảng (Network)
                </th>
                <th className="border border-[#dee2e6] px-3 py-2 text-left">
                  Thế Mạnh Nổi Bật
                </th>
                <th className="border border-[#dee2e6] px-3 py-2 text-left">
                  Chiến Dịch Tiêu Biểu
                </th>
                <th className="border border-[#dee2e6] px-3 py-2 text-left">
                  Min Rút &amp; Chu Kỳ Thanh Toán
                </th>
                <th className="border border-[#dee2e6] px-3 py-2 text-left">
                  Đăng Ký
                </th>
              </tr>
            </thead>
            <tbody>
              {affiliateNetworks.map((net) => (
                <tr key={net.name} className="hover:bg-[#f8f9fa]">
                  <td className="border border-[#dee2e6] px-3 py-2.5 font-bold text-[#0d6efd]">
                    {net.name}
                  </td>
                  <td className="border border-[#dee2e6] px-3 py-2.5">
                    {net.strength}
                  </td>
                  <td className="border border-[#dee2e6] px-3 py-2.5">
                    <div className="flex flex-wrap gap-1">
                      {net.topCampaigns.map((c) => (
                        <span
                          key={c}
                          className="px-2 py-0.5 bg-[#e9ecef] rounded text-[12px]"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="border border-[#dee2e6] px-3 py-2.5 text-[13px]">
                    <div>
                      <strong>Min:</strong> {net.minPayout}
                    </div>
                    <div className="text-[#6c757d]">{net.paymentCycle}</div>
                  </td>
                  <td className="border border-[#dee2e6] px-3 py-2.5">
                    <a
                      href={net.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-3 py-1 bg-[#198754] hover:bg-[#157347] text-white rounded text-[12.5px]"
                    >
                      Mở Web ↗
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* All Loan Affiliate Programs Table */}
      <div className="border border-black/15 rounded-[4px] bg-white overflow-hidden">
        <div className="bg-[#f7f7f7] border-b border-black/12 px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[14.5px] font-semibold text-[#212529]">
          <span>
            2. Danh Sách Đầy Đủ Ứng Dụng Cho Vay Có Chương Trình Giới Thiệu &amp; Mức Hoa Hồng
          </span>
          <div className="flex items-center gap-2 font-normal text-[13px]">
            <span>Mã Sub_ID của bạn:</span>
            <input
              type="text"
              value={affId}
              onChange={(e) => setAffId(e.target.value)}
              className="px-2 py-1 border border-[#ced4da] rounded bg-white text-[13px] w-40"
            />
          </div>
        </div>

        <div className="p-4">
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 text-[14px]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium">Nhóm ứng dụng:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-[34px] px-2.5 border border-[#ced4da] rounded-[4px] bg-white"
              >
                <option value="ALL">Tất cả nhóm ({loanAffiliatePrograms.length})</option>
                <option value="App/Web Vay Nhanh (H5/PDL)">
                  App/Web Vay Nhanh (H5/PDL)
                </option>
                <option value="Sàn So Sánh / Aggregator (Dễ ra đơn CPL)">
                  Sàn So Sánh / Aggregator (Dễ ra đơn CPL)
                </option>
                <option value="Công Ty Tài Chính & Cầm Đồ">
                  Công Ty Tài Chính &amp; Cầm Đồ
                </option>
                <option value="Ngân Hàng Số & Mở Thẻ (EKYC)">
                  Ngân Hàng Số &amp; Mở Thẻ (EKYC)
                </option>
              </select>

              <span className="font-medium ml-2">Loại Hoa Hồng:</span>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="h-[34px] px-2.5 border border-[#ced4da] rounded-[4px] bg-white"
              >
                <option value="ALL">Tất cả (CPL / CPQL / CPS)</option>
                <option value="CPL">CPL (Trả tiền ngay khi điền Form)</option>
                <option value="CPQL">CPQL (Khách hợp lệ nghe máy)</option>
                <option value="CPS">CPS (Trả tiền khi giải ngân)</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span>Tìm kiếm:</span>
              <input
                type="text"
                placeholder="Tên app, network..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-[34px] px-3 border border-[#ced4da] rounded-[4px] w-52"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-[#dee2e6] text-[14px]">
              <thead>
                <tr className="bg-[#f8f9fa]">
                  <th className="border border-[#dee2e6] px-3 py-2.5 text-left">
                    Ứng Dụng / Tổ Chức Cho Vay
                  </th>
                  <th className="border border-[#dee2e6] px-3 py-2.5 text-left">
                    Phân Loại
                  </th>
                  <th className="border border-[#dee2e6] px-3 py-2.5 text-left">
                    Hình Thức
                  </th>
                  <th className="border border-[#dee2e6] px-3 py-2.5 text-left">
                    Mức Hoa Hồng Tham Khảo
                  </th>
                  <th className="border border-[#dee2e6] px-3 py-2.5 text-left">
                    Lấy Link Ở Đâu (Network)
                  </th>
                  <th className="border border-[#dee2e6] px-3 py-2.5 text-left">
                    Điều Kiện Ghi Nhận Đơn
                  </th>
                  <th className="border border-[#dee2e6] px-3 py-2.5 text-left">
                    Trạng Thái Web
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPrograms.map((item: LoanAffiliateProgram) => (
                  <tr key={item.id} className="hover:bg-[#f8f9fa]">
                    <td className="border border-[#dee2e6] px-3 py-2.5 font-bold text-[#212529]">
                      {item.name}
                    </td>
                    <td className="border border-[#dee2e6] px-3 py-2.5 text-[13px]">
                      {item.category}
                    </td>
                    <td className="border border-[#dee2e6] px-3 py-2.5">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[12px] font-bold ${
                          item.model === "CPL"
                            ? "bg-[#198754] text-white"
                            : item.model === "CPQL"
                            ? "bg-[#0d6efd] text-white"
                            : "bg-[#ffc107] text-[#212529]"
                        }`}
                      >
                        {item.model}
                      </span>
                    </td>
                    <td className="border border-[#dee2e6] px-3 py-2.5 font-semibold text-[#198754]">
                      {item.commission}
                    </td>
                    <td className="border border-[#dee2e6] px-3 py-2.5">
                      <div className="flex flex-wrap gap-1">
                        {item.networks.map((net) => (
                          <span
                            key={net}
                            className="px-2 py-0.5 bg-[#e9ecef] text-[#212529] rounded text-[12px]"
                          >
                            {net}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="border border-[#dee2e6] px-3 py-2.5 text-[13px] text-[#495057]">
                      {item.condition}
                    </td>
                    <td className="border border-[#dee2e6] px-3 py-2.5 text-[12.5px]">
                      {item.inDataset ? (
                        <span className="px-2 py-1 bg-[#d1e7dd] text-[#0f5132] rounded font-medium">
                          ✓ Đã có trên Web
                        </span>
                      ) : (
                        <Link
                          href="/admin/loans"
                          className="px-2 py-1 bg-[#cfe2ff] text-[#084298] rounded font-medium hover:underline"
                        >
                          + Thêm vào Web
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SbAdminLayout>
  );
}

