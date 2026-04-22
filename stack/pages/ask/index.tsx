import Mainlayout from '@/Layout/Mainlayout';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { postQuestion } from '@/lib/api';
import { useAuth } from '@/context/authcontext';
import { toast } from 'react-toastify';

const AskQuestion = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
        toast.error("Please login to ask a question.");
        router.push('/auth');
        return;
    }
    
    setIsSubmitting(true);
    try {
        const questionData = {
            questionTitle: title,
            questionBody: body,
            questionTags: tags.split(" "),
            userPosted: user.name,
            userId: user._id
        };
        await postQuestion(questionData);
        toast.success("Question posted successfully!");
        router.push('/');
    } catch (error: any) {
        toast.error(error.response?.data || "Extremely sorry! Could not post your question.");
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <Mainlayout>
      <div className="w-full flex-1 mb-10 px-4 sm:px-0" style={{ maxWidth: "800px" }}>
        
        <div className="flex items-center justify-between pt-6 pb-8">
          <h1 className="text-[27px] font-semibold text-[#242729]">Ask a public question</h1>
        </div>

        <div className="bg-[#ebf4fb] border border-[#a6ceed] rounded-[3px] p-[16px] mb-6">
          <h2 className="text-[19px] text-[#3b4045] font-normal mb-2">Writing a good question</h2>
          <p className="text-[15px] text-[#3b4045] mb-3">
            You’re ready to ask a programming-related question and this form will help guide you through the process.
            Looking to ask a non-programming question? See the topics here to find a relevant site.
          </p>
          <h5 className="font-semibold text-[#3b4045] mb-2 text-[13px]">Steps</h5>
          <ul className="text-[13px] text-[#3b4045] list-disc list-inside space-y-1">
            <li>Summarize your problem in a one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>Add “tags” which help surface your question to members of the community.</li>
            <li>Review your question and post it to the site.</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <div className="bg-white border border-[#e3e6e8] rounded-[3px] p-6 shadow-sm">
            <h3 className="text-[15px] font-semibold text-[#0c0d0e] mb-1">Title</h3>
            <p className="text-[12px] text-[#6a737c] mb-2">
              Be specific and imagine you’re asking a question to another person.
            </p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
              className="w-full border border-[#babfc4] rounded-[3px] p-2 text-[13px] text-[#0c0d0e] focus:outline-none focus:border-[#6bbbf7] focus:ring-4 focus:ring-[#d0e3f1] transition-all"
              required
            />
          </div>

          <div className="bg-white border border-[#e3e6e8] rounded-[3px] p-6 shadow-sm">
            <h3 className="text-[15px] font-semibold text-[#0c0d0e] mb-1">What are the details of your problem?</h3>
            <p className="text-[12px] text-[#6a737c] mb-2">
              Introduce the problem and expand on what you put in the title. Minimum 20 characters.
            </p>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full border border-[#babfc4] rounded-[3px] p-2 text-[13px] text-[#0c0d0e] focus:outline-none focus:border-[#6bbbf7] focus:ring-4 focus:ring-[#d0e3f1] transition-all min-h-[250px] font-mono resize-y"
              required
              minLength={20}
            />
          </div>

          <div className="bg-white border border-[#e3e6e8] rounded-[3px] p-6 shadow-sm">
            <h3 className="text-[15px] font-semibold text-[#0c0d0e] mb-1">Tags</h3>
            <p className="text-[12px] text-[#6a737c] mb-2">
              Add up to 5 tags to describe what your question is about. Start typing to see suggestions.
            </p>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. (ruby-on-rails sql xml)"
              className="w-full border border-[#babfc4] rounded-[3px] p-2 text-[13px] text-[#0c0d0e] focus:outline-none focus:border-[#6bbbf7] focus:ring-4 focus:ring-[#d0e3f1] transition-all"
            />
          </div>

          <div className="mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#0a95ff] hover:bg-[#0074cc] text-white text-[13px] px-3 py-2.5 rounded-[3px] font-semibold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)] transition-colors"
            >
              {isSubmitting ? "Posting..." : "Post your question"}
            </button>
          </div>
          
        </form>
      </div>
    </Mainlayout>
  );
};

export default AskQuestion;