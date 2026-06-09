import React from 'react';
import Mainlayout from '@/Layout/Mainlayout';
import { useAuth } from '@/context/authcontext';
import Link from 'next/link';

export default function SavesPage() {
  const { user } = useAuth();

  return (
    <Mainlayout>
      <div className="py-8 w-full max-w-3xl">
        <h1 className="text-[27px] text-[#242729] mb-2">Saves</h1>
        <p className="text-[15px] text-[#6a737c] mb-8">
          Save questions and answers you find useful for quick access later.
        </p>

        {!user ? (
          <div className="border border-[#d6d9dc] rounded p-8 text-center bg-[#f8f9f9]">
            <svg className="w-12 h-12 text-[#c8ccd0] mx-auto mb-4" viewBox="0 0 18 18" fill="currentColor">
              <path d="M3 17V3c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v14l-6-4-6 4Z"/>
            </svg>
            <h2 className="text-[17px] text-[#242729] mb-2">Save items for later</h2>
            <p className="text-[13px] text-[#6a737c] mb-4 max-w-md mx-auto">
              Bookmark questions and answers to build your personal reference library. Log in to start saving.
            </p>
            <Link
              href="/auth"
              className="inline-block bg-[#0a95ff] hover:bg-[#0074cc] text-white text-[13px] px-4 py-2 rounded transition-colors"
            >
              Log in to save items
            </Link>
          </div>
        ) : (
          <div className="border border-[#d6d9dc] rounded p-8 text-center bg-[#f8f9f9]">
            <svg className="w-12 h-12 text-[#c8ccd0] mx-auto mb-4" viewBox="0 0 18 18" fill="currentColor">
              <path d="M3 17V3c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v14l-6-4-6 4Z"/>
            </svg>
            <h2 className="text-[17px] text-[#242729] mb-2">No saved items yet</h2>
            <p className="text-[13px] text-[#6a737c] mb-4 max-w-md mx-auto">
              Click the bookmark icon on any question or answer to save it here for easy reference.
            </p>
            <Link
              href="/questions"
              className="inline-block bg-[#e1ecf4] text-[#39739d] hover:bg-[#d0e3f1] border border-[#7aa7c7] text-[13px] px-4 py-2 rounded transition-colors"
            >
              Browse questions
            </Link>
          </div>
        )}

        {/* All Saves list - shown as "coming soon" feature info */}
        <div className="mt-6 p-4 bg-[#fdf7e2] border border-[#f1e5bc] rounded text-[13px] text-[#6a737c]">
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-4 h-4 text-[#f48024]" fill="currentColor" viewBox="0 0 18 18">
              <path d="M9 17c-4.36 0-8-3.64-8-8s3.64-8 8-8 8 3.64 8 8-3.64 8-8 8ZM8 4v6h2V4H8Zm0 8v2h2v-2H8Z"/>
            </svg>
            <span className="font-semibold text-[#3b4045]">Lists feature</span>
          </div>
          <p>You can organize your saves into custom lists. Use the bookmark button on questions and answers to start building your collection.</p>
        </div>
      </div>
    </Mainlayout>
  );
}
