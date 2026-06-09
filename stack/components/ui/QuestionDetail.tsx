"use client";

import React, { useState, useEffect } from "react";
import { getQuestionById, postAnswer, voteQuestion, deleteQuestion, deleteAnswer } from "@/lib/api";
import { useAuth } from "@/context/authcontext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import moment from "moment";

export const QuestionDetail = ({ questionId }: { questionId: string | undefined }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [question, setQuestion] = useState<any>(null);
  const [newAnswer, setNewAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (questionId) {
      const fetchQuestion = async () => {
        try {
          const { data } = await getQuestionById(questionId);
          setQuestion(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchQuestion();
    }
  }, [questionId]);

  const handleVote = async (value: number) => {
    if (!user) {
      toast.error("Please login to vote");
      return;
    }
    try {
      const voteType = value === 1 ? "upVote" : "downVote";
      await voteQuestion(questionId, voteType, user._id);
      const { data } = await getQuestionById(questionId);
      setQuestion(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookmark = () => {
    toast.info("Bookmark feature coming soon!");
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Link copied to clipboard!");
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      toast.success("Link copied to clipboard!");
    });
  };

  const handleEdit = () => {
    if (!user) {
      toast.error("Please login to edit");
      return;
    }
    if (question.userId !== user._id) {
      toast.error("Only the author can edit this question");
      return;
    }
    toast.info("Edit feature coming soon!");
  };

  const handleFollow = () => {
    if (!user) {
      toast.error("Please login to follow questions");
      return;
    }
    setIsFollowing(!isFollowing);
    if (!isFollowing) {
      toast.success("You are now following this question");
    } else {
      toast.info("You unfollowed this question");
    }
  };

  const handleFlag = () => {
    if (!user) {
      toast.error("Please login to flag questions");
      return;
    }
    toast.info("Question flagged for moderator review");
  };

  const handleDeleteQuestion = async () => {
    if (!user) {
      toast.error("Please login to delete");
      return;
    }
    if (question.userId !== user._id) {
      toast.error("Only the author can delete this question");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this question? This action cannot be undone."
    );
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      await deleteQuestion(questionId);
      toast.success("Question deleted successfully");
      router.push("/questions");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete question");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteAnswer = async (answerId: string) => {
    if (!user) {
      toast.error("Please login to delete");
      return;
    }

    const confirmed = window.confirm("Are you sure you want to delete this answer?");
    if (!confirmed) return;

    try {
      await deleteAnswer(questionId, answerId, question.answer.length - 1);
      const { data } = await getQuestionById(questionId);
      setQuestion(data);
      toast.success("Answer deleted successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete answer");
    }
  };

  const handleSubmitAnswer = async () => {
    if (!user) {
      toast.error("Please login to answer");
      return;
    }
    if (!newAnswer.trim()) return;
    setIsSubmitting(true);
    try {
      await postAnswer(questionId, question.answer.length + 1, newAnswer, user.name, user._id);
      setNewAnswer("");
      const { data } = await getQuestionById(questionId);
      setQuestion(data);
      toast.success("Answer posted!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to post answer");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isOwner = user && question && question.userId === user._id;

  if (loading) return <div className="p-8 text-center text-[#6a737c]">Loading...</div>;
  if (!question) return <div className="p-8 text-center text-[#6a737c]">Question not found.</div>;

  return (
    <div className="w-full">
      {/* Question Header */}
      <div className="flex flex-col border-b border-[#e3e6e8] pb-[16px] mb-[16px]">
        <div className="flex justify-between items-start gap-4">
          <h1 className="text-[27px] text-[#242729] mb-[8px] leading-[1.3] break-words flex-1">
            {question.questionTitle}
          </h1>
          <button
            onClick={() => router.push("/ask")}
            className="bg-[#0a95ff] hover:bg-[#0074cc] text-white text-[13px] px-[10.4px] py-[8px] rounded shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)] transition-colors whitespace-nowrap shrink-0"
          >
            Ask Question
          </button>
        </div>
        <div className="flex items-center text-[13px] text-[#6a737c] pb-[8px] gap-4 flex-wrap">
          <span className="flex items-center">
            <svg className="w-[14px] h-[14px] mr-[4px]" fill="currentColor" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1a6 6 0 100 12A6 6 0 007 1zm1 3v3.2L10.3 9l-.9 1-2.9-2.9V4h1.5z"></path>
            </svg>
            <span>Asked <strong className="text-[#242729] ml-1 font-semibold">{moment(question.askedOn).fromNow()}</strong></span>
          </span>
          {question.answer?.length > 0 && (
            <span className="flex items-center">
              <span>Modified <strong className="text-[#242729] ml-1 font-semibold">
                {moment(question.answer[question.answer.length - 1]?.answeredOn).fromNow()}
              </strong></span>
            </span>
          )}
        </div>
      </div>

      {/* Question Body Area */}
      <div className="flex flex-row gap-[16px]">
        {/* Left column (Votes) */}
        <div className="flex flex-col items-center w-[40px] shrink-0 fill-[#babfc4]">
          <button onClick={() => handleVote(1)} className="p-[2px] m-[2px] hover:bg-[#ffe3cf] rounded-full text-[#babfc4] hover:text-[#f48225] transition-colors cursor-pointer outline-none border-none">
            <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><path d="m2 25 16-16 16 16H2Z" fill="currentColor"/></svg>
          </button>
          
          <div className="text-[21px] font-semibold text-[#8ca0b1] my-[4px]">{question.upVote.length - question.downVote.length}</div>
          
          <button onClick={() => handleVote(-1)} className="p-[2px] m-[2px] hover:bg-[#ffe3cf] rounded-full text-[#babfc4] hover:text-[#f48225] transition-colors cursor-pointer outline-none border-none">
            <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><path d="M2 11h32L18 27 2 11Z" fill="currentColor"/></svg>
          </button>
          
          <button onClick={handleBookmark} className={`mt-[12px] text-[#babfc4] hover:text-[#f48225] transition-colors`}>
             <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="M3 17V3c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v14l-6-4-6 4Z" fill="currentColor"/></svg>
          </button>
          
          <button className="mt-[12px] text-[#babfc4] hover:text-[#f48225] transition-colors">
             <svg width="19" height="18" viewBox="0 0 19 18" xmlns="http://www.w3.org/2000/svg"><path d="M3 9a8 8 0 1 1 3.73 6.77L8.2 14.3A6 6 0 1 0 5 9l3.01-.01-4 4-4-4h3L3 9Z" fill="currentColor"/><path d="m15.4 12.8-3.4-3.5V5h-2v4.9l3.8 3.8 1.6-1.5Z" fill="currentColor"/></svg>
          </button>
        </div>

        {/* Right column (Content) */}
        <div className="flex-1 min-w-0 pr-4">
          <div className="text-[#242729] text-[15px] leading-[1.5] break-words whitespace-pre-wrap">
             {question.questionBody}
          </div>
          
          {/* Tags */}
          <div className="flex gap-[6px] mt-[24px] mb-[16px] flex-wrap">
            {question.questionTags.map((tag: string) => (
              <span key={tag} className="bg-[#e1ecf4] text-[#39739d] hover:bg-[#d0e3f1] hover:text-[#2c5877] px-[6px] py-[4px] text-[12px] rounded cursor-pointer transition-colors">
                {tag}
              </span>
            ))}
          </div>
          
          {/* Post Actions & Author */}
          <div className="flex justify-between items-start pt-[12px] flex-wrap gap-4 mt-8">
            <div className="flex gap-[16px] text-[13px] text-[#6a737c]">
               <button onClick={handleShare} className="hover:text-[#838c95] cursor-pointer">Share</button>
               <button onClick={handleEdit} className="hover:text-[#838c95] cursor-pointer">Edit</button>
               <button onClick={handleFollow} className={`cursor-pointer ${isFollowing ? "text-[#0074cc] font-medium" : "hover:text-[#838c95]"}`}>
                 {isFollowing ? "Following" : "Follow"}
               </button>
               <button onClick={handleFlag} className="hover:text-[#838c95] cursor-pointer">Flag</button>
               {isOwner && (
                 <button
                   onClick={handleDeleteQuestion}
                   disabled={isDeleting}
                   className="text-[#d1383d] hover:text-[#c02d2d] cursor-pointer font-medium"
                 >
                   {isDeleting ? "Deleting..." : "Delete"}
                 </button>
               )}
            </div>
            
            <div className="bg-[#d0e3f1] rounded-[3px] p-[5px_7px_7px_7px] w-[200px] text-[12px]">
               <div className="text-[#6a737c] mb-[4px]">{moment(question.askedOn).fromNow()}</div>
               <div className="flex items-center gap-[8px]">
                  <div className="w-[32px] h-[32px] rounded text-white flex items-center justify-center font-bold bg-[#63b47c]">
                     {question.userPosted.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-[#0074cc] hover:text-[#0a95ff] cursor-pointer">
                     {question.userPosted}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Answers Section */}
      {question.answer.length > 0 && (
        <div className="mt-[40px] pt-[20px]">
          <h2 className="text-[19px] mb-[16px] text-[#242729] font-bold">{question.answer.length} Answer{question.answer.length !== 1 ? "s" : ""}</h2>
          <div className="flex flex-col gap-[24px]">
            {question.answer.map((ans: any) => (
               <div key={ans._id} className="border border-[#e3e6e8] rounded-[5px] p-[24px] shadow-sm">
                  <div className="text-[#242729] text-[15px] leading-[1.6] break-words whitespace-pre-wrap">
                     {ans.answerBody}
                  </div>
                  
                  {/* Share/Flag & Author Action Strip */}
                  <div className="flex justify-between items-end mt-[24px]">
                     <div className="flex gap-[8px]">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            toast.success("Link copied!");
                          }}
                          className="bg-[#0c0d0e] hover:bg-[#242729] text-white px-[12px] py-[6px] rounded-[5px] text-[13px] font-medium transition-colors"
                        >
                          Share
                        </button>
                        <button
                          onClick={() => toast.info("Answer flagged for moderator review")}
                          className="bg-[#0c0d0e] hover:bg-[#242729] text-white px-[12px] py-[6px] rounded-[5px] text-[13px] font-medium transition-colors"
                        >
                          Flag
                        </button>
                        {user && ans.userId === user._id && (
                          <button
                            onClick={() => handleDeleteAnswer(ans._id)}
                            className="bg-[#d1383d] hover:bg-[#c02d2d] text-white px-[12px] py-[6px] rounded-[5px] text-[13px] font-medium transition-colors"
                          >
                            Delete
                          </button>
                        )}
                     </div>
                     
                     <div className="text-[12px] text-[#6a737c]">
                        <div className="mb-[4px] ml-[3px] text-right">{moment(ans.answeredOn).fromNow()}</div>
                        <div className="flex items-center justify-end gap-[8px]">
                           <div className="w-[32px] h-[32px] rounded text-[#0c0d0e] flex items-center justify-center font-bold" style={{backgroundColor: '#e1ecf4'}}>
                              {ans.userAnswered.charAt(0).toUpperCase()}
                           </div>
                           <div className="text-[#3b4045] font-medium">
                              {ans.userAnswered}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            ))}
          </div>
        </div>
      )}

      {/* Your Answer Form */}
      <div className="mt-[20px] pt-[20px] pb-[40px]">
         <h2 className="text-[19px] mb-[16px] text-[#242729] font-bold">Your answer</h2>
         <div className="border border-[#e3e6e8] rounded-[5px] p-[16px] shadow-sm bg-white mb-[16px]">
            <textarea 
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              className="w-full min-h-[150px] outline-none text-[15px] text-[#242729] resize-y"
              placeholder=""
            />
         </div>
         <button 
           onClick={handleSubmitAnswer}
           disabled={isSubmitting}
           className="bg-[#0c0d0e] hover:bg-[#242729] text-white px-[16px] py-[10px] rounded-[5px] text-[13px] font-bold transition-colors disabled:opacity-50 mt-[4px]"
         >
           Post your answer
         </button>
      </div>

    </div>
  );
};

export default QuestionDetail;
