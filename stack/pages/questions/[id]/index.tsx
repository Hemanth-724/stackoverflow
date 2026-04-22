import Mainlayout from "@/Layout/Mainlayout";
import { useRouter } from "next/router";
import React from "react";
import QuestionDetail from "@/components/ui/QuestionDetail";

const index = () => {
  const router = useRouter();
  const { id } = router.query;
  
  return (
    <Mainlayout>
      <div className="w-full flex-1 mb-8" style={{ maxWidth: "1100px" }}>
        <QuestionDetail questionId={Array.isArray(id) ? id[0] : id} />
      </div>
    </Mainlayout>
  );
};

export default index;
