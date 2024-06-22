import {SignUp} from "@clerk/nextjs"

export const metadata = {
    title: "Sign up | Learnrithm",
    description: "Quiz yourself on anything!",
  };

const SignUpPage = () => {
    return (
        <div className="flex items-center justify-cenetr flex-col gap-10">
            <h1 className="text-4xl font-bold mt-20">Sign Up To Continue </h1>
            <SignUp fallbackRedirectUrl="/"  />
        </div>
    );
};
export default SignUpPage;