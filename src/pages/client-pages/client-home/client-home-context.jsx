import React, { createContext, useState } from "react";

export const ClientHomeContext = createContext({
  state: {
    isLoading: false,
  },
});

export const ClientHomeProvider = ({ children }) => {
  const [state, setState] = useState({
    isLoading: false,
  });

  return (
    <ClientHomeContext.Provider
      value={{
        state,
      }}
    >
      {children}
    </ClientHomeContext.Provider>
  );
};
