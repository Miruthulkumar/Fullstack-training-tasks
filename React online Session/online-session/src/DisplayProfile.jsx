import React from "react";
import { useUser } from "./UserContext";

const DisplayProfile = () => {
  const { name, department, age } = useUser();

  return (
    <div>
      <p>Name:{name}</p>
      <p>Department:{department}</p>
      <p>Age:{age}</p>
    </div>
  );
};

export default DisplayProfile;
