import React from 'react';
import Mainlayout from '@/Layout/Mainlayout';

const articles = [
  {
    title: "Understanding React Server Components",
    excerpt: "A deep dive into React Server Components, how they work, and when to use them in your Next.js applications.",
    author: "Sarah Chen",
    date: "Jun 8, 2026",
    readTime: "8 min read",
    tags: ["react", "next.js", "performance"],
  },
  {
    title: "The Complete Guide to CSS Grid",
    excerpt: "Master CSS Grid layout with practical examples, common patterns, and responsive design techniques.",
    author: "Marcus Johnson",
    date: "Jun 5, 2026",
    readTime: "12 min read",
    tags: ["css", "layout", "responsive"],
  },
  {
    title: "Building Scalable APIs with Node.js",
    excerpt: "Best practices for designing and implementing RESTful APIs that can scale with your application's growth.",
    author: "Alex Rivera",
    date: "Jun 3, 2026",
    readTime: "10 min read",
    tags: ["node.js", "api", "architecture"],
  },
  {
    title: "TypeScript Design Patterns",
    excerpt: "Explore common design patterns implemented in TypeScript with real-world use cases and code examples.",
    author: "Emily Park",
    date: "May 30, 2026",
    readTime: "15 min read",
    tags: ["typescript", "design-patterns"],
  },
  {
    title: "Database Optimization Techniques",
    excerpt: "Learn how to optimize your database queries, indexes, and schema design for better application performance.",
    author: "David Kim",
    date: "May 28, 2026",
    readTime: "11 min read",
    tags: ["database", "sql", "performance"],
  },
  {
    title: "Getting Started with Docker",
    excerpt: "A beginner-friendly introduction to Docker containerization, Dockerfiles, and Docker Compose for developers.",
    author: "Lisa Wang",
    date: "May 25, 2026",
    readTime: "9 min read",
    tags: ["docker", "devops", "containers"],
  },
];

export default function ArticlesPage() {
  return (
    <Mainlayout>
      <div className="py-8 w-full">
        <h1 className="text-[27px] text-[#242729] mb-2">Articles</h1>
        <p className="text-[15px] text-[#6a737c] mb-8 max-w-2xl">
          In-depth technical articles, tutorials, and guides written by the developer community.
        </p>

        {/* Articles List */}
        <div className="space-y-0 border-t border-[#e3e6e8]">
          {articles.map((article, idx) => (
            <div
              key={idx}
              className="border-b border-[#e3e6e8] py-5 cursor-pointer group"
            >
              <h2 className="text-[17px] text-[#0074cc] group-hover:text-[#0a95ff] mb-1 cursor-pointer group-hover:underline">
                {article.title}
              </h2>
              <p className="text-[13px] text-[#3b4045] mb-3 leading-relaxed line-clamp-2">
                {article.excerpt}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex gap-1.5 flex-wrap">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#e1ecf4] text-[#39739d] px-[6px] py-[3px] text-[11px] rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-[12px] text-[#6a737c] flex items-center gap-3">
                  <span className="font-medium text-[#3b4045]">{article.author}</span>
                  <span>{article.date}</span>
                  <span>·</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center text-[13px] text-[#6a737c]">
          <p>Article publishing feature coming soon. Stay tuned!</p>
        </div>
      </div>
    </Mainlayout>
  );
}
