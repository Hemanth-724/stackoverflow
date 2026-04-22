"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Eye, MessageSquare, FileText } from "lucide-react";

const RightSideBar = () => {
  return (
    <aside className="w-[300px] text-[13px] pb-24">

      {/* YELLOW / WHITE WIDGET */}
      <div className="bg-[#fdf7e2] border border-[#f1e5bc] rounded shadow-[0_1px_2px_hsla(0,0%,0%,0.05),0_1px_4px_hsla(0,0%,0%,0.05),0_2px_8px_hsla(0,0%,0%,0.05)] mb-4">
        
        {/* THE OVERFLOW BLOG */}
        <div className="bg-[#fdf7e2] text-[#525960] font-bold text-[12px] p-3 border-b border-[#f1e5bc]">
          The Overflow Blog
        </div>

        <ul className="bg-[#fbf3d5] p-0 m-0 text-[#3b4045]">
          <li className="flex px-4 py-2 gap-2">
            <svg aria-hidden="true" className="w-[14px] h-[14px] shrink-0 mt-[2px]" width="14" height="14" viewBox="0 0 14 14"><path d="m11.1 1.71 1.13 1.12c.2.2.2.51 0 .71L11.1 4.7 9.21 2.86l1.17-1.15c.2-.2.51-.2.71 0ZM2 10.12l6.37-6.43 1.88 1.88L3.88 12H2v-1.88Z" fill="#3b4045" opacity="0.6"/></svg>
            <span>A new era of Stack Overflow</span>
          </li>
          <li className="flex px-4 py-2 gap-2">
            <svg aria-hidden="true" className="w-[14px] h-[14px] shrink-0 mt-[2px]" width="14" height="14" viewBox="0 0 14 14"><path d="m11.1 1.71 1.13 1.12c.2.2.2.51 0 .71L11.1 4.7 9.21 2.86l1.17-1.15c.2-.2.51-.2.71 0ZM2 10.12l6.37-6.43 1.88 1.88L3.88 12H2v-1.88Z" fill="#3b4045" opacity="0.6"/></svg>
            <span>How your favorite movie is changing language learning technology</span>
          </li>
        </ul>

        {/* META */}
        <div className="bg-[#fdf7e2] text-[#525960] font-bold text-[12px] p-3 border-t border-b border-[#f1e5bc]">
          Featured on Meta
        </div>

        <ul className="bg-[#fbf3d5] p-0 m-0 text-[#3b4045] pb-2 text-[13px]">
          <li className="flex px-4 py-2 gap-2">
            <svg aria-hidden="true" className="w-[14px] h-[14px] shrink-0 mt-[2px] text-[#0074cc]" viewBox="0 0 14 14" fill="#0074cc" opacity="0.6"><path d="M6.85 1.83c-2.84 0-5.2 2-5.74 4.73A6 6 0 0 0 6 12v1.5c3.27-1.07 5.75-4.14 5.75-7.67A5.8 5.8 0 0 0 6.85 1.83ZM4.01 7.21c-.43 0-.8-.38-.8-.82a.84.84 0 0 1 1.62 0c0 .44-.37.82-.82.82Zm2.83 0c-.43 0-.8-.38-.8-.82a.84.84 0 0 1 1.62 0c0 .44-.38.82-.82.82Zm2.83 0c-.43 0-.8-.38-.8-.82a.83.83 0 0 1 1.62 0c0 .44-.38.82-.82.82Z"/></svg>
            <span>Results of the June 2025 Community Asks Sprint</span>
          </li>
          <li className="flex px-4 py-2 gap-2">
            <svg aria-hidden="true" className="w-[14px] h-[14px] shrink-0 mt-[2px] text-[#0074cc]" viewBox="0 0 14 14" fill="#0074cc" opacity="0.6"><path d="M6.85 1.83c-2.84 0-5.2 2-5.74 4.73A6 6 0 0 0 6 12v1.5c3.27-1.07 5.75-4.14 5.75-7.67A5.8 5.8 0 0 0 6.85 1.83ZM4.01 7.21c-.43 0-.8-.38-.8-.82a.84.84 0 0 1 1.62 0c0 .44-.37.82-.82.82Zm2.83 0c-.43 0-.8-.38-.8-.82a.84.84 0 0 1 1.62 0c0 .44-.38.82-.82.82Zm2.83 0c-.43 0-.8-.38-.8-.82a.83.83 0 0 1 1.62 0c0 .44-.38.82-.82.82Z"/></svg>
            <span>Will you help build our new visual identity?</span>
          </li>
          <li className="flex px-4 py-2 gap-2">
            <img src="/so-icon.png" alt="Stack Overflow" className="w-[14px] h-[14px] shrink-0 mt-[2px] opacity-60 grayscale" />
            <span>Policy: Generative AI (e.g., ChatGPT) is banned</span>
          </li>
        </ul>

      </div>

      {/* CUSTOM FILTER */}
      <div className="mb-4">
        <h3 className="text-[15px] text-[#242729] mb-3">
          Custom Filters
        </h3>

        <button className="text-[#0a95ff] hover:text-[#0074cc] text-[13px] hover:bg-[#f0f8ff] px-2 py-1 rounded">
          Create a custom filter
        </button>
      </div>

      {/* WATCHED TAGS */}
      <div className="mb-4">
        <h3 className="text-[15px] text-[#242729] mb-3">
          Watched Tags
        </h3>

        <div className="flex flex-col items-center justify-center p-8 bg-[#f8f9f9] border border-[#d6d9dc] rounded">
          <svg aria-hidden="true" className="w-12 h-12 text-[#c8ccd0] mb-2" viewBox="0 0 48 48"><path d="M24.06 6.01c-6.28 0-11.83 3.65-15.03 8.85C5.83 20.06 4.3 22.06 4 24c.3 1.94 1.83 3.94 5.03 9.14A17.9 17.9 0 0 0 24.06 42c6.28 0 11.83-3.65 15.03-8.85C42.29 27.95 43.82 25.95 44 24c-.2-1.95-1.73-3.95-4.91-9.15A17.9 17.9 0 0 0 24.06 6.01Zm0 31.99c-5.11 0-9.67-3.08-12.08-7.59-.25-.47-.5-.95-.73-1.42A16.64 16.64 0 0 1 7.2 24c.66-1.57 2.21-4.06 4.05-6.99 2.41-4.51 6.97-7.59 12.08-7.59s9.67 3.08 12.08 7.59c1.84 2.93 3.39 5.42 4.05 6.99A16.64 16.64 0 0 1 35.4 29c-.23.47-.48.95-.73 1.42-2.4 4.51-6.96 7.58-12.07 7.58Zh-.21l.1-.03-.1.03Z" fill="currentColor"/><path d="M24.06 14C18.42 14 14 18.52 14 24.16S18.42 34 24.06 34 34 29.8 34 24.16 29.7 14 24.06 14Zm0 15.6c-3.14 0-5.69-2.5-5.69-5.6 0-3.1 2.55-5.6 5.69-5.6 3.14 0 5.69 2.5 5.69 5.6 0 3.1-2.55 5.6-5.69 5.6Z" fill="currentColor"/></svg>
          <p className="text-[#6a737c] text-[13px] text-center mb-4 leading-snug">
            Watch tags to curate your list of questions.
          </p>

          <button className="bg-[#e1ecf4] text-[#39739d] hover:bg-[#d0e3f1] border border-[#7aa7c7] px-2.5 py-2 rounded text-[13px] transition-colors shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)]">
            Watch a tag
          </button>
        </div>
      </div>

    </aside>
  );
};

export default RightSideBar;