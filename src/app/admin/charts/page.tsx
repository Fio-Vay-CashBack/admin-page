"use client";

import React from "react";
import Link from "next/link";
import SbAdminLayout from "@/components/admin/SbAdminLayout";
import {
  AreaChartCard,
  BarChartCard,
  PieChartCard,
} from "@/components/admin/SbAdminCharts";

export default function AdminChartsPage() {
  return (
    <SbAdminLayout>
      <h1 className="text-[38px] font-medium text-[#212529] leading-tight mt-1 mb-3">
        Charts
      </h1>

      <ol className="bg-[#e9ecef] rounded-[4px] px-4 py-3 mb-6 text-[15px] text-[#6c757d] flex items-center gap-2 list-none">
        <li>
          <Link href="/admin" className="text-[#0d6efd] hover:underline">
            Dashboard
          </Link>
        </li>
        <li>/</li>
        <li>Charts</li>
      </ol>

      <div className="border border-black/15 rounded-[4px] bg-white p-4 mb-6 text-[15px] text-[#212529]">
        Chart.js is a third party plugin that is used to generate the charts in
        this template. The charts below have been customized - for further
        customization options, please visit the official Chart.js documentation.
      </div>

      <div className="mb-6">
        <AreaChartCard footerText="Updated yesterday at 11:59 PM" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <BarChartCard footerText="Updated yesterday at 11:59 PM" />
        <PieChartCard footerText="Updated yesterday at 11:59 PM" />
      </div>
    </SbAdminLayout>
  );
}

