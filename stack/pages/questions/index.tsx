"use client";

import React, { useEffect, useState } from "react";
import Mainlayout from "@/Layout/Mainlayout";
import { useRouter } from "next/navigation";
import { getAllQuestions } from "@/lib/api";
import { useAuth } from "@/context/authcontext";
import moment from "moment";

type FilterType = "all" | "mine" | "active" | "unanswered" | "bountied";

export default function QuestionsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [questions, setQuestions] = useState<any[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");

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

  const getFilteredQuestions = () => {
    let result = [...questions];

    switch (filter) {
      case "mine":
        if (user) {
          result = result.filter((q) => q.userId === user._id);
        }
        break;
      case "active":
        // Sort by most recent activity (answers or question date)
        result.sort((a, b) => {
          const aLatest = a.answer?.length > 0
            ? Math.max(...a.answer.map((ans: any) => new Date(ans.answeredOn).getTime()), new Date(a.askedOn).getTime())
            : new Date(a.askedOn).getTime();
          const bLatest = b.answer?.length > 0
            ? Math.max(...b.answer.map((ans: any) => new Date(ans.answeredOn).getTime()), new Date(b.askedOn).getTime())
            : new Date(b.askedOn).getTime();
          return bLatest - aLatest;
        });
        break;
      case "unanswered":
        result = result.filter((q) => q.noOfAnswers === 0);
        break;
      case "bountied":
        // No bounty system — return empty
        result = [];
        break;
      default:
        // "all" — newest first
        result.sort((a, b) => new Date(b.askedOn).getTime() - new Date(a.askedOn).getTime());
        break;
    }

    return result;
  };

  const filteredQuestions = getFilteredQuestions();

  const getPageTitle = () => {
    switch (filter) {
      case "mine": return "My Questions";
      case "active": return "Active Questions";
      case "unanswered": return "Unanswered Questions";
      case "bountied": return "Bountied Questions";
      default: return "All Questions";
    }
  };

  const filterButtons: { key: FilterType; label: string; badge?: string; requiresAuth?: boolean }[] = [
    { key: "all", label: "Newest" },
    ...(user ? [{ key: "mine" as FilterType, label: "My Questions", requiresAuth: true }] : []),
    { key: "active", label: "Active" },
    { key: "bountied", label: "Bountied", badge: "0" },
    { key: "unanswered", label: "Unanswered" },
  ];

  return (
    <Mainlayout>
      <div className="w-full flex-1 mb-8">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-2 sm:pt-6 mb-4 sm:mb-6">
          <h1 className="text-[27px] text-[#242729] mb-4 sm:mb-0">
            {getPageTitle()}
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
            {filteredQuestions.length} question{filteredQuestions.length !== 1 ? "s" : ""}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex text-[13px] border border-[#9fa6ad] rounded overflow-hidden">
              {filterButtons.map((btn, idx) => (
                <button
                  key={btn.key}
                  onClick={() => setFilter(btn.key)}
                  className={`px-3 py-[9px] outline-none transition-colors ${
                    idx < filterButtons.length - 1 ? "border-r border-[#9fa6ad]" : ""
                  } ${
                    filter === btn.key
                      ? "bg-[#e3e6e8] text-[#0f1115] font-medium"
                      : "bg-white hover:bg-[#f8f9f9] text-[#3b4045]"
                  }`}
                >
                  <span className="flex items-center gap-1">
                    {btn.label}
                    {btn.badge && (
                      <span className="bg-[#0074cc] text-white px-1.5 rounded text-[11px] font-bold">{btn.badge}</span>
                    )}
                  </span>
                </button>
              ))}
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
          {filteredQuestions.length === 0 ? (
            <div className="p-8 text-center text-[#6a737c]">
              {filter === "mine" && (
                <>
                  <p className="text-[15px]">You haven&apos;t asked any questions yet.</p>
                  <button
                    onClick={() => router.push("/ask")}
                    className="mt-3 bg-[#0a95ff] hover:bg-[#0074cc] text-white text-[13px] px-4 py-2 rounded transition-colors"
                  >
                    Ask your first question
                  </button>
                </>
              )}
              {filter === "unanswered" && (
                <p className="text-[15px]">🎉 All questions have been answered!</p>
              )}
              {filter === "bountied" && (
                <div>
                  <p className="text-[15px] mb-2">No bountied questions at the moment.</p>
                  <p className="text-[13px] text-[#9199a1]">Bounties are special rewards offered to attract answers to questions.</p>
                </div>
              )}
              {filter === "all" && (
                <p className="text-[15px]">No questions yet. Be the first to ask!</p>
              )}
              {filter === "active" && (
                <p className="text-[15px]">No active questions found.</p>
              )}
            </div>
          ) : (
            filteredQuestions.map((q) => (
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
            ))
          )}
        </div>

      </div>
    </Mainlayout>
  );
}
