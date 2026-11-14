"use client";

import React, { useState, useMemo } from "react";

export interface EmployeeRow {
  name: string;
  position: string;
  office: string;
  age: number;
  startDate: string;
  salary: string;
}

const INITIAL_EMPLOYEES: EmployeeRow[] = [
  {
    name: "Airi Satou",
    position: "Accountant",
    office: "Tokyo",
    age: 33,
    startDate: "2008/11/28",
    salary: "$162,700",
  },
  {
    name: "Angelica Ramos",
    position: "Chief Executive Officer (CEO)",
    office: "London",
    age: 47,
    startDate: "2009/10/09",
    salary: "$1,200,000",
  },
  {
    name: "Ashton Cox",
    position: "Junior Technical Author",
    office: "San Francisco",
    age: 66,
    startDate: "2009/01/12",
    salary: "$86,000",
  },
  {
    name: "Bradley Greer",
    position: "Software Engineer",
    office: "London",
    age: 41,
    startDate: "2012/10/13",
    salary: "$132,000",
  },
  {
    name: "Brenden Wagner",
    position: "Software Engineer",
    office: "San Francisco",
    age: 28,
    startDate: "2011/06/07",
    salary: "$206,850",
  },
  {
    name: "Brielle Williamson",
    position: "Integration Specialist",
    office: "New York",
    age: 61,
    startDate: "2012/12/02",
    salary: "$372,000",
  },
  {
    name: "Bruno Nash",
    position: "Software Engineer",
    office: "London",
    age: 38,
    startDate: "2011/05/03",
    salary: "$163,500",
  },
  {
    name: "Caesar Vance",
    position: "Pre-Sales Support",
    office: "New York",
    age: 21,
    startDate: "2011/12/12",
    salary: "$106,450",
  },
  {
    name: "Cara Stevens",
    position: "Sales Assistant",
    office: "New York",
    age: 46,
    startDate: "2011/12/06",
    salary: "$145,600",
  },
  {
    name: "Cedric Kelly",
    position: "Senior Javascript Developer",
    office: "Edinburgh",
    age: 22,
    startDate: "2012/03/29",
    salary: "$433,060",
  },
  {
    name: "Charde Marshall",
    position: "Regional Director",
    office: "San Francisco",
    age: 36,
    startDate: "2008/10/16",
    salary: "$470,600",
  },
  {
    name: "Colleen Hurst",
    position: "Javascript Developer",
    office: "San Francisco",
    age: 39,
    startDate: "2009/09/15",
    salary: "$205,500",
  },
  {
    name: "Dai Rios",
    position: "Personnel Lead",
    office: "Edinburgh",
    age: 35,
    startDate: "2012/09/26",
    salary: "$217,500",
  },
  {
    name: "Donna Snider",
    position: "Customer Support",
    office: "New York",
    age: 27,
    startDate: "2011/01/25",
    salary: "$112,000",
  },
  {
    name: "Doris Wilder",
    position: "Sales Assistant",
    office: "Sidney",
    age: 23,
    startDate: "2010/09/20",
    salary: "$85,600",
  },
  {
    name: "Finn Camacho",
    position: "Support Engineer",
    office: "San Francisco",
    age: 47,
    startDate: "2009/07/07",
    salary: "$87,500",
  },
  {
    name: "Fiona Green",
    position: "Chief Operating Officer (COO)",
    office: "San Francisco",
    age: 48,
    startDate: "2010/03/11",
    salary: "$850,000",
  },
  {
    name: "Garrett Winters",
    position: "Accountant",
    office: "Tokyo",
    age: 63,
    startDate: "2011/07/25",
    salary: "$170,750",
  },
  {
    name: "Gavin Cortez",
    position: "Team Leader",
    office: "San Francisco",
    age: 22,
    startDate: "2008/10/26",
    salary: "$235,500",
  },
  {
    name: "Gavin Joyce",
    position: "Developer",
    office: "Edinburgh",
    age: 42,
    startDate: "2010/12/22",
    salary: "$92,575",
  },
  {
    name: "Gloria Little",
    position: "Systems Administrator",
    office: "New York",
    age: 59,
    startDate: "2009/04/10",
    salary: "$237,500",
  },
  {
    name: "Haley Kennedy",
    position: "Senior Marketing Designer",
    office: "London",
    age: 43,
    startDate: "2012/12/18",
    salary: "$313,500",
  },
  {
    name: "Hermione Butler",
    position: "Regional Director",
    office: "London",
    age: 47,
    startDate: "2011/03/21",
    salary: "$356,250",
  },
  {
    name: "Herrod Chandler",
    position: "Sales Assistant",
    office: "San Francisco",
    age: 59,
    startDate: "2012/08/06",
    salary: "$137,500",
  },
  {
    name: "Hope Fuentes",
    position: "Secretary",
    office: "San Francisco",
    age: 41,
    startDate: "2010/02/12",
    salary: "$109,850",
  },
];

type SortKey = keyof EmployeeRow;

export default function SbAdminDataTable({
  externalSearch = "",
}: {
  externalSearch?: string;
}) {
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const effectiveSearch = (search || externalSearch).trim().toLowerCase();

  const filteredAndSorted = useMemo(() => {
    const filtered = INITIAL_EMPLOYEES.filter(
      (row) =>
        row.name.toLowerCase().includes(effectiveSearch) ||
        row.position.toLowerCase().includes(effectiveSearch) ||
        row.office.toLowerCase().includes(effectiveSearch) ||
        String(row.age).includes(effectiveSearch) ||
        row.startDate.toLowerCase().includes(effectiveSearch) ||
        row.salary.toLowerCase().includes(effectiveSearch)
    );

    return [...filtered].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];

      if (sortKey === "salary") {
        const numA = Number(String(valA).replace(/[^0-9.-]+/g, ""));
        const numB = Number(String(valB).replace(/[^0-9.-]+/g, ""));
        return sortDir === "asc" ? numA - numB : numB - numA;
      }

      if (typeof valA === "number" && typeof valB === "number") {
        return sortDir === "asc" ? valA - valB : valB - valA;
      }

      return sortDir === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [effectiveSearch, sortKey, sortDir]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAndSorted.length / entriesPerPage)
  );
  const safePage = Math.min(currentPage, totalPages);
  const startIdx = (safePage - 1) * entriesPerPage;
  const currentRows = filteredAndSorted.slice(
    startIdx,
    startIdx + entriesPerPage
  );

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const renderSortIcon = (key: SortKey) => {
    const isActive = sortKey === key;
    return (
      <span className="inline-flex items-center gap-[1px] text-[11px] leading-none select-none ml-2">
        <span
          className={
            isActive && sortDir === "asc"
              ? "text-[#212529] font-bold"
              : "text-[#adb5bd]"
          }
        >
          ↑
        </span>
        <span
          className={
            isActive && sortDir === "desc"
              ? "text-[#212529] font-bold"
              : "text-[#adb5bd]"
          }
        >
          ↓
        </span>
      </span>
    );
  };

  return (
    <div className="border border-black/15 rounded-[4px] bg-white overflow-hidden">
      {/* Card Header */}
      <div className="bg-[#f7f7f7] border-b border-black/12 px-4 py-2.5 flex items-center gap-2 text-[14.5px] text-[#212529]">
        <svg
          className="w-4 h-4 text-[#212529]"
          fill="currentColor"
          viewBox="0 0 512 512"
        >
          <path d="M64 256V160H224v96H64zm0 64H224v96H64V320zm224 96V320H448v96H288zM448 256H288V160H448v96zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z" />
        </svg>
        <span>DataTable Example</span>
      </div>

      {/* Card Body */}
      <div className="p-4">
        {/* Top Controls: Show entries & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 text-[14.5px] text-[#212529]">
          <div className="flex items-center gap-1.5">
            <span>Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="h-[32px] px-2 py-1 border border-[#ced4da] rounded-[4px] bg-white text-[14px] text-[#212529] focus:outline-none focus:border-[#86b7fe]"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span>entries</span>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="dt-search" className="text-[14.5px]">
              Search:
            </label>
            <input
              id="dt-search"
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-[185px] h-[32px] px-2.5 border border-[#ced4da] rounded-[4px] text-[14px] text-[#212529] focus:outline-none focus:border-[#86b7fe]"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-[#dee2e6] text-[14.5px] text-[#212529]">
            <thead>
              <tr className="bg-white">
                <th
                  onClick={() => handleSort("name")}
                  className="border border-[#dee2e6] px-3 py-2.5 text-left font-bold cursor-pointer select-none"
                >
                  <div className="flex items-center justify-between">
                    <span>Name</span>
                    {renderSortIcon("name")}
                  </div>
                </th>
                <th
                  onClick={() => handleSort("position")}
                  className="border border-[#dee2e6] px-3 py-2.5 text-left font-bold cursor-pointer select-none"
                >
                  <div className="flex items-center justify-between">
                    <span>Position</span>
                    {renderSortIcon("position")}
                  </div>
                </th>
                <th
                  onClick={() => handleSort("office")}
                  className="border border-[#dee2e6] px-3 py-2.5 text-left font-bold cursor-pointer select-none"
                >
                  <div className="flex items-center justify-between">
                    <span>Office</span>
                    {renderSortIcon("office")}
                  </div>
                </th>
                <th
                  onClick={() => handleSort("age")}
                  className="border border-[#dee2e6] px-3 py-2.5 text-left font-bold cursor-pointer select-none"
                >
                  <div className="flex items-center justify-between">
                    <span>Age</span>
                    {renderSortIcon("age")}
                  </div>
                </th>
                <th
                  onClick={() => handleSort("startDate")}
                  className="border border-[#dee2e6] px-3 py-2.5 text-left font-bold cursor-pointer select-none"
                >
                  <div className="flex items-center justify-between">
                    <span>Start date</span>
                    {renderSortIcon("startDate")}
                  </div>
                </th>
                <th
                  onClick={() => handleSort("salary")}
                  className="border border-[#dee2e6] px-3 py-2.5 text-left font-bold cursor-pointer select-none"
                >
                  <div className="flex items-center justify-between">
                    <span>Salary</span>
                    {renderSortIcon("salary")}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="border border-[#dee2e6] px-3 py-6 text-center text-[#6c757d]"
                  >
                    No matching records found
                  </td>
                </tr>
              ) : (
                currentRows.map((row) => (
                  <tr
                    key={`${row.name}-${row.startDate}`}
                    className="hover:bg-[#f8f9fa] transition-colors"
                  >
                    <td className="border border-[#dee2e6] px-3 py-2.5">
                      {row.name}
                    </td>
                    <td className="border border-[#dee2e6] px-3 py-2.5">
                      {row.position}
                    </td>
                    <td className="border border-[#dee2e6] px-3 py-2.5">
                      {row.office}
                    </td>
                    <td className="border border-[#dee2e6] px-3 py-2.5">
                      {row.age}
                    </td>
                    <td className="border border-[#dee2e6] px-3 py-2.5">
                      {row.startDate}
                    </td>
                    <td className="border border-[#dee2e6] px-3 py-2.5">
                      {row.salary}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr className="bg-white">
                <th className="border border-[#dee2e6] px-3 py-2.5 text-left font-bold">
                  Name
                </th>
                <th className="border border-[#dee2e6] px-3 py-2.5 text-left font-bold">
                  Position
                </th>
                <th className="border border-[#dee2e6] px-3 py-2.5 text-left font-bold">
                  Office
                </th>
                <th className="border border-[#dee2e6] px-3 py-2.5 text-left font-bold">
                  Age
                </th>
                <th className="border border-[#dee2e6] px-3 py-2.5 text-left font-bold">
                  Start date
                </th>
                <th className="border border-[#dee2e6] px-3 py-2.5 text-left font-bold">
                  Salary
                </th>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Bottom Pagination Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3 text-[14px] text-[#212529]">
          <div>
            Showing {filteredAndSorted.length === 0 ? 0 : startIdx + 1} to{" "}
            {Math.min(startIdx + entriesPerPage, filteredAndSorted.length)} of{" "}
            {filteredAndSorted.length} entries
          </div>

          <div className="inline-flex rounded-[4px] border border-[#dee2e6] overflow-hidden select-none">
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className={`px-3 py-1.5 border-r border-[#dee2e6] ${
                safePage <= 1
                  ? "text-[#6c757d] bg-white cursor-not-allowed"
                  : "text-[#0d6efd] bg-white hover:bg-[#e9ecef] cursor-pointer"
              }`}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1.5 border-r border-[#dee2e6] cursor-pointer ${
                  page === safePage
                    ? "bg-[#0d6efd] text-white font-medium"
                    : "bg-white text-[#0d6efd] hover:bg-[#e9ecef]"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
              className={`px-3 py-1.5 ${
                safePage >= totalPages
                  ? "text-[#6c757d] bg-white cursor-not-allowed"
                  : "text-[#0d6efd] bg-white hover:bg-[#e9ecef] cursor-pointer"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

