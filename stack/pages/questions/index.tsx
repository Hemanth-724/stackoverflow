"use client";

import React, { useEffect, useState } from "react";
import Mainlayout from "@/Layout/Mainlayout";
import { useRouter } from "next/navigation";
import { getAllQuestions } from "@/lib/api";
import moment from "moment";

export default function QuestionsPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await getAllQuestions();
        setQuestions(data);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  return (
    <Mainlayout>
      <div className="w-full flex-1 mb-8">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-2 sm:pt-6 mb-4 sm:mb-6">
          <h1 className="text-[27px] text-[#242729] mb-4 sm:mb-0">
            All Questions
          </h1>
          <button
            onClick={() => router.push("/ask")}
            className="bg-[#0a95ff] hover:bg-[#0074cc] text-white text-[13px] px-[10.4px] py-[8px] rounded shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)] transition-colors"
          >
            Ask Question
          </button>
        </div>

        {/* FILTERS */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
          <div className="text-[17px] text-[#242729] mb-3 sm:mb-0">
            {questions.length} questions
          </div>

          <div className="flex items-center gap-4">
            <div className="flex text-[13px] border border-[#9fa6ad] rounded overflow-hidden">
              <button className="px-3 py-[9px] bg-[#e3e6e8] text-[#0f1115] border-r border-[#9fa6ad] outline-none">
                Newest
              </button>
              <button className="px-3 py-[9px] bg-white hover:bg-[#f8f9f9] text-[#3b4045] border-r border-[#9fa6ad] outline-none">
                Active
              </button>
              <button className="px-3 py-[9px] bg-white hover:bg-[#f8f9f9] text-[#3b4045] border-r border-[#9fa6ad] outline-none">
                <span className="flex items-center gap-1">
                  Bountied
                  <span className="bg-[#0074cc] text-white px-1.5 rounded text-[11px] font-bold">25</span>
                </span>
              </button>
              <button className="px-3 py-[9px] bg-white hover:bg-[#f8f9f9] text-[#3b4045] border-r border-[#9fa6ad] outline-none">
                Unanswered
              </button>
              <button className="px-3 py-[9px] bg-white hover:bg-[#f8f9f9] text-[#3b4045] outline-none flex items-center gap-1">
                More <span className="text-[10px]">▼</span>
              </button>
            </div>
            
            <button className="flex items-center gap-1.5 px-3 py-[9px] bg-[#e1ecf4] text-[#39739d] hover:bg-[#d0e3f1] border border-[#7aa7c7] rounded text-[13px] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)]">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 4h14v2H2V4zm2 4h10v2H4V8zm2 4h6v2H6v-2z" fill="currentColor"/>
              </svg>
              Filter
            </button>
          </div>
        </div>

        {/* QUESTION LIST */}
        <div className="border-t border-[#e3e6e8]">
          {questions.map((q) => (
            <div key={q._id} className="border-b border-[#e3e6e8] p-4 flex flex-col sm:flex-row gap-4">

              {/* LEFT - STATS */}
              <div className="flex sm:flex-col gap-2 sm:gap-1.5 items-end shrink-0 sm:w-[108px] text-[13px] pb-1">
                <div className="text-[#0f1115]">{q.upVote.length - q.downVote.length} votes</div>

                {q.noOfAnswers > 0 ? (
                  <div className={`px-1 py-[3px] rounded min-w-[65px] text-center border text-[#2f6f44] border-[#2f6f44]`}>
                    {q.noOfAnswers} {q.noOfAnswers === 1 ? 'answer' : 'answers'}
                  </div>
                ) : (
                  <div className="text-[#6a737c]">
                    {q.noOfAnswers} answers
                  </div>
                )}
              </div>

              {/* RIGHT - CONTENT */}
              <div className="flex-1 min-w-0">
                <h2 
                  onClick={() => router.push(`/questions/${q._id}`)}
                  className="text-[#0074cc] text-[17px] hover:text-[#0a95ff] cursor-pointer mb-[5px] pr-6 hover:underline line-clamp-2"
                >
                  {q.questionTitle}
                </h2>

                <p className="text-[#3b4045] text-[13px] mb-[8px] line-clamp-2 leading-[1.35]" style={{ wordBreak: "break-word" }}>
                  {q.questionBody}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-y-2 mt-auto">
                  {/* TAGS */}
                  <div className="flex gap-1.5 flex-wrap">
                    {q.questionTags.map((tag: string) => (
                      <span
                        key={tag}
                        className="bg-[#e1ecf4] text-[#39739d] hover:bg-[#d0e3f1] hover:text-[#2c5877] px-[6px] py-[4px] text-[12px] rounded cursor-pointer transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* AUTHOR INFO */}
                  <div className="text-[12px] flex items-center justify-end flex-wrap mt-[4px] sm:mt-0 gap-1.5 min-w-fit">
                    {/* User Avatar Initial */}
                    <div className="w-4 h-4 rounded text-[10px] text-white flex items-center justify-center pt-[1px] bg-[#0074cc]">
                      {q.userPosted.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-[#0074cc] hover:text-[#0a95ff] cursor-pointer hover:underline">{q.userPosted}</span>
                    <span className="text-[#6a737c]">asked {moment(q.askedOn).fromNow()}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </Mainlayout>
  );
}
