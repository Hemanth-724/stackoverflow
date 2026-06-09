import React, { useState, useEffect } from 'react';
import Mainlayout from '@/Layout/Mainlayout';
import { getAllQuestions } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface TagInfo {
  name: string;
  count: number;
}

export default function TagsPage() {
  const router = useRouter();
  const [tags, setTags] = useState<TagInfo[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const { data } = await getAllQuestions();
        // Extract all tags and count occurrences
        const tagMap: Record<string, number> = {};
        data.forEach((q: any) => {
          q.questionTags?.forEach((tag: string) => {
            const normalizedTag = tag.toLowerCase().trim();
            if (normalizedTag) {
              tagMap[normalizedTag] = (tagMap[normalizedTag] || 0) + 1;
            }
          });
        });

        // Convert to array and sort by count (descending)
        const tagArray = Object.entries(tagMap)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count);

        setTags(tagArray);
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTags();
  }, []);

  const filteredTags = tags.filter(t =>
    t.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const tagDescriptions: Record<string, string> = {
    javascript: "For questions about programming in ECMAScript (JavaScript/JS) and its different dialects/implementations.",
    react: "React is a JavaScript library for building user interfaces.",
    "node.js": "Node.js is an event-based, non-blocking, asynchronous I/O runtime.",
    python: "Python is a dynamically-typed, multi-paradigm programming language.",
    java: "Java is a high-level OO programming language.",
    css: "CSS is a representation style sheet language for describing the look of documents.",
    html: "HTML is the markup language for creating web pages and other information to be displayed in a web browser.",
    typescript: "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.",
    sql: "SQL is a language for querying databases.",
    "c++": "C++ is a general-purpose programming language.",
    mongodb: "MongoDB is a scalable, high-performance, NoSQL database.",
    "next.js": "Next.js is a React framework for server-side rendering and static site generation.",
    hooks: "Hooks are functions that let you use React state and lifecycle features from function components.",
    "spring-boot": "Spring Boot makes it easy to create stand-alone Spring-based applications.",
    "rest-api": "REST API is an architectural style for building web services.",
    axios: "Axios is a promise-based HTTP client for the browser and Node.js.",
    cors: "CORS is a mechanism that allows restricted resources on a web page to be accessed from another domain.",
    reactjs: "React is a JavaScript library for building user interfaces.",
    assembly: "Assembly language is a low-level programming language for a computer.",
    web3: "Web3 refers to decentralized web technologies built on blockchain.",
  };

  const getTagDescription = (tagName: string) => {
    return tagDescriptions[tagName] || `Questions tagged with [${tagName}]`;
  };

  return (
    <Mainlayout>
      <div className="py-8 w-full">
        <h1 className="text-2xl font-bold mb-2 text-[#242729]">Tags</h1>
        <p className="text-[#6a737c] text-[15px] mb-6 max-w-2xl leading-relaxed">
          A tag is a keyword or label that categorizes your question with other, similar questions.
          Using the right tags makes it easier for others to find and answer your question.
        </p>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center">
          <div className="relative w-full max-w-xs">
            <svg aria-hidden="true" className="absolute left-2.5 top-[9px] text-[#838c95] w-[18px] h-[18px]" viewBox="0 0 18 18">
              <path d="m18 16.5-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5ZM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0Z" fill="currentColor"/>
            </svg>
            <input
              type="text"
              placeholder="Filter by tag name"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="border border-[#babfc4] bg-white outline-none pl-8 py-[7px] px-2 rounded-[3px] text-[13px] w-full text-[#3b4045] focus:border-[#6bbbf7] focus:shadow-[0_0_0_4px_rgba(0,116,204,0.15)] placeholder:text-[#838c95]"
            />
          </div>
          <div className="text-[13px] text-[#6a737c]">
            {filteredTags.length} tag{filteredTags.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Tags Grid */}
        {loading ? (
          <div className="text-center text-[#6a737c] py-8">Loading tags...</div>
        ) : filteredTags.length === 0 ? (
          <div className="text-center text-[#6a737c] py-8">
            {searchText ? `No tags found matching "${searchText}"` : "No tags found. Ask a question with tags to see them here!"}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredTags.map((tag) => (
              <div
                key={tag.name}
                className="border border-[#d6d9dc] rounded p-3 bg-white hover:shadow-sm transition-shadow"
              >
                <div className="mb-2">
                  <span
                    onClick={() => router.push(`/?search=${encodeURIComponent(tag.name)}`)}
                    className="inline-block bg-[#e1ecf4] text-[#39739d] hover:bg-[#d0e3f1] hover:text-[#2c5877] px-[6px] py-[4px] text-[12px] rounded cursor-pointer transition-colors"
                  >
                    {tag.name}
                  </span>
                </div>
                <p className="text-[12px] text-[#6a737c] leading-[1.4] mb-3 line-clamp-3">
                  {getTagDescription(tag.name)}
                </p>
                <div className="text-[12px] text-[#838c95]">
                  {tag.count} question{tag.count !== 1 ? "s" : ""}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Mainlayout>
  );
}
