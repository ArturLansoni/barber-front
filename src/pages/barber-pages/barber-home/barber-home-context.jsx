import React, { createContext, useCallback, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  deleteService,
  findCurrentBarberServices,
} from "../../../services/api";

export const BarberHomeContext = createContext({
  state: {
    services: [],
    isLoading: false,
    dialog: {
      id: "",
      open: false,
      description: "",
    },
  },
  findServices: () => {},
  onOpenDeleteConfirmDialog: () => {},
  onCloseDialog: () => {},
  onDelete: () => {},
  onCreateService: () => {},
  onEditService: () => {},
});

const BarberHomeProvider = ({ children }) => {
  const history = useHistory();
  const [state, setState] = useState({
    services: [],
    isLoading: false,
    dialog: {
      id: "",
      open: false,
      description: "",
    },
  });

  const findServices = useCallback(async () => {
    setState((old) => ({ ...old, isLoading: true }));
    const services = await findCurrentBarberServices();
    setState((old) => ({ ...old, isLoading: false, services: services || [] }));
  }, []);

  const onOpenDeleteConfirmDialog = (id, description) => {
    setState((old) => ({
      ...old,
      dialog: {
        id: id,
        open: true,
        description: description,
      },
    }));
  };

  const onCloseDialog = () => {
    setState((old) => ({
      ...old,
      dialog: {
        id: "",
        open: false,
        description: "",
      },
    }));
  };

  const onDelete = async (serviceId) => {
    setState((old) => ({ ...old, isLoading: true }));
    await deleteService(serviceId);
    await findServices();
    setState((old) => ({
      ...old,
      isLoading: false,
      dialog: {
        id: "",
        open: false,
        description: "",
      },
    }));
  };

  const onCreateService = () => {
    history.push("/barber/new-service");
  };

  const onEditService = (service) => {
    history.push({
      pathname: "/barber/new-service",
      state: { service: service },
    });
  };

  return (
    <BarberHomeContext.Provider
      value={{
        state,
        findServices,
        onOpenDeleteConfirmDialog,
        onCloseDialog,
        onDelete,
        onCreateService,
        onEditService,
      }}
    >
      {children}
    </BarberHomeContext.Provider>
  );
};

function useBarberHome() {
  const context = useContext(BarberHomeContext);
  if (!context) {
    throw new Error("useBarberHome must be used within an BarberHomeProvider.");
  }

  return context;
}

export { useBarberHome, BarberHomeProvider };
