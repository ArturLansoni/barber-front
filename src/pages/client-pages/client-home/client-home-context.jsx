import React, { createContext, useContext, useState } from "react";

const ClientHomeContext = createContext({
  state: {
    isLoading: false,
  },
});

const ClientHomeProvider = ({ children }) => {
  const [state] = useState({
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

function useClientHome() {
  const context = useContext(ClientHomeContext);
  if (!context) {
    throw new Error("useClientHome must be used within an ClientHomeProvider.");
  }

  return context;
}

export { ClientHomeProvider, useClientHome };
