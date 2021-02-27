/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';

export const UserContext = createContext({});

function UserContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [userLoading, setUserLoading] = useState(false);

  return (
    <UserContext.Provider
      value={{ user, setUser, userLoading, setUserLoading }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
