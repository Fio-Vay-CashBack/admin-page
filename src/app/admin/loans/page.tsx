"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import SbAdminLayout from "@/components/admin/SbAdminLayout";
import { allLoanOffers, LoanOffer } from "@/data/loans";
import { API_BASE_URL } from "@/lib/api";

interface ExtendedLoanOffer extends LoanOffer {
  active?: boolean;
  cashback_amount?: string;
}

export default function AdminLoansPage() {
  const [offers, setOffers] = useState<ExtendedLoanOffer[]>(allLoanOffers);
  const [searchQuery, setSearchQuery] = useState("");
  const [tableSearch, setTableSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingOffer, setEditingOffer] = useState<ExtendedLoanOffer | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const fetchLoansFromRedis = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/loans`);
      const json = await res.json();
      if (json?.success && Array.isArray(json.data) && json.data.length > 0) {
        setOffers(json.data);
      }
    } catch {
      // Fallback to local
    }
  };

  useEffect(() => {
    fetchLoansFromRedis();
  }, []);

  const effectiveSearch = (tableSearch || searchQuery).trim().toLowerCase();

  const filteredOffers = useMemo(() => {
    return offers
      .filter(
        (item) =>
          item.name.toLowerCase().includes(effectiveSearch) ||
          item.detail_company.toLowerCase().includes(effectiveSearch) ||
          item.overview_amount_max.toLowerCase().includes(effectiveSearch) ||
          item.link_devaynhat.toLowerCase().includes(effectiveSearch)
      )
      .sort((a, b) => a.sort_izcredit - b.sort_izcredit);
  }, [offers, effectiveSearch]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredOffers.length / entriesPerPage)
  );
  const safePage = Math.min(currentPage, totalPages);
  const startIdx = (safePage - 1) * entriesPerPage;
  const paginatedOffers = filteredOffers.slice(
    startIdx,
    startIdx + entriesPerPage
  );

  const handleOpenCreate = () => {
    setIsCreating(true);
    setEditingOffer({
      id: `loan_${Date.now()}`,
      name: "",
      logo: "/images/logos/vayvndvn.png",
      remoteLogo: "",
      sort_izcredit: offers.length + 1,
      overview_amount_free: "0%",
      overview_slogan: "Giải ngân nhanh",
      overview_amount_first: "10 000 000 ₫",
      overview_amount_max: "20 000 000 ₫",
      overview_age_min: 18,
      overview_age_max: 60,
      detail_company: "",
      detail_address: "Địa chỉ: Việt Nam",
      detail_phone: "Số điện thoại: 1900 636 727",
      detail_email: "E-mail: info@partner.vn",
      detail_apr_title: "Lãi suất hàng năm tối đa (APR): 18%",
      detail_term: "Thời hạn: 3 - 12 tháng",
      detail_apr_content:
        "Khi vay 2 000 000 ₫ trong 3 tháng, phí 100 000 ₫, tổng chi phí 2 100 000 ₫, APR 20%.",
      link_devaynhat: "https://go.devaynhat.com/",
      active: true,
      cashback_amount: "120 000 ₫",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (offer: ExtendedLoanOffer) => {
    setIsCreating(false);
    setEditingOffer({ ...offer });
    setIsModalOpen(true);
  };

  const handleSaveOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOffer) return;

    try {
      if (isCreating) {
        const res = await fetch(`${API_BASE_URL}/api/loans`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingOffer),
        });
        const json = await res.json();
        if (json.success) {
          setStatusMessage("Đã thêm gói vay mới vào Vercel Redis!");
          await fetchLoansFromRedis();
        }
      } else {
        const res = await fetch(`${API_BASE_URL}/api/loans/${editingOffer.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingOffer),
        });
        const json = await res.json();
        if (json.success) {
          setStatusMessage("Đã cập nhật gói vay trong Vercel Redis!");
          await fetchLoansFromRedis();
        }
      }
    } catch {
      setOffers((prev) => {
        const exists = prev.some((o) => o.id === editingOffer.id);
        if (exists) {
          return prev.map((o) => (o.id === editingOffer.id ? editingOffer : o));
        }
        return [...prev, editingOffer];
      });
    }

    setIsModalOpen(false);
    setEditingOffer(null);
  };

  const handleDeleteOffer = async (id: string) => {
    try {
      await fetch(`${API_BASE_URL}/api/loans/${id}`, {
        method: "DELETE",
      });
      setStatusMessage("Đã xoá gói vay khỏi Vercel Redis!");
    } catch {
      // Fallback
    }
    setOffers((prev) => prev.filter((o) => o.id !== id));
  };

  const handleSeedReset = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/seed`, { method: "POST" });
      const json = await res.json();
      setStatusMessage(json.message || "Đã khôi phục dữ liệu chuẩn!");
      await fetchLoansFromRedis();
    } catch {
      // Fallback
    }
  };

  return (
    <SbAdminLayout searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-1 mb-3">
        <h1 className="text-[34px] font-medium text-[#212529] leading-tight">
          Quản Lý Gói Vay (Vercel Redis)
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleSeedReset}
            className="px-3 py-2 bg-[#198754] hover:bg-[#157347] text-white text-[13.5px] rounded-[4px] cursor-pointer"
          >
            🔄 Đồng bộ chuẩn DeVayNhat.Com
          </button>
          <button
            type="button"
            onClick={handleOpenCreate}
            className="px-4 py-2 bg-[#0d6efd] hover:bg-[#0b5ed7] text-white text-[14px] rounded-[4px] cursor-pointer"
          >
            + Thêm Gói Vay Mới
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="mb-4 px-4 py-2.5 rounded bg-[#d1e7dd] text-[#0f5132] text-[14px] font-medium flex items-center justify-between">
          <span>✓ {statusMessage}</span>
          <button
            type="button"
            onClick={() => setStatusMessage("")}
            className="text-xs underline cursor-pointer"
          >
            Đóng
          </button>
        </div>
      )}

      {/* Breadcrumb */}
      <ol className="bg-[#e9ecef] rounded-[4px] px-4 py-3 mb-6 text-[15px] text-[#6c757d] flex items-center gap-2 list-none">
        <li>
          <Link href="/admin" className="text-[#0d6efd] hover:underline">
            Dashboard
          </Link>
        </li>
        <li>/</li>
        <li>Loan Offers (DeVayNhat.Com — Vercel Redis)</li>
      </ol>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        <div className="bg-[#0d6efd] text-white rounded-[4px] border border-black/15 p-4">
          <div className="text-[13px] opacity-85">Tổng Đối Tác Cho Vay</div>
          <div className="text-[26px] font-semibold mt-1">{offers.length}</div>
        </div>
        <div className="bg-[#198754] text-white rounded-[4px] border border-black/15 p-4">
          <div className="text-[13px] opacity-85">Hiển Thị Trang Chủ</div>
          <div className="text-[26px] font-semibold mt-1">
            {offers.filter((o) => o.active !== false).length} gói vay
          </div>
        </div>
        <div className="bg-[#ffc107] text-white rounded-[4px] border border-black/15 p-4">
          <div className="text-[13px] opacity-90">Ưu Đãi 0% Khoản Vay Đầu</div>
          <div className="text-[26px] font-semibold mt-1">
            {offers.filter((o) => o.overview_amount_free).length} đối tác
          </div>
        </div>
        <div className="bg-[#dc3545] text-white rounded-[4px] border border-black/15 p-4">
          <div className="text-[13px] opacity-85">Hạn Mức Tối Đa</div>
          <div className="text-[26px] font-semibold mt-1">70 000 000 ₫</div>
        </div>
      </div>

      {/* DataTable Card */}
      <div className="border border-black/15 rounded-[4px] bg-white overflow-hidden">
        <div className="bg-[#f7f7f7] border-b border-black/12 px-4 py-2.5 flex items-center justify-between text-[14.5px] text-[#212529]">
          <div className="flex items-center gap-2">
            <span>📋 Dữ liệu Gói Vay trên Vercel Redis (Backend API)</span>
          </div>
          <span className="text-[12.5px] text-[#6c757d]">
            Sorted by sort_izcredit ascending
          </span>
        </div>

        <div className="p-4">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 text-[14.5px] text-[#212529]">
            <div className="flex items-center gap-1.5">
              <span>Show</span>
              <select
                value={entriesPerPage}
                onChange={(e) => {
                  setEntriesPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="h-[32px] px-2 py-1 border border-[#ced4da] rounded-[4px] bg-white text-[14px]"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span>entries</span>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="loan-search">Search:</label>
              <input
                id="loan-search"
                type="text"
                value={tableSearch}
                onChange={(e) => {
                  setTableSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-[195px] h-[32px] px-2.5 border border-[#ced4da] rounded-[4px] text-[14px] focus:outline-none focus:border-[#86b7fe]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-[#dee2e6] text-[14px] text-[#212529]">
              <thead>
                <tr className="bg-white">
                  <th className="border border-[#dee2e6] px-3 py-2.5 text-left font-bold">
                    Rank
                  </th>
                  <th className="border border-[#dee2e6] px-3 py-2.5 text-left font-bold">
                    Partner
                  </th>
                  <th className="border border-[#dee2e6] px-3 py-2.5 text-left font-bold">
                    First Loan
                  </th>
                  <th className="border border-[#dee2e6] px-3 py-2.5 text-left font-bold">
                    Max Amount
                  </th>
                  <th className="border border-[#dee2e6] px-3 py-2.5 text-left font-bold">
                    CashBack
                  </th>
                  <th className="border border-[#dee2e6] px-3 py-2.5 text-left font-bold">
                    Affiliate Link
                  </th>
                  <th className="border border-[#dee2e6] px-3 py-2.5 text-left font-bold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedOffers.map((offer) => {
                  return (
                    <tr
                      key={offer.id}
                      className="hover:bg-[#f8f9fa] transition-colors"
                    >
                      <td className="border border-[#dee2e6] px-3 py-2.5">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[12px] font-semibold ${
                            offer.active !== false
                              ? "bg-[#198754] text-white"
                              : "bg-[#e9ecef] text-[#495057]"
                          }`}
                        >
                          #{offer.sort_izcredit}
                        </span>
                      </td>
                      <td className="border border-[#dee2e6] px-3 py-2.5">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={offer.logo || offer.remoteLogo}
                            alt={offer.name}
                            className="w-14 h-8 object-contain border border-[#dee2e6] rounded bg-white p-0.5"
                          />
                          <div>
                            <div className="font-semibold">{offer.name}</div>
                            <div className="text-[12px] text-[#6c757d] truncate max-w-[200px]">
                              {offer.detail_company}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="border border-[#dee2e6] px-3 py-2.5">
                        {offer.overview_amount_free && (
                          <span className="text-[#198754] font-medium mr-1">
                            {offer.overview_amount_free}
                          </span>
                        )}
                        {offer.overview_amount_first}
                      </td>
                      <td className="border border-[#dee2e6] px-3 py-2.5 font-medium">
                        {offer.overview_amount_max}
                      </td>
                      <td className="border border-[#dee2e6] px-3 py-2.5 font-semibold text-[#198754]">
                        {offer.cashback_amount || "120 000 ₫"}
                      </td>
                      <td className="border border-[#dee2e6] px-3 py-2.5">
                        <a
                          href={offer.link_devaynhat}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0d6efd] hover:underline text-[13px]"
                        >
                          {offer.link_devaynhat}
                        </a>
                      </td>
                      <td className="border border-[#dee2e6] px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(offer)}
                            className="px-2.5 py-1 bg-[#0d6efd] hover:bg-[#0b5ed7] text-white rounded text-[12.5px] cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteOffer(offer.id)}
                            className="px-2.5 py-1 bg-[#dc3545] hover:bg-[#bb2d3b] text-white rounded text-[12.5px] cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3 text-[14px]">
            <div>
              Showing {filteredOffers.length === 0 ? 0 : startIdx + 1} to{" "}
              {Math.min(startIdx + entriesPerPage, filteredOffers.length)} of{" "}
              {filteredOffers.length} entries
            </div>
            <div className="inline-flex rounded-[4px] border border-[#dee2e6] overflow-hidden select-none">
              <button
                type="button"
                disabled={safePage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 border-r border-[#dee2e6] text-[#0d6efd] disabled:text-[#6c757d] bg-white hover:bg-[#e9ecef] cursor-pointer"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setCurrentPage(p)}
                  className={`px-3 py-1.5 border-r border-[#dee2e6] cursor-pointer ${
                    p === safePage
                      ? "bg-[#0d6efd] text-white"
                      : "bg-white text-[#0d6efd] hover:bg-[#e9ecef]"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                type="button"
                disabled={safePage >= totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                className="px-3 py-1.5 text-[#0d6efd] disabled:text-[#6c757d] bg-white hover:bg-[#e9ecef] cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit/Create Modal */}
      {isModalOpen && editingOffer && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[4px] border border-black/20 w-full max-w-lg overflow-hidden shadow-xl">
            <div className="bg-[#f7f7f7] border-b border-black/12 px-4 py-3 flex items-center justify-between font-medium">
              <span>
                {isCreating ? "Thêm Gói Vay Mới" : "Chỉnh Sửa Đối Tác Cho Vay"}
              </span>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-[#6c757d] hover:text-[#212529] cursor-pointer"
              >
                ✕
              </button>
            </div>
            <form
              onSubmit={handleSaveOffer}
              className="p-4 space-y-3 text-[14px]"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-medium">Partner Name</label>
                  <input
                    type="text"
                    required
                    value={editingOffer.name}
                    onChange={(e) =>
                      setEditingOffer({ ...editingOffer, name: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 border border-[#ced4da] rounded-[4px]"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">
                    Sort Order (sort_izcredit)
                  </label>
                  <input
                    type="number"
                    required
                    value={editingOffer.sort_izcredit}
                    onChange={(e) =>
                      setEditingOffer({
                        ...editingOffer,
                        sort_izcredit: Number(e.target.value),
                      })
                    }
                    className="w-full px-2.5 py-1.5 border border-[#ced4da] rounded-[4px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-medium">First Loan</label>
                  <input
                    type="text"
                    value={editingOffer.overview_amount_first}
                    onChange={(e) =>
                      setEditingOffer({
                        ...editingOffer,
                        overview_amount_first: e.target.value,
                      })
                    }
                    className="w-full px-2.5 py-1.5 border border-[#ced4da] rounded-[4px]"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Max Amount</label>
                  <input
                    type="text"
                    value={editingOffer.overview_amount_max}
                    onChange={(e) =>
                      setEditingOffer({
                        ...editingOffer,
                        overview_amount_max: e.target.value,
                      })
                    }
                    className="w-full px-2.5 py-1.5 border border-[#ced4da] rounded-[4px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-medium">Slogan</label>
                  <input
                    type="text"
                    value={editingOffer.overview_slogan}
                    onChange={(e) =>
                      setEditingOffer({
                        ...editingOffer,
                        overview_slogan: e.target.value,
                      })
                    }
                    className="w-full px-2.5 py-1.5 border border-[#ced4da] rounded-[4px]"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">
                    Mức Hoàn Tiền CashBack
                  </label>
                  <input
                    type="text"
                    value={editingOffer.cashback_amount || "120 000 ₫"}
                    onChange={(e) =>
                      setEditingOffer({
                        ...editingOffer,
                        cashback_amount: e.target.value,
                      })
                    }
                    className="w-full px-2.5 py-1.5 border border-[#ced4da] rounded-[4px]"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium">Company Name</label>
                <input
                  type="text"
                  value={editingOffer.detail_company}
                  onChange={(e) =>
                    setEditingOffer({
                      ...editingOffer,
                      detail_company: e.target.value,
                    })
                  }
                  className="w-full px-2.5 py-1.5 border border-[#ced4da] rounded-[4px]"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Affiliate URL</label>
                <input
                  type="text"
                  value={editingOffer.link_devaynhat}
                  onChange={(e) =>
                    setEditingOffer({
                      ...editingOffer,
                      link_devaynhat: e.target.value,
                    })
                  }
                  className="w-full px-2.5 py-1.5 border border-[#ced4da] rounded-[4px]"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="activeOffer"
                  type="checkbox"
                  checked={editingOffer.active !== false}
                  onChange={(e) =>
                    setEditingOffer({
                      ...editingOffer,
                      active: e.target.checked,
                    })
                  }
                />
                <label htmlFor="activeOffer">
                  Hiển thị trên Trang chủ (Active)
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#dee2e6]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 bg-[#6c757d] text-white rounded-[4px] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#0d6efd] hover:bg-[#0b5ed7] text-white rounded-[4px] cursor-pointer"
                >
                  Lưu vào Vercel Redis
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </SbAdminLayout>
  );
}
