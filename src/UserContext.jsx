import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  return (
    <UserContext.Provider value={{ shoppingCart, setShoppingCart, userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };