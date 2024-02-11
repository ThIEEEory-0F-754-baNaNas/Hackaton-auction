import React from "react";
import UploadFile from "../components/UploadFile";
import { updateProfileAvatar } from "../api/userApi";

const Profile = () => {
  return (
    <div>
      <UploadFile onUpload={updateProfileAvatar} label={"Update avatar"} />
    </div>
  );
};

export default Profile;
