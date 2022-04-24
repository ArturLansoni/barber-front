import React, { createContext, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { clearLocalStorage } from "../../../infra";
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
      description: ""
    }
  },
  findServices: () => {},
  onLogOut: () => {},
  onOpenDeleteConfirmDialog: () => {},
  onCloseDialog: () => {},
  onDelete: () => {},
  onCreateService: () => {},
  onEditService: () => {}
});

export const BarberHomeProvider = ({ children }) => {
  const history = useHistory();
  const [state, setState] = useState({
    services: [],
    isLoading: false,
    dialog: {
      id: "",
      open: false,
      description: ""
    }
  });

  const findServices = useCallback(async () => {
    setState((old) => ({ ...old, isLoading: true }));
    const services = await findCurrentBarberServices();
    setState((old) => ({ ...old, isLoading: false, services: services || [] }));
  }, []);

  const onLogOut = () => {
    clearLocalStorage();
    history.push("/login");
  };

  const onOpenDeleteConfirmDialog = (id, description) => {
    setState(old => ({
      ...old,
      dialog: {
        id: id,
        open: true,
        description: description
      }
    }))
  }

  const onCloseDialog = () => {
    setState(old => ({
      ...old,
      dialog: {
        id: "",
        open: false,
        description: ""
      }
    }))
  }

  const onDelete = async (serviceId) => {
    setState((old) => ({ ...old, isLoading: true }));
    await deleteService(serviceId);
    await findServices();
    setState((old) => ({ 
      ...old, 
      isLoading: false , 
      dialog: {
        id: "",
        open: false,
        description: ""
      }
    }));
  };

  const onCreateService = () => {
    history.push('./new-service')
  }

  const onEditService = (service) => {
      history.push({
        pathname: './new-service',
        state: {service: service}
      })
  }

  return (
    <BarberHomeContext.Provider
      value={{
        state,
        findServices,
        onLogOut,
        onOpenDeleteConfirmDialog,
        onCloseDialog,
        onDelete,
        onCreateService,
        onEditService
      }}
    >
      {children}
    </BarberHomeContext.Provider>
  );
};
