import { Button, Input, Spinner, Typography } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import ErrorIndicator from "./ErrorIndicator";
import classNames from "classnames";

interface UploadFileProps {
  onUpload: (files: File[]) => void;
  label: string;
  showButton?: boolean;
  multiple?: boolean;
}

const UploadFile = ({
  onUpload,
  label,
  showButton = true,
  multiple = false,
}: UploadFileProps) => {
  const [files, setFiles] = React.useState<File[]>([]);

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery(
    "loadFile",
    () => files && onUpload(files),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    refetch();
  }, [files]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <div>
      <div className="flex gap-3">
        <Typography variant="h6">{label}</Typography>
        <Input type="file" onChange={onFileChange} crossOrigin={undefined} multiple={multiple} />
        <Button
          variant="outlined"
          disabled={!files || isLoading || isFetching}
          onClick={() => refetch()}
          className={`flex ${classNames({
            hidden: !showButton,
          })}`}
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
