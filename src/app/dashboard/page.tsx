import ProfileButton from "@/components/dashboard/ProfileButton";
import WellcomePhrase from "@/components/dashboard/WellcomePhrase";
import HistoryCard from "@/components/dashboard/HistoryCard";
import HotTopicsCard from "@/components/dashboard/HotTopicsCard";
import QuizMeCard from "@/components/dashboard/QuizMeCard";
import RecentActivityCard from "@/components/dashboard/RecentActivityCard";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

export const metadata = {
  title: "Dashboard | Learnrithm",
  description: "Quiz yourself on anything!",
};

const Dasboard = async (props: Props) => {
  const {userId} = auth();
  if (!userId) {
    redirect("/");
  }

  return (
    <main className="p-8 -mt-16 mx-auto max-w-7xl">
        <div className="-ml-10 text-3xl font-bold">
            <WellcomePhrase />
        </div>
      <div><QuizMeCard /></div>
      <p className="font-bold my-6 text-xl">User informations</p>
      <div className="grid gap-4 mt-4 md:grid-cols-2">
        <ProfileButton />
        <HistoryCard />
      </div>
      <p className="font-bold my-6 text-xl">My Activities</p>
      <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7">
        <HotTopicsCard />
        <RecentActivityCard />
      </div>
    </main>
  );
};

export default Dasboard;
