import ProfileUserForm from "@/components/profile/profile-forms/profile-user-form";

const Profile = () => {
  return (
    <div className="w-full max-w-[930px] md:pl-[40px] md:pr-[20px] mt-[40px] px-[20px]">
      <div className="mb-[32px] md:mb-[44px]">
        <p className="text-[20px] leading-[20px] font-semibold mb-[10px]">
          Guy Hawkins
        </p>
        <span className="text-[#000000] leading-[19px] opacity-50">
          guyhawkins@gmail.com
        </span>
      </div>
      <ProfileUserForm />
    </div>
  );
};

export default Profile;
