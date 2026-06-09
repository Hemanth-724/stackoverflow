import React, { useState } from 'react';
import Mainlayout from '@/Layout/Mainlayout';

const companies = [
  {
    name: "Google",
    industry: "Technology",
    description: "Specializing in Internet-related services and products, including online advertising, a search engine, cloud computing, and software.",
    location: "Mountain View, CA",
    techStack: ["python", "go", "java", "kubernetes", "tensorflow"],
    openPositions: 342,
  },
  {
    name: "Microsoft",
    industry: "Technology",
    description: "Develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    location: "Redmond, WA",
    techStack: ["c#", "typescript", "azure", "react", ".net"],
    openPositions: 289,
  },
  {
    name: "Meta",
    industry: "Social Media",
    description: "Building technologies that help people connect, find communities, and grow businesses.",
    location: "Menlo Park, CA",
    techStack: ["react", "python", "php", "graphql", "pytorch"],
    openPositions: 156,
  },
  {
    name: "Amazon",
    industry: "Technology / E-commerce",
    description: "Technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    location: "Seattle, WA",
    techStack: ["java", "python", "aws", "react", "dynamodb"],
    openPositions: 478,
  },
  {
    name: "Netflix",
    industry: "Entertainment",
    description: "Streaming service offering a wide variety of award-winning TV shows, movies, anime, documentaries, and more.",
    location: "Los Gatos, CA",
    techStack: ["java", "python", "node.js", "react", "cassandra"],
    openPositions: 87,
  },
  {
    name: "Stripe",
    industry: "Fintech",
    description: "Financial infrastructure platform for the internet. Businesses use Stripe to accept payments, grow revenue, and accelerate new business opportunities.",
    location: "San Francisco, CA",
    techStack: ["ruby", "scala", "react", "typescript", "go"],
    openPositions: 64,
  },
  {
    name: "Spotify",
    industry: "Entertainment",
    description: "Digital music, podcast, and video service that gives you access to millions of songs and other content from creators.",
    location: "Stockholm, Sweden",
    techStack: ["java", "python", "react", "gcp", "kafka"],
    openPositions: 45,
  },
  {
    name: "Shopify",
    industry: "E-commerce",
    description: "Commerce platform that allows anyone to set up an online store and sell their products.",
    location: "Ottawa, Canada",
    techStack: ["ruby", "react", "graphql", "typescript", "mysql"],
    openPositions: 73,
  },
];

export default function CompaniesPage() {
  const [searchText, setSearchText] = useState('');

  const filteredCompanies = companies.filter(c =>
    c.name.toLowerCase().includes(searchText.toLowerCase()) ||
    c.industry.toLowerCase().includes(searchText.toLowerCase()) ||
    c.techStack.some(t => t.toLowerCase().includes(searchText.toLowerCase()))
  );

  return (
    <Mainlayout>
      <div className="py-8 w-full">
        <h1 className="text-[27px] text-[#242729] mb-2">Companies</h1>
        <p className="text-[15px] text-[#6a737c] mb-6 max-w-2xl">
          Learn about top tech companies, their tech stacks, and open positions. Find your next opportunity.
        </p>

        {/* Search */}
        <div className="mb-6 max-w-sm">
          <div className="relative">
            <svg aria-hidden="true" className="absolute left-2.5 top-[9px] text-[#838c95] w-[18px] h-[18px]" viewBox="0 0 18 18">
              <path d="m18 16.5-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5ZM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0Z" fill="currentColor"/>
            </svg>
            <input
              type="text"
              placeholder="Search by company, industry, or tech..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="border border-[#babfc4] bg-white outline-none pl-8 py-[7px] px-2 rounded-[3px] text-[13px] w-full text-[#3b4045] focus:border-[#6bbbf7] focus:shadow-[0_0_0_4px_rgba(0,116,204,0.15)] placeholder:text-[#838c95]"
            />
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCompanies.map((company, idx) => (
            <div
              key={idx}
              className="border border-[#d6d9dc] rounded p-5 bg-white hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h2 className="text-[17px] text-[#242729] font-semibold">{company.name}</h2>
                  <span className="text-[12px] text-[#6a737c]">{company.industry} · {company.location}</span>
                </div>
                <span className="bg-[#e6f4ea] text-[#2f6f44] text-[12px] px-2 py-0.5 rounded font-medium shrink-0">
                  {company.openPositions} open
                </span>
              </div>
              <p className="text-[13px] text-[#3b4045] mb-3 line-clamp-2 leading-relaxed">
                {company.description}
              </p>
              <div className="flex gap-1.5 flex-wrap">
                {company.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="bg-[#e1ecf4] text-[#39739d] px-[6px] py-[3px] text-[11px] rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-8 text-[#6a737c]">
            No companies found matching &quot;{searchText}&quot;
          </div>
        )}
      </div>
    </Mainlayout>
  );
}
