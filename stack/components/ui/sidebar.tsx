"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const router = useRouter();
  const currentPath = router.pathname;

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const linkClass = (path: string, indented: boolean = false) =>
    cn(
      "flex items-center py-2 text-[13px] transition-colors",
      indented ? "px-2 pl-[30px]" : "px-4",
      isActive(path)
        ? "text-[#0f1115] bg-[#f1f2f3] border-r-4 border-[#f48024] font-bold"
        : "text-[#525960] hover:text-[#0f1115]"
    );

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
            <Link href="/" className={linkClass("/")}>
              Home
            </Link>
          </li>

          <li className="mt-4 mb-1">
            <div className="px-2 text-[11px] text-[#6a737c]">PUBLIC</div>
          </li>
          
          {/* Questions */}
          <li>
            <Link href="/questions" className={linkClass("/questions", false)}>
              <svg aria-hidden="true" className="w-[18px] h-[18px] mr-1 opacity-50" width="18" height="18" viewBox="0 0 18 18"><path d="M9.06 3C4 3 1 8 1 8s3 5 8.06 5C14 13 17 8 17 8s-3-5-7.94-5ZM9 11.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Zm0-1.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" fill="currentColor"/></svg>
              Questions
            </Link>
          </li>

          {/* AI Assist */}
          <li>
            <Link href="/ai-assist" className={linkClass("/ai-assist", true)}>
              AI Assist
              <span className="ml-auto text-[10px] bg-[#f8f9f9] border border-[#d6d9dc] text-[#6a737c] px-1 rounded uppercase tracking-wider font-semibold">
                labs
              </span>
            </Link>
          </li>

          {/* Tags */}
          <li>
            <Link href="/tags" className={linkClass("/tags", true)}>
              Tags
            </Link>
          </li>

          {/* Users */}
          <li>
            <Link href="/users" className={linkClass("/users", true)}>
              Users
            </Link>
          </li>

          {/* Saves */}
          <li>
            <Link href="/saves" className={linkClass("/saves", true)}>
              Saves
            </Link>
          </li>

          {/* Challenges */}
          <li>
            <Link href="/challenges" className={linkClass("/challenges", true)}>
              Challenges
              <span className="ml-auto text-[10px] bg-[#fdf2ea] border border-[#f48024] text-[#d1383d] px-1 rounded uppercase font-semibold">
                NEW
              </span>
            </Link>
          </li>

          {/* Chat */}
          <li>
            <Link href="/chat" className={linkClass("/chat", true)}>
              Chat
            </Link>
          </li>

          {/* Articles */}
          <li>
            <Link href="/articles" className={linkClass("/articles", true)}>
              Articles
            </Link>
          </li>

          {/* Companies */}
          <li>
            <Link href="/companies" className={linkClass("/companies", true)}>
              Companies
            </Link>
          </li>

        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;