import React from 'react';
import Mainlayout from '@/Layout/Mainlayout';
import { useAuth } from '@/context/authcontext';
import Link from 'next/link';

const chatRooms = [
  { name: "JavaScript", description: "Discussion about JavaScript, ECMAScript, and related topics", users: 42, messages: "12.4k" },
  { name: "Python", description: "All things Python — from web dev to data science", users: 38, messages: "9.8k" },
  { name: "React & Next.js", description: "React ecosystem, hooks, Next.js, and frontend architecture", users: 27, messages: "7.2k" },
  { name: "Career & Soft Skills", description: "Career advice, interview prep, and professional development", users: 19, messages: "5.1k" },
  { name: "Code Review", description: "Get feedback on your code from experienced developers", users: 15, messages: "3.4k" },
  { name: "Open Source", description: "Discuss open source projects, contributions, and community", users: 12, messages: "2.8k" },
];

export default function ChatPage() {
  const { user } = useAuth();

  return (
    <Mainlayout>
      <div className="py-8 w-full">
        <h1 className="text-[27px] text-[#242729] mb-2">Chat</h1>
        <p className="text-[15px] text-[#6a737c] mb-8 max-w-2xl">
          Real-time conversations with the developer community. Join a chat room to discuss topics, get help, or just hang out.
        </p>

        {!user && (
          <div className="bg-[#fdf7e2] border border-[#f1e5bc] rounded p-4 mb-6 flex items-center gap-3">
            <svg className="w-5 h-5 text-[#f48024] shrink-0" fill="currentColor" viewBox="0 0 18 18">
              <path d="M9 17c-4.36 0-8-3.64-8-8s3.64-8 8-8 8 3.64 8 8-3.64 8-8 8ZM8 4v6h2V4H8Zm0 8v2h2v-2H8Z"/>
            </svg>
            <span className="text-[13px] text-[#3b4045]">
              <Link href="/auth" className="text-[#0074cc] hover:text-[#0a95ff]">Log in</Link> to participate in chat rooms.
            </span>
          </div>
        )}

        {/* Chat Rooms */}
        <div className="space-y-3">
          {chatRooms.map((room, idx) => (
            <div
              key={idx}
              className="border border-[#d6d9dc] rounded p-4 bg-white hover:shadow-sm transition-shadow cursor-pointer flex items-center justify-between group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-[15px] text-[#0074cc] group-hover:text-[#0a95ff] font-medium">
                    {room.name}
                  </h2>
                  <span className="w-2 h-2 rounded-full bg-[#2f6f44] shrink-0"></span>
                </div>
                <p className="text-[13px] text-[#6a737c] truncate">{room.description}</p>
              </div>
              <div className="flex items-center gap-6 ml-4 shrink-0 text-[12px] text-[#838c95]">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 18 18">
                    <path d="M9 1a8 8 0 1 0 0 16A8 8 0 0 0 9 1ZM5.5 6.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm1.09 5.13A2.1 2.1 0 0 1 8.5 10h1a2.1 2.1 0 0 1 1.91 1.63l.09.37H6.5l.09-.37ZM12 8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"/>
                  </svg>
                  <span>{room.users} online</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 18 18">
                    <path d="M3 3h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-3l-4 3v-3H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/>
                  </svg>
                  <span>{room.messages}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center text-[13px] text-[#6a737c]">
          <p>Chat is currently in read-only preview mode. Full chat functionality coming soon!</p>
        </div>
      </div>
    </Mainlayout>
  );
}
