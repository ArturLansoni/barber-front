import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { clearLocalStorage } from "../../infra";
import {
  createService,
  deleteService,
  findCurrentBarberServices,
} from "../../services/api";

export const HomeContext = createContext({
  state: {
    services: [],
    isLoading: false,
  },
  onSubmit: () => {},
  findServices: () => {},
  handleNewServiceChange: () => {},
  onLogOut: () => {},
  onDelete: () => {},
  onCreateService: () => {},
  onEditService: () => {}
});

export const HomeProvider = ({ children }) => {
  const history = useHistory();
  const [state, setState] = useState({
    services: [],
    isLoading: false,
  });

  const findServices = async () => {
    setState((old) => ({ ...old, isLoading: true }));
    const services = await findCurrentBarberServices();
    setState((old) => ({ ...old, isLoading: false, services: services || [] }));
  };

  const handleNewServiceChange = (e) => {
    setState((old) => ({
      ...old,
      newService: { ...old.newService, [e.target.id]: e.target.value },
    }));
  };

  const onLogOut = () => {
    clearLocalStorage();
    history.push("/login");
  };

  const onDelete = async (serviceId) => {
    setState((old) => ({ ...old, isLoading: true }));
    await deleteService(serviceId);
    await findServices();
    setState((old) => ({ ...old, isLoading: false }));
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
    <HomeContext.Provider
      value={{
        state,
        findServices,
        handleNewServiceChange,
        onLogOut,
        onDelete,
        onCreateService,
        onEditService
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
