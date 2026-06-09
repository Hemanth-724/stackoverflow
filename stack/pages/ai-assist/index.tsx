import React, { useState } from 'react';
import Mainlayout from '@/Layout/Mainlayout';
import { useAuth } from '@/context/authcontext';
import Link from 'next/link';

const suggestedQuestions = [
  "How to use useEffect in React?",
  "What is the difference between let and const?",
  "How to connect to MongoDB from Node.js?",
  "Explain async/await in JavaScript",
  "How to deploy a Next.js app to Vercel?",
];

export default function AIAssistPage() {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setResponse('');

    // Simulated AI response
    setTimeout(() => {
      setResponse(
        `Thanks for your question about "${query}"!\n\n` +
        `AI Assist is currently in labs/preview mode. In the full version, this feature would:\n\n` +
        `• Analyze your question using AI\n` +
        `• Search through existing Stack Overflow answers\n` +
        `• Generate a comprehensive response with code examples\n` +
        `• Provide links to related questions and documentation\n\n` +
        `For now, try searching for your question in the main Q&A section for community-powered answers!`
      );
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Mainlayout>
      <div className="py-8 w-full max-w-3xl">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-[27px] text-[#242729]">AI Assist</h1>
          <span className="bg-[#f8f9f9] border border-[#d6d9dc] text-[#6a737c] px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold">
            LABS
          </span>
        </div>
        <p className="text-[15px] text-[#6a737c] mb-8">
          Get AI-powered answers to your programming questions. Powered by community knowledge.
        </p>

        {!user ? (
          <div className="border border-[#d6d9dc] rounded p-8 text-center bg-[#f8f9f9]">
            <svg className="w-12 h-12 text-[#c8ccd0] mx-auto mb-4" fill="currentColor" viewBox="0 0 18 18">
              <path d="M9 1a8 8 0 1 0 0 16A8 8 0 0 0 9 1ZM5 8a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0ZM5.32 12.68a.5.5 0 0 1 .04-.73A4.97 4.97 0 0 1 9 11c1.35 0 2.6.37 3.64.95a.5.5 0 1 1-.5.87A4 4 0 0 0 9 12a4 4 0 0 0-3.14.82.5.5 0 0 1-.54.86Z"/>
            </svg>
            <h2 className="text-[17px] text-[#242729] mb-2">Log in to use AI Assist</h2>
            <p className="text-[13px] text-[#6a737c] mb-4">
              AI Assist is available for logged-in users.
            </p>
            <Link
              href="/auth"
              className="inline-block bg-[#0a95ff] hover:bg-[#0074cc] text-white text-[13px] px-4 py-2 rounded transition-colors"
            >
              Log in
            </Link>
          </div>
        ) : (
          <>
            {/* Input Area */}
            <div className="border border-[#d6d9dc] rounded-lg bg-white shadow-sm overflow-hidden mb-6">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleAsk();
                  }
                }}
                placeholder="Ask a programming question..."
                className="w-full p-4 text-[15px] text-[#242729] min-h-[100px] outline-none resize-y border-none"
              />
              <div className="flex items-center justify-between px-4 py-3 bg-[#f8f9f9] border-t border-[#e3e6e8]">
                <span className="text-[12px] text-[#838c95]">Press Enter to submit, Shift+Enter for new line</span>
                <button
                  onClick={handleAsk}
                  disabled={!query.trim() || isLoading}
                  className="bg-[#0a95ff] hover:bg-[#0074cc] text-white text-[13px] px-4 py-2 rounded transition-colors disabled:opacity-50 font-medium"
                >
                  {isLoading ? "Thinking..." : "Ask AI"}
                </button>
              </div>
            </div>

            {/* Suggested Questions */}
            {!response && !isLoading && (
              <div className="mb-6">
                <h3 className="text-[13px] text-[#6a737c] mb-3 font-semibold uppercase tracking-wide">Try asking:</h3>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setQuery(q); }}
                      className="bg-[#e1ecf4] text-[#39739d] hover:bg-[#d0e3f1] text-[13px] px-3 py-1.5 rounded transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Loading */}
            {isLoading && (
              <div className="border border-[#d6d9dc] rounded p-6 bg-white text-center">
                <div className="flex items-center justify-center gap-2 text-[#6a737c]">
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span className="text-[15px]">AI is analyzing your question...</span>
                </div>
              </div>
            )}

            {/* Response */}
            {response && !isLoading && (
              <div className="border border-[#d6d9dc] rounded bg-white shadow-sm">
                <div className="px-5 py-3 border-b border-[#e3e6e8] bg-[#f8f9f9] flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#f48024]" fill="currentColor" viewBox="0 0 18 18">
                    <path d="M9 1a8 8 0 1 0 0 16A8 8 0 0 0 9 1Zm.81 12.13-1.77-.01L8 9.42l1.81-.01.04 3.72Zm-.02-4.88H8.01V5.88h1.78v2.37Z"/>
                  </svg>
                  <span className="text-[13px] font-semibold text-[#3b4045]">AI Assist Response</span>
                  <span className="text-[11px] text-[#838c95] ml-auto">Preview</span>
                </div>
                <div className="p-5 text-[15px] text-[#242729] leading-[1.6] whitespace-pre-wrap">
                  {response}
                </div>
              </div>
            )}
          </>
        )}

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-[#fdf7e2] border border-[#f1e5bc] rounded text-[12px] text-[#6a737c]">
          <strong className="text-[#3b4045]">⚠️ Labs Feature:</strong> AI Assist is experimental. Responses are simulated in this preview. Always verify answers against the community Q&A for production use.
        </div>
      </div>
    </Mainlayout>
  );
}
