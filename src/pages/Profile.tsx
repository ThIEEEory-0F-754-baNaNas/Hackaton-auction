import UploadFile from "../components/UploadFile";
import { updateProfileAvatar } from "../api/userApi";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

const Profile = () => {
  const [, setUser] = useContext(UserContext);

  return (
    <div>
      <UploadFile
        onUpload={(file) => {
          updateProfileAvatar(file).then((user) => setUser(user));
        }}
        label={"Update avatar"}
      />
    </div>
  );
};

export default Profile;
