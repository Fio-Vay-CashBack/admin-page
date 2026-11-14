"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import SbAdminLayout from "@/components/admin/SbAdminLayout";
import { API_BASE_URL } from "@/lib/api";

interface BorrowerLead {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  desiredAmount: number;
  age: number;
  city?: string;
  matchedLenders: string[];
  cashbackCode: string;
  cashbackEstimate: string;
  status: "pending" | "approved" | "cashback_paid";
  source: "website" | "mobile-app";
  createdAt: string;
}

interface ContactItem {
  id: string;
  name: string;
  email: string;
  message: string;
  source: string;
  createdAt: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<BorrowerLead[]>([]);
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [leadsRes, contactsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/leads`).then((r) => r.json()),
        fetch(`${API_BASE_URL}/api/contacts`).then((r) => r.json()),
      ]);
      if (leadsRes?.success) setLeads(leadsRes.data || []);
      if (contactsRes?.success) setContacts(contactsRes.data || []);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleUpdateLeadStatus = async (
    id: string,
    status: BorrowerLead["status"]
  ) => {
    try {
      await fetch(`${API_BASE_URL}/api/leads`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      fetchAll();
    } catch {
      // ignore
    }
  };

  return (
    <SbAdminLayout>
      <div className="flex items-center justify-between mt-1 mb-3">
        <h1 className="text-[34px] font-medium text-[#212529] leading-tight">
          Khách Hàng Đăng Ký Vay &amp; CashBack Leads
        </h1>
        <button
          type="button"
          onClick={fetchAll}
          className="px-4 py-2 bg-[#0d6efd] hover:bg-[#0b5ed7] text-white text-[14px] rounded-[4px] cursor-pointer"
        >
          {loading ? "Đang tải..." : "↻ Làm mới từ Redis"}
        </button>
      </div>

      <ol className="bg-[#e9ecef] rounded-[4px] px-4 py-3 mb-6 text-[15px] text-[#6c757d] flex items-center gap-2 list-none">
        <li>
          <Link href="/admin" className="text-[#0d6efd] hover:underline">
            Dashboard
          </Link>
        </li>
        <li>/</li>
        <li>Borrower Leads &amp; CashBack Claims (Vercel Redis)</li>
      </ol>

      {/* Leads Table */}
      <div className="border border-black/15 rounded-[4px] bg-white overflow-hidden mb-6">
        <div className="bg-[#f7f7f7] border-b border-black/12 px-4 py-2.5 font-semibold text-[14.5px]">
          🎁 Danh sách Hồ sơ Kết nối Khoản vay &amp; Mã Hoàn Tiền CashBack ({leads.length})
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full border-collapse border border-[#dee2e6] text-[14px]">
            <thead>
              <tr className="bg-[#f8f9fa]">
                <th className="border border-[#dee2e6] px-3 py-2 text-left">
                  Mã CashBack
                </th>
                <th className="border border-[#dee2e6] px-3 py-2 text-left">
                  Khách Hàng
                </th>
                <th className="border border-[#dee2e6] px-3 py-2 text-left">
                  Số Tiền Vay / Tuổi
                </th>
                <th className="border border-[#dee2e6] px-3 py-2 text-left">
                  Đối Tác Đề Xuất
                </th>
                <th className="border border-[#dee2e6] px-3 py-2 text-left">
                  Nguồn
                </th>
                <th className="border border-[#dee2e6] px-3 py-2 text-left">
                  Trạng Thái
                </th>
                <th className="border border-[#dee2e6] px-3 py-2 text-left">
                  Cập Nhật
                </th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-[#f8f9fa]">
                  <td className="border border-[#dee2e6] px-3 py-2.5 font-bold text-[#198754]">
                    <div>{lead.cashbackCode}</div>
                    <div className="text-[12px] text-[#6c757d]">
                      Hoàn {lead.cashbackEstimate}
                    </div>
                  </td>
                  <td className="border border-[#dee2e6] px-3 py-2.5">
                    <div className="font-semibold">{lead.fullName}</div>
                    <div className="text-[12.5px] text-[#6c757d]">
                      SĐT: {lead.phone}
                    </div>
                  </td>
                  <td className="border border-[#dee2e6] px-3 py-2.5">
                    <div className="font-semibold">
                      {Number(lead.desiredAmount).toLocaleString()} ₫
                    </div>
                    <div className="text-[12px] text-[#6c757d]">
                      {lead.age} tuổi
                    </div>
                  </td>
                  <td className="border border-[#dee2e6] px-3 py-2.5">
                    <div className="flex flex-wrap gap-1">
                      {(lead.matchedLenders || []).map((m) => (
                        <span
                          key={m}
                          className="px-2 py-0.5 bg-[#e9ecef] rounded text-[12px]"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="border border-[#dee2e6] px-3 py-2.5">
                    <span className="px-2 py-0.5 rounded bg-[#cfe2ff] text-[#084298] text-[12px] font-medium">
                      {lead.source}
                    </span>
                  </td>
                  <td className="border border-[#dee2e6] px-3 py-2.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[12px] font-bold ${
                        lead.status === "cashback_paid"
                          ? "bg-[#198754] text-white"
                          : lead.status === "approved"
                          ? "bg-[#0d6efd] text-white"
                          : "bg-[#ffc107] text-[#212529]"
                      }`}
                    >
                      {lead.status === "cashback_paid"
                        ? "Đã hoàn tiền"
                        : lead.status === "approved"
                        ? "Đã duyệt vay"
                        : "Chờ đối soát"}
                    </span>
                  </td>
                  <td className="border border-[#dee2e6] px-3 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() =>
                          handleUpdateLeadStatus(lead.id, "approved")
                        }
                        className="px-2 py-1 bg-[#0d6efd] text-white rounded text-[12px] cursor-pointer"
                      >
                        Duyệt
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleUpdateLeadStatus(lead.id, "cashback_paid")
                        }
                        className="px-2 py-1 bg-[#198754] text-white rounded text-[12px] cursor-pointer"
                      >
                        Trả CashBack
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="border border-black/15 rounded-[4px] bg-white overflow-hidden">
        <div className="bg-[#f7f7f7] border-b border-black/12 px-4 py-2.5 font-semibold text-[14.5px]">
          ✉️ Tin Nhắn Liên Hệ Từ Người Dùng ({contacts.length})
        </div>
        <div className="p-4 overflow-x-auto">
          {contacts.length === 0 ? (
            <div className="text-[14px] text-[#6c757d]">
              Chưa có tin nhắn liên hệ mới.
            </div>
          ) : (
            <table className="w-full border-collapse border border-[#dee2e6] text-[14px]">
              <thead>
                <tr className="bg-[#f8f9fa]">
                  <th className="border border-[#dee2e6] px-3 py-2 text-left">
                    Họ Tên
                  </th>
                  <th className="border border-[#dee2e6] px-3 py-2 text-left">
                    Email
                  </th>
                  <th className="border border-[#dee2e6] px-3 py-2 text-left">
                    Nội Dung Câu Hỏi
                  </th>
                  <th className="border border-[#dee2e6] px-3 py-2 text-left">
                    Nguồn
                  </th>
                  <th className="border border-[#dee2e6] px-3 py-2 text-left">
                    Thời Gian
                  </th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c.id} className="hover:bg-[#f8f9fa]">
                    <td className="border border-[#dee2e6] px-3 py-2 font-semibold">
                      {c.name}
                    </td>
                    <td className="border border-[#dee2e6] px-3 py-2">
                      {c.email}
                    </td>
                    <td className="border border-[#dee2e6] px-3 py-2">
                      {c.message}
                    </td>
                    <td className="border border-[#dee2e6] px-3 py-2">
                      {c.source}
                    </td>
                    <td className="border border-[#dee2e6] px-3 py-2 text-[12px] text-[#6c757d]">
                      {new Date(c.createdAt).toLocaleString("vi-VN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </SbAdminLayout>
  );
}
