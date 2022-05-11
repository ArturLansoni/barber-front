import React, { createContext, useContext, useState } from "react";
import { findBarberServices } from "../../../services/api";

const ClientHomeContext = createContext({
  state: {
    isLoading: false,
  },
  findBarbers: () => {},
});

const ClientHomeProvider = ({ children }) => {
  const [state] = useState({
    isLoading: false,
  });

  const findBarbers = async () => {
    const response = await findBarberServices();
    console.log(response);
  };

  return (
    <ClientHomeContext.Provider
      value={{
        state,
        findBarbers,
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
