import React from 'react';
import Mainlayout from '@/Layout/Mainlayout';
import Link from 'next/link';

const challenges = [
  {
    title: "Two Sum",
    difficulty: "Easy",
    difficultyColor: "#2f6f44",
    difficultyBg: "#e6f4ea",
    description: "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
    tags: ["arrays", "hash-table"],
    participants: 1247,
  },
  {
    title: "Valid Parentheses",
    difficulty: "Easy",
    difficultyColor: "#2f6f44",
    difficultyBg: "#e6f4ea",
    description: "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    tags: ["stack", "string"],
    participants: 982,
  },
  {
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    difficultyColor: "#2f6f44",
    difficultyBg: "#e6f4ea",
    description: "Merge two sorted linked lists and return it as a sorted list.",
    tags: ["linked-list", "recursion"],
    participants: 856,
  },
  {
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    difficultyColor: "#9d6a00",
    difficultyBg: "#fdf7e2",
    description: "Given a string, find the length of the longest substring without repeating characters.",
    tags: ["sliding-window", "hash-table", "string"],
    participants: 734,
  },
  {
    title: "Container With Most Water",
    difficulty: "Medium",
    difficultyColor: "#9d6a00",
    difficultyBg: "#fdf7e2",
    description: "Given n non-negative integers, find two lines that together with the x-axis form a container that holds the most water.",
    tags: ["two-pointers", "greedy"],
    participants: 612,
  },
  {
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    difficultyColor: "#9d6a00",
    difficultyBg: "#fdf7e2",
    description: "Given the root of a binary tree, return the level order traversal of its nodes' values.",
    tags: ["tree", "bfs"],
    participants: 543,
  },
];

export default function ChallengesPage() {
  return (
    <Mainlayout>
      <div className="py-8 w-full">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-[27px] text-[#242729]">Challenges</h1>
          <span className="bg-[#fdf2ea] border border-[#f48024] text-[#d1383d] px-2 py-0.5 rounded text-[11px] uppercase font-semibold">
            NEW
          </span>
        </div>
        <p className="text-[15px] text-[#6a737c] mb-8 max-w-2xl">
          Sharpen your coding skills with community challenges. Solve problems, learn new techniques, and compete with other developers.
        </p>

        {/* Challenge Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {challenges.map((challenge, idx) => (
            <div
              key={idx}
              className="border border-[#d6d9dc] rounded p-5 bg-white hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-[17px] text-[#0074cc] group-hover:text-[#0a95ff] font-medium">
                  {challenge.title}
                </h2>
                <span
                  className="text-[11px] px-2 py-0.5 rounded font-semibold shrink-0 ml-3"
                  style={{ color: challenge.difficultyColor, backgroundColor: challenge.difficultyBg }}
                >
                  {challenge.difficulty}
                </span>
              </div>
              <p className="text-[13px] text-[#3b4045] mb-3 line-clamp-2 leading-relaxed">
                {challenge.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5 flex-wrap">
                  {challenge.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#e1ecf4] text-[#39739d] px-[6px] py-[3px] text-[11px] rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-[12px] text-[#838c95]">
                  {challenge.participants.toLocaleString()} attempted
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-[13px] text-[#6a737c]">More challenges coming soon!</p>
        </div>
      </div>
    </Mainlayout>
  );
}
