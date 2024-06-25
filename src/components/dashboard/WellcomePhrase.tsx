"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import DetailsDialog from "../DetailsDialog";


const WellcomePhrase = () => {
  const {user} = useUser();
  if(!user) {
    redirect("/");
  }
  return (
    <div className="m-10">
        <div className="flex items-center gap-2">
          <p className="text-2xl font-bold">Welcome</p>
          <div className="text-xs"><DetailsDialog /></div>
        </div>
        <p className="mt-3 text-4xl font-bold">
          {user.lastName}, {user.firstName}!
        </p>
    </div>
  );
};

export default WellcomePhrase;