import React from "react";

const UploadFile = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      console.log(e.target.files[0]);
    }
    console.log(file);
  };

  return (
    <div>
      <input type="file" onChange={onFileChange} />
    </div>
  );
};

export default UploadFile;
