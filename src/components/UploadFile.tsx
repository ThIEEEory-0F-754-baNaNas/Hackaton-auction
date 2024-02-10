import React, { useEffect } from "react";
import { updateProfileAvatar } from "../api/userApi";
import { Button, Input, Spinner } from "@material-tailwind/react";
import { useQuery } from "react-query";
import ErrorIndicator from "./ErrorIndicator";

const UploadFile = () => {
  const [file, setFile] = React.useState<File | null>(null);

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery(
    "updateProfileAvatar",
    () => file && updateProfileAvatar(file),
    {
      enabled: false,
    }
  );

  console.log(isLoading, isError, error, data);

  useEffect(() => {
    refetch();
  }, [file]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div>
      <div className="flex gap-3">
        <Input type="file" onChange={onFileChange} crossOrigin={undefined} />
        <Button
          variant="outlined"
          disabled={!file || isLoading || isFetching}
          onClick={() => refetch()}
          className="flex"
        >
          {data && !isFetching ? "Uploaded" : "Upload"}
          {(isLoading || isFetching) && <Spinner className="w-5" />}
        </Button>
      </div>
      {isError && !isFetching && <ErrorIndicator error={error} />}
    </div>
  );
};

export default UploadFile;
