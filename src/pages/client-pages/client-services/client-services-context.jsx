import React, { createContext, useCallback, useContext, useState } from "react";
import { findBarberServices } from "../../../services/api";

const ClientServiceContext = createContext({
  isLoading: false,
  services: [],
  findBarberDetail: () => {},
});

const ClientServiceProvider = ({ children }) => {
  const [state, setState] = useState({
    isLoading: false,
    services: [],
  });

  const findBarberDetail = useCallback(async (id) => {
    setState((old) => ({ ...old, isLoading: true }));
    const response = await findBarberServices();

    if (response) {
      setState((old) => ({ ...old, services: response }));
    }
    setState((old) => ({ ...old, isLoading: false }));
  }, []);

  return (
    <ClientServiceContext.Provider
      value={{
        ...state,
        findBarberDetail,
      }}
    >
      {children}
    </ClientServiceContext.Provider>
  );
};

function useClientService() {
  const context = useContext(ClientServiceContext);
  if (!context) {
    throw new Error(
      "useClientService must be used within an ClientServiceProvider."
    );
  }

  return context;
}

export { ClientServiceProvider, useClientService };
