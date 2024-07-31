import UserSubs from "@/components/payments/userSubs";
import { UserProfile } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export const metadata = {
    title: "Profile | Learnrithm",
    description: "Manage your profile",
  };

const UserProfilePage = () => {
  const { userId } = auth();
    return (
        <div className="flex items-center flex-col gap-10">
            <h1 className="text-4xl font-bold">Manage Your Profile</h1>
            <UserProfile />
            <UserSubs userId={userId}/>
        </div>
    );
};
export default UserProfilePage;