import apis from "@/api/apis";
import axiosInstance from "@/api/axiosInstance";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { Camera } from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  authProvider: string | null;
  profileImageUrl: string | null;
  phoneNumber: string | null;
  avatarUrl: string | null;
}

const UpdateProfileForm = ({ setEdit }: { setEdit: any }) => {
  const [formData, setFormData] = useState<UserProfile>({
    id: "",
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    authProvider: "",
    profileImageUrl: "",
    phoneNumber: null,
    avatarUrl: "",
  });

  const [updating, setUpdating] = useState(false);
  const { user, saveUseInfo } = useAuth();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // Load user data
  useEffect(() => {
    if (user?.id) {
      setFormData(user);
    }
  }, [user]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (!user?.id) return;
    e.preventDefault();
    setUpdating(true);
    try {
      const update = await axiosInstance.patch(
        apis.user.getById(user.id),
        formData
      );
      console.log("update", update);
      if (update.data) {
        saveUseInfo({
          ...user,
          ...update.data,
        });
      }
      setEdit();
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update profile.");
    } finally {
      setUpdating(false);
    }
  };

  const uploadAvatar = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("files", file);

    try {
      const res = await axiosInstance.post(apis.common.upload, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res?.data?.fileIds[0];
    } catch (error) {
      console.error("Upload failed", error);
      throw new Error("Upload failed");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedImage(file);
    setUploading(true);

    try {
      const uploadedUrl = await uploadAvatar(file);
      console.log(uploadedUrl);
      setFormData((prev) => ({
        ...prev,
        avatarUrl: apis.common.imageUrl(uploadedUrl),
      }));
    } catch (error) {
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 bg-white shadow-md rounded-xl p-6  min-h-[75vh] ">
      <div className="w-full">
        <h2 className="text-2xl font-semibold mb-6 ml-4">Edit Profile</h2>
        <div className="flex flex-col gap-8">
          {/* Avatar & Edit Button */}
          <div className="relative flex flex-col items-center text-center">
            {/* Avatar Circle */}
            <div className="w-40 h-40 rounded-full border relative">
              <div>
                <img
                  src={formData?.avatarUrl || "/images/user.png"}
                  alt="Avatar Preview"
                  className="w-40 h-40 overflow-hidden object-cover rounded-full"
                />
              </div>
              {/* Camera Icon Overlay */}
              <label className="absolute bottom-2 right-2 bg-white shadow-md p-1 rounded-full cursor-pointer hover:bg-gray-100 transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Camera className="w-5 h-5 text-gray-600" />
              </label>
            </div>
          </div>

          {/* Profile Form */}
          <div className="">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  First Name
                </label>
                <input
                  name="firstName"
                  value={formData?.firstName}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Last Name
                </label>
                <input
                  name="lastName"
                  value={formData?.lastName}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>

              {/* Email (disabled) */}
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  name="email"
                  value={formData?.email}
                  disabled
                  className="w-full border px-3 py-2 rounded-md bg-gray-100 text-gray-500"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <input
                  name="phoneNumber"
                  value={formData?.phoneNumber ? formData.phoneNumber : ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  onClick={setEdit}
                  type="button"
                  disabled={updating}
                  className="w-full bg-primary text-black font-medium py-2 rounded-md hover:bg-primary-dark transition"
                >
                  {"Cancel"}
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="w-full bg-primary text-black font-medium py-2 rounded-md hover:bg-primary-dark transition"
                >
                  {updating ? "Updating..." : "Save Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileForm;
