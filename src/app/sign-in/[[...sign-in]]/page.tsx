import {SignIn} from "@clerk/nextjs"
import Link from "next/link";

export const metadata = {
    title: "Sign in | Learnrithm",
    description: "Quiz yourself on anything!",
  };

const SignInPage = () => {
    return (
        <div className="flex items-center justify-cenetr flex-col gap-10">
            <h1 className="text-4xl font-bold mt-20">Sign In To Continue </h1>
            <SignIn fallbackRedirectUrl="/" />
            <div className="text-sm mt-2 flex">
                <p>forget password ?</p>
                <Link href="/forget-password" className="text-blue-400 ml-2">Reset here</Link>
            </div>
        </div>
    );
};
export default SignInPage;