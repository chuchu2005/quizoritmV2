import Link from "next/link";
import React from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

const NewNavbar = () => {
  const { userId } = auth();
  return (
      <div className='flex items-center justify-between h-full gap-2 px-8 m-auto max-w-7xl mb-10'>
        <div className="flex items-center gap-2 ">
          <Link href={"/"} className="justify-start">
            <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white">
              Learnrithm
            </p>
          </Link>
          <ThemeToggle className="justify-start"/>
        </div>
        <div>
          {userId ? (
            <div className='flex items-center'>
              <UserButton afterSignOutUrl='/' />
            </div>
          ) :
           (
            <div className='flex justify-end'>
              <Link href='/sign-up' className="font-bold">Sign up</Link>
            </div>
          )}
        </div>
      </div>
  );
};

export default NewNavbar;
