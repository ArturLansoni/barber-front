import React, { createContext, useCallback, useContext, useState } from "react";
import { findBarbers } from "../../../services/api";

const ClientHomeContext = createContext({
  isLoading: false,
  services: [],
  findBarbers: () => {},
});

const ClientHomeProvider = ({ children }) => {
  const [state, setState] = useState({
    isLoading: false,
    services: [],
  });

  const findBarbers = useCallback(async () => {
    setState((old) => ({ ...old, isLoading: true }));
    const response = await findBarbers();

    if (response) {
      setState((old) => ({ ...old, services: response }));
    }
    setState((old) => ({ ...old, isLoading: false }));
  }, []);

  return (
    <ClientHomeContext.Provider
      value={{
        ...state,
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
