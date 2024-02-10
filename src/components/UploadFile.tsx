import React from "react";
import { updateProfileAvatar } from "../api/userApi";

const UploadFile = () => {
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      updateProfileAvatar(e.target.files[0]);
    }
  };

  return (
    <div>
      <input type="file" onChange={onFileChange} />
    </div>
  );
};

export default UploadFile;
