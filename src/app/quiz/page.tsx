import React from "react";

import { redirect } from "next/navigation";
import QuizCreation from "@/components/QuizCreation";
import { auth } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";

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
  const { user } = useUser();
  const { userId } = auth();
  if (user && userId) {
    fetch(`/api/getDetails?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        sessionStorage.setItem("plan", data.PaymentData.plan);
      })
      .catch((error) => {
        console.error("Error fetching payment data:", error);
      });
  } else {
    redirect("/");
  }
  return <QuizCreation topic={searchParams.topic ?? ""} />;
};

export default Quiz;