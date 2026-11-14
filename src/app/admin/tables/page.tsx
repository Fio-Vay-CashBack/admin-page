"use client";

import React, { useState } from "react";
import Link from "next/link";
import SbAdminLayout from "@/components/admin/SbAdminLayout";
import SbAdminDataTable from "@/components/admin/SbAdminDataTable";

export default function AdminTablesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SbAdminLayout searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <h1 className="text-[38px] font-medium text-[#212529] leading-tight mt-1 mb-3">
        Tables
      </h1>

      <ol className="bg-[#e9ecef] rounded-[4px] px-4 py-3 mb-6 text-[15px] text-[#6c757d] flex items-center gap-2 list-none">
        <li>
          <Link href="/admin" className="text-[#0d6efd] hover:underline">
            Dashboard
          </Link>
        </li>
        <li>/</li>
        <li>Tables</li>
      </ol>

      <div className="border border-black/15 rounded-[4px] bg-white p-4 mb-6 text-[15px] text-[#212529]">
        DataTables is a third party plugin that is used to generate the demo
        table below. To manage the live{" "}
        <Link href="/admin/loans" className="text-[#0d6efd] hover:underline">
          DeVayNhat.Com Loan Offers
        </Link>
        , visit the Loan Offers page.
      </div>

      <SbAdminDataTable externalSearch={searchQuery} />
    </SbAdminLayout>
  );
}

