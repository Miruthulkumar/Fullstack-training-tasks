import React, { useMemo } from "react";
import "./App.css";
import { UserProvider } from "./UserContext";
import DisplayProfile from "./DisplayProfile";

function App() {

  const user = useMemo(
    () => ({ name: "Miruthulkumar", department: "Engineering", age: 28 }),
    []
  );

  return (
    <UserProvider value={user}>
      <div>
        <DisplayProfile />
      </div>
    </UserProvider>
  );
}

export default App;
