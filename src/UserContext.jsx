import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    fetch('http://localhost/teashop/php/get_user_info.php', {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (!('error' in data)) {
          setUserDetails(data);
        }
        
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });

  }, []);

  return (
    <UserContext.Provider value={{ shoppingCart, setShoppingCart, userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };