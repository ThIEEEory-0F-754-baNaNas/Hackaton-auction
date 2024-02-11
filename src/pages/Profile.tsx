import UploadFile from "../components/UploadFile";
import { updateProfileAvatar } from "../api/userApi";
import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import ErrorIndicator from "../components/ErrorIndicator";

const Profile = () => {
  const [, setUser] = useContext(UserContext);
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <UploadFile
        onUpload={(file) => {
          setError(null);
          updateProfileAvatar(file)
            .then((user) => setUser(user))
            .catch(setError);
        }}
        label={"Update avatar"}
      />
      {error && <ErrorIndicator error={error} />}
    </div>
  );
};

export default Profile;
