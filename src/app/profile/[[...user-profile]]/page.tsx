import { UserProfile } from "@clerk/nextjs";
export const metadata: Metadata = {
    title: "Learnrithm AI Quiz",
    description: "Learnrithm AI Quiz | Learning Doesnt Have To Be Hard",
    // other metadata
  };
export const metadata = {
    title: "Profile | Learnrithm",
    description: "Manage your profile",
  };

const UserProfilePage = () => {
    return (
        <div className="flex items-center flex-col gap-10">
            <h1 className="text-4xl font-bold">Manage Your Profile</h1>
            <UserProfile />
        </div>
    );
};
export default UserProfilePage;