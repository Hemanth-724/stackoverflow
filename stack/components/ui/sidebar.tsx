"use client";

import Link from "next/link";
import {
  Home,
  MessageSquare,
  Bot,
  Tag,
  Bookmark,
  Trophy,
  FileText,
  Building,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <aside
      className={cn(
        "sticky top-[53px] lg:h-[calc(100vh-53px)] w-48 lg:w-[164px] bg-white transition-transform duration-200 ease-in-out z-10 shrink-0",
        isOpen ? "fixed left-0 translate-x-0 h-full border-r shadow-sm" : "hidden lg:block translate-x-0"
      )}
    >
      <nav className="pt-8">
        <ul className="space-y-1">

          {/* Home */}
          <li>
            <Link
              href="/"
              className="flex items-center px-4 py-2 text-[#0f1115] bg-[#f1f2f3] border-r-4 border-[#f48024] font-bold text-[13px]"
            >
              Home
            </Link>
          </li>

          <li className="mt-4 mb-1">
            <div className="px-2 text-[11px] text-[#6a737c]">PUBLIC</div>
          </li>
          
          {/* Questions */}
          <li>
            <Link
              href="/questions"
              className="flex items-center px-2 py-2 text-[#525960] hover:text-[#0f1115] text-[13px]"
            >
              <svg aria-hidden="true" className="w-[18px] h-[18px] mr-1 opacity-50" width="18" height="18" viewBox="0 0 18 18"><path d="M9.06 3C4 3 1 8 1 8s3 5 8.06 5C14 13 17 8 17 8s-3-5-7.94-5ZM9 11.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Zm0-1.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" fill="currentColor"/></svg>
              Questions
            </Link>
          </li>

          {/* AI Assist */}
          <li>
            <Link
              href="#"
              className="flex items-center px-2 py-2 pl-[30px] text-[#525960] hover:text-[#0f1115] text-[13px]"
            >
              AI Assist
              <span className="ml-auto text-[10px] bg-[#f8f9f9] border border-[#d6d9dc] text-[#6a737c] px-1 rounded uppercase tracking-wider font-semibold">
                labs
              </span>
            </Link>
          </li>

          {/* Tags */}
          <li>
            <Link
              href="/tags"
              className="flex items-center px-2 py-2 pl-[30px] text-[#525960] hover:text-[#0f1115] text-[13px]"
            >
              Tags
            </Link>
          </li>

          {/* Users */}
          <li>
            <Link
              href="/users"
              className="flex items-center px-2 py-2 pl-[30px] text-[#525960] hover:text-[#0f1115] text-[13px]"
            >
              Users
            </Link>
          </li>

          {/* Saves */}
          <li>
            <Link
              href="#"
              className="flex items-center px-2 py-2 pl-[30px] text-[#525960] hover:text-[#0f1115] text-[13px]"
            >
              Saves
            </Link>
          </li>

          {/* Challenges */}
          <li>
            <Link
              href="#"
              className="flex items-center px-2 py-2 pl-[30px] text-[#525960] hover:text-[#0f1115] text-[13px]"
            >
              Challenges
              <span className="ml-auto text-[10px] bg-[#fdf2ea] border border-[#f48024] text-[#d1383d] px-1 rounded uppercase font-semibold">
                NEW
              </span>
            </Link>
          </li>

          {/* Chat */}
          <li>
            <Link
              href="#"
              className="flex items-center px-2 py-2 pl-[30px] text-[#525960] hover:text-[#0f1115] text-[13px]"
            >
              Chat
            </Link>
          </li>

          {/* Articles */}
          <li>
            <Link
              href="#"
              className="flex items-center px-2 py-2 pl-[30px] text-[#525960] hover:text-[#0f1115] text-[13px]"
            >
              Articles
            </Link>
          </li>

          {/* Companies */}
          <li>
            <Link
              href="#"
              className="flex items-center px-2 py-2 pl-[30px] text-[#525960] hover:text-[#0f1115] text-[13px]"
            >
              Companies
            </Link>
          </li>

        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;