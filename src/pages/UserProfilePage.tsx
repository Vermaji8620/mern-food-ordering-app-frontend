import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
  const { currentUser, isLoading } = useGetMyUser();
  // upar ka jo currentUser hai wo, uska type:any hai, to uska type ko hmko sambhalna padega, any ke jagah pe individual fields ka type dena padega, ye chiz ek dusre file me hm likhe hai, Types.tsx me, usko import karke use karenge.
  const { updateUser, isPending } = useUpdateMyUser();

  if (isLoading) {
    <span>Loading...</span>;
  }

  if (!currentUser) {
    return <span>Unable to load user profile</span>;
  }

  return (
    <div>
      <UserProfileForm
        currentUser={currentUser}
        onSave={updateUser}
        isLoading={isPending}
      />
    </div>
  );
};

export default UserProfilePage;
