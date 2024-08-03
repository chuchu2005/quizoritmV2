import PricingCard from "@/components/pricing/pricingCard";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { FC } from "react";

const Page: FC = () => {
  const { userId } = auth();
  let Paid = false;
  async function fetchIfPaid(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        userId: userId,
      },
    });
    if (user) {
      const paid = user.plan !== 'hobby' && true;
      return { paid: paid };
    } else {
      throw new Error("user not exist");
    }
  }
  if (userId) {
    fetchIfPaid(userId).then(
      (data) => {
        Paid = data.paid;
      }
    );
  }
  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Choose the Perfect Plan for Your Needs
          </h2>
          <p className="mb-5 font-light text-gray-800 sm:text-xl dark:text-gray-100">
            Whether you are just getting started or need advanced features, we
            have a plan that fits your needs. Unlock the full potential of our
            AI quiz generator today!
          </p>
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          <PricingCard
            title="Hobby"
            price="$0"
            period="/Permanent"
            features={[
              "No language feature",
              "Can only create 3 quizzes",
              "Can only generate 10 questions",
            ]}
            paid= {Paid}
            user={userId}
          />
          <PricingCard
            title="Monthly Plan"
            price="$2"
            period="/Month"
            description={{ oldPrice: 10, newPrice: 2 }}
            features={[
              "Language feature",
              "Access to generate unlimited quizzes",
              "Access to generate more than unlimited questions on the quiz page",
            ]}
            paid= {Paid}          />
          <PricingCard
            title="Yearly Plan"
            price="$10"
            period="/Year"
            description={{ oldPrice: 100, newPrice: 10 }}
            features={[
              "Language feature",
              "Access to generate unlimited quizzes",
              "Access to generate more than unlimited questions on the quiz page",
            ]}
            paid= {Paid}
          />
        </div>
      </div>
    </section>
  );
};

export default Page;
