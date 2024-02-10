import React from "react";
import { useLocation } from "react-router-dom";

const EditAuction = () => {
  const location = useLocation();

  console.log(location);
  console.log(location.state);

  return <div>hello</div>;
};

export default EditAuction;
