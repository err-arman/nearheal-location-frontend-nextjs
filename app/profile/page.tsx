"use client";

// import Layout from '@/components/layout/Layout';
import UpdateProfileForm from "@/components/profile/UpdateProfileForm";
import PreviewProfile from "@/components/profile/PreviewProfile";
import { useState } from "react";

const DashboardProfile = () => {
  const [editMode, setEditMode] = useState(false);
  return (
    // <Layout>
    <div className="mt-[70px] mb-2 w-12/12">
      {editMode ? (
        <UpdateProfileForm
          setEdit={() => setEditMode((pre) => !pre)}
        ></UpdateProfileForm>
      ) : (
        <PreviewProfile
          setEdit={() => setEditMode((pre) => !pre)}
        ></PreviewProfile>
      )}
    </div>
    // </Layout>
  );
};

export default DashboardProfile;
