"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

type PricingCardProps = {
  title: string;
  price: string;
  period: string;
  description?: { oldPrice: number; newPrice: number };
  features: string[];
  paid: boolean;
  user?: string | null;
};

export default function PricingCard({
  title,
  price,
  period,
  description,
  features,
  paid,
  user
}: PricingCardProps) {

  return (
    <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
      <h3 className="mb-4 text-2xl font-semibold">{title}</h3>
      {description && (
        <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
          <div>
            <span className="line-through text-red-500">
              {description.oldPrice} $
            </span>{" "}
            <span className="font-bold text-emerald-500">
              now {description.newPrice} $
            </span>
          </div>
        </p>
      )}
      <div className="flex justify-center items-baseline my-8">
        <span className="mr-2 text-5xl font-extrabold">{price}</span>
        <span className="text-gray-500 dark:text-gray-400">{period}</span>
      </div>
      <ul role="list" className="mb-8 space-y-4 text-left">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-3">
            <svg
              className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      {paid === false ? (
        <Link href="/payment">
          {title !== "Hobby" && (
            <Button
              onClick={() => {
                sessionStorage.setItem("plan", title);
              }}
              className="hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900"
            >
              Get started
            </Button>
          )}
        </Link>
      ) : paid === true ? (
        <Link href="/profile">
          {title !== "Hobby" && (
            <Button
              className="hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900"
            >
              Modify
            </Button>
          )}
        </Link>
      ) : !user && (
        <Link href="/sign-up">
          <Button
            className="hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900"
          >
            Get started
          </Button>
      </Link>
      )} 
    </div>
  );
}
