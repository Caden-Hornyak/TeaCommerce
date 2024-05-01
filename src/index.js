import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Scene from './Scene';
import { UserProvider } from './UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <Scene />
    </UserProvider>
  </React.StrictMode>
);

