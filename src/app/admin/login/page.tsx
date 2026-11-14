"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/admin");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0d6efd] font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,'Helvetica_Neue',Arial,sans-serif] text-[#212529]">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[450px] bg-white rounded-[6px] shadow-lg border border-black/15 overflow-hidden">
          <div className="bg-[#f7f7f7] border-b border-black/12 py-6 px-6 text-center">
            <h3 className="text-[28px] font-light text-[#212529]">Login</h3>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="inputEmail"
                  className="block text-[13px] text-[#6c757d] mb-1"
                >
                  Email address
                </label>
                <input
                  id="inputEmail"
                  type="email"
                  defaultValue="admin@devaynhat.com"
                  placeholder="name@example.com"
                  required
                  className="w-full h-[46px] px-3 border border-[#ced4da] rounded-[4px] text-[15px] focus:outline-none focus:border-[#86b7fe]"
                />
              </div>
              <div>
                <label
                  htmlFor="inputPassword"
                  className="block text-[13px] text-[#6c757d] mb-1"
                >
                  Password
                </label>
                <input
                  id="inputPassword"
                  type="password"
                  defaultValue="password123"
                  placeholder="Password"
                  required
                  className="w-full h-[46px] px-3 border border-[#ced4da] rounded-[4px] text-[15px] focus:outline-none focus:border-[#86b7fe]"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="inputRememberPassword"
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 rounded border-[#ced4da]"
                />
                <label
                  htmlFor="inputRememberPassword"
                  className="text-[14.5px] text-[#212529]"
                >
                  Remember Password
                </label>
              </div>
              <div className="flex items-center justify-between pt-2">
                <Link
                  href="/admin"
                  className="text-[13.5px] text-[#0d6efd] hover:underline"
                >
                  Forgot Password?
                </Link>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0d6efd] hover:bg-[#0b5ed7] text-white text-[15px] rounded-[4px] cursor-pointer"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="bg-[#f7f7f7] border-t border-black/12 py-3 px-6 text-center text-[13.5px]">
            <Link href="/admin" className="text-[#0d6efd] hover:underline">
              Need an account? Sign up!
            </Link>
          </div>
        </div>
      </div>

      <footer className="py-6 px-6 bg-[#f8f9fa] border-t border-[#dee2e6]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[13px] text-[#6c757d] gap-2">
          <div>Copyright &copy; DeVayNhat.Com 2026</div>
          <div className="flex items-center gap-2">
            <Link
              href="/chinh-sach-bao-mat"
              className="text-[#0d6efd] hover:underline"
            >
              Privacy Policy
            </Link>
            <span>&middot;</span>
            <Link
              href="/thoa-thuan-nguoi-dung"
              className="text-[#0d6efd] hover:underline"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

