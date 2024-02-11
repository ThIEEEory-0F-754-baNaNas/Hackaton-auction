import { Button, Input, Spinner, Typography } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import ErrorIndicator from "./ErrorIndicator";
import classNames from "classnames";

interface UploadFileProps {
  onUpload: (file: File) => void;
  label: string;
  showButton?: boolean;
}

const UploadFile = ({
  onUpload,
  label,
  showButton = true,
}: UploadFileProps) => {
  const [file, setFile] = React.useState<File | null>(null);

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery(
    "loadFile",
    () => file && onUpload(file),
    {
      enabled: false,
    }
  );

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
        <Typography variant="h6">{label}</Typography>
        <Input type="file" onChange={onFileChange} crossOrigin={undefined} />
        <Button
          variant="outlined"
          disabled={!file || isLoading || isFetching}
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
