"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/ui/Navbar";
import Sidebar from "@/components/ui/sidebar";
import RightSideBar from "@/components/ui/RightSideBar";

interface MainlayoutProps {
  children: React.ReactNode;
}

const Mainlayout = ({ children }: MainlayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  }, []);

  const handleSlide = () => {
    if (window.innerWidth <= 768) {
      setSidebarOpen((prev) => !prev);
    }
  };

  return (
    <div className="bg-[#f8f9fa] text-[#3a3a3a] min-h-screen">
      
      {/* Navbar */}
      <Navbar />

      {/* Layout */}
      <div className="flex w-full pt-[53px]">

        {/* LEFT SIDEBAR */}
        <Sidebar isOpen={sidebarOpen} />

        {/* MAIN CONTENT */}
        <main className="flex-1 min-w-0 p-4 lg:p-[24px] bg-white border-l border-[#d6d9dc]">
          {children}
        </main>

        {/* RIGHT SIDEBAR */}
        <div className="hidden lg:block w-[300px] ml-6 pr-4 lg:pr-8">
          <RightSideBar />
        </div>

      </div>
    </div>
  );
};

export default Mainlayout;