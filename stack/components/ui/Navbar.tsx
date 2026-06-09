"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authcontext";

const Navbar = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-[53px] w-full border-t-[3px] border-t-[#f48024] bg-white shadow-[0_1px_2px_hsla(0,0%,0%,0.05),0_1px_4px_hsla(0,0%,0%,0.05),0_2px_8px_hsla(0,0%,0%,0.05)] z-50 flex items-center justify-center">
      <div className="flex items-center justify-between px-4 lg:px-8 w-full h-[50px]">

        {/* LEFT */}
        <div className="flex items-center h-full">
          
          {/* Logo */}
          <Link href="/" className="flex items-center px-2 hover:bg-[#e3e6e8] h-full transition-colors text-black">
            <svg aria-hidden="true" className="w-[32px] h-[37px] -mt-1" viewBox="0 0 32 37"><path d="M26 33v-9h4v13H0V24h4v9h22Z" fill="#BCBBBB"/><path d="m21.5 0-2.7 2 9.9 13.3 2.7-2L21.5 0ZM26 18.4 13.3 7.8l2.1-2.5 12.7 10.6-2.1 2.5ZM9.1 15.2l15 7 1.4-3-15-7-1.4 3Zm14 10.79.68-2.95-16.1-3.35L7 23l16.1 2.99ZM23 30H7v-3h16v3Z" fill="#F48024"/></svg>
            <span className="font-bold text-[19px] ml-1 mt-1 font-[system-ui]">stack <span className="font-normal">overflow</span></span>
          </Link>

          {/* Menu */}
          <nav className="hidden md:flex text-[13px] text-[#525960] h-full ml-2">
            {["About", "Products", "For Teams"].map((item) => (
              <Link key={item} href="/" className="flex items-center px-4 hover:bg-[#e3e6e8] hover:text-[#242729] rounded-full my-1.5 transition-colors">
                {item}
              </Link>
            ))}
          </nav>
        </div>

        {/* CENTER - SEARCH */}
        <div className="hidden md:flex flex-1 max-w-4xl px-2">
          <div className="relative w-full">
            <svg aria-hidden="true" className="absolute left-2.5 top-[9px] text-[#838c95] w-[18px] h-[18px]" viewBox="0 0 18 18"><path d="m18 16.5-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5ZM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0Z" fill="currentColor"/></svg>
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="border border-[#babfc4] bg-white outline-none pl-8 py-[7px] px-2 rounded-[3px] text-[13px] w-full text-[#3b4045] focus:border-[#6bbbf7] focus:shadow-[0_0_0_4px_rgba(0,116,204,0.15)] placeholder:text-[#838c95]"
            />
          </div>
        </div>

        {/* RIGHT - AUTH */}
        <div className="flex items-center gap-1 h-full pr-2">
          {user ? (
            <>
              {/* Profile — links to own user page */}
              <Link
                href={`/users/${user._id}`}
                className="flex items-center justify-center p-2 hover:bg-[#e3e6e8] transition-colors rounded-[3px] self-center ml-2"
              >
                <div className="w-6 h-6 flex items-center justify-center rounded-[3px] bg-[#f48024] text-white text-[12px] font-bold shadow-sm uppercase">
                  {user.name ? user.name[0] : 'U'}
                </div>
              </Link>

              {/* Logout */}
              <div className="flex items-center">
                <button onClick={handleLogout} className="bg-[#e1ecf4] text-[#39739d] hover:bg-[#b3d3ea] hover:text-[#2c5877] text-[13px] px-[10.4px] py-[8px] rounded-[3px] border border-[#7aa7c7] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)] ml-1">
                  Log out
                </button>
              </div>
            </>
          ) : (
             <div className="flex items-center space-x-1 ml-2">
                <Link href="/auth" className="bg-[#e1ecf4] text-[#39739d] hover:bg-[#b3d3ea] hover:text-[#2c5877] text-[13px] px-[10.4px] py-[8px] rounded-[3px] border border-[#7aa7c7] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)]">
                    Log in
                </Link>
                <Link href="/signup" className="bg-[#0a95ff] hover:bg-[#0074cc] text-white text-[13px] px-[10.4px] py-[8px] rounded-[3px] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)] transition-colors">
                    Sign up
                </Link>
             </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;