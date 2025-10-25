import React, { createContext, useContext } from "react";

const UserContext = createContext({
  name: "",
  department: "",
  age:"",
});

export const UserProvider = ({ children, value }) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);

export default UserContext;
