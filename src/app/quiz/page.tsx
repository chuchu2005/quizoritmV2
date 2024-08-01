import React from "react";

import { redirect } from "next/navigation";
import QuizCreation from "@/components/QuizCreation";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";

export const metadata = {
  title: "Quiz | Learnrithm",
  description: "Quiz yourself on anything!",
};

interface Props {
  searchParams: {
    topic?: string;
  };
}

const Quiz = async ({ searchParams }: Props) => {
  const { userId } = auth();
  if(!userId){
    redirect("/")
  }
  return <QuizCreation topic={searchParams.topic ?? ""} user={userId} />;
};

export default Quiz;