import PricingCard from "@/components/pricing/pricingCard";
import { FC } from "react";

const Page: FC = () => {
  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Designed for business teams like yours
          </h2>
          <p className="mb-5 font-light text-gray-800 sm:text-xl dark:text-gray-100">
            Here at Flowbite we focus on markets where technology, innovation,
            and capital can unlock long-term value and drive economic growth.
          </p>
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0 ">
          <PricingCard
            title="Hobby"
            price="$1"
            period="/month"
            description="Meant for students who just want to quiz themselves"
            features={[
              "Unlimited quiz generations ",
              "No setup, or hidden fees",
              "unlimited number of questions",
            ]}
          />
          <PricingCard
            title="Monthly"
            price="$1"
            period="/month"
            description="Meant for students who just want to quiz themselves"
            features={[
              "Unlimited quiz generations ",
              "No setup, or hidden fees",
              "unlimited number of questions",
            ]}
          />
          <PricingCard
            title="Yearly"
            price="$1"
            period="/month"
            description="Meant for students who just want to quiz themselves"
            features={[
              "Unlimited quiz generations ",
              "No setup, or hidden fees",
              "unlimited number of questions",
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default Page;
