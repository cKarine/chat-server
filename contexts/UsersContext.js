import { createContext, useContext, useState } from "react";

const allUsersContext = createContext();
const setAllUsersContext = createContext();

export function useAllUsers() {
  return useContext(allUsersContext);
}

export function useSetAllUsers() {
  return useContext(setAllUsersContext);
}

export function AllUsersProvider({ children }) {
  const [allUsers, setAllUsers] = useState([]);

  return (
    <allUsersContext.Provider value={allUsers}>
      <setAllUsersContext.Provider value={setAllUsers}>
        {children}
      </setAllUsersContext.Provider>
    </allUsersContext.Provider>
  );
}
