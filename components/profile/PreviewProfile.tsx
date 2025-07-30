import { useAuth } from "@/hooks/useAuth";

const PreviewProfile = ({ setEdit }: { setEdit: any }) => {
  const { user } = useAuth();

  return (
    <div className="max-w-sm mx-auto  min-h-[75vh] mt-10 bg-white shadow-md rounded-xl p-6">
      <div className="">
        {/* Avatar Section */}
        <h2 className="text-2xl font-semibold ml-4">Profile</h2>
        <div className="size-full flex flex-col gap-8 justify-between">
          <div>
            <div className="flex flex-col items-center text-center">
              <div className="w-40 h-40 rounded-full overflow-hidden border">
                <img
                  src={user?.avatarUrl || "/images/user.png"}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Info Section */}
            <div className="">
              <div className="space-y-4">
                {/* First Name */}
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    First Name
                  </label>
                  <p className="text-base font-medium">
                    {user?.firstName || "-"}
                  </p>
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Last Name
                  </label>
                  <p className="text-base font-medium">
                    {user?.lastName || "-"}
                  </p>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Email
                  </label>
                  <p className="text-base font-medium text-gray-700">
                    {user?.email}
                  </p>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Phone Number
                  </label>
                  <p className="text-base font-medium">
                    {user?.phoneNumber || "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="px-4 bg-primary text-black py-2 text-center rounded-md font-semibold cursor-pointer"
            onClick={setEdit}
          >
            Edit Profile
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewProfile;
