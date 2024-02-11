import { Button, Input } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { addDeposit, updateProfileAvatar } from "../api/userApi";
import ErrorIndicator from "../components/ErrorIndicator";
import UploadFile from "../components/UploadFile";
import { UserContext } from "../context/userContext";

const Profile = () => {
  const [user, setUser] = useContext(UserContext);
  const [error, setError] = useState<string | null>(null);

  const [depositAmount, setDepositAmount] = useState(0);

  const handleAddDeposit = async () => {
    await addDeposit(depositAmount);
    if (user.isNotOk) throw new Error();
    setUser({ ...user, balance: user.balance + depositAmount });
  };

  if (user.isNotOk) return <ErrorIndicator error={user} />;

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

      <div className="flex">
        <Input
          type="number"
          placeholder={depositAmount.toString()}
          onChange={(e) => setDepositAmount(Number(e.target.value))}
          label="Add Deposit"
          crossOrigin={undefined}
        />
        <Button onClick={handleAddDeposit}>Add Deposit</Button>
      </div>
    </div>
  );
};

export default Profile;
