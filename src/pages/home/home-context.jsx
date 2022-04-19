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
    newService: {
      price: null,
      description: "",
      image: "",
      estimatedTime: null,
    },
    isLoading: false,
  },
  onSubmit: () => {},
  findServices: () => {},
  handleNewServiceChange: () => {},
  onLogOut: () => {},
  onDelete: () => {},
  onSave: () => {},
  onCreateService: () => {}
});

export const HomeProvider = ({ children }) => {
  const history = useHistory();
  const [state, setState] = useState({
    services: [],
    newService: {
      price: null,
      description: "",
      image: "",
      estimatedTime: null,
    },
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

  const onSave = async () => {
    setState((old) => ({ ...old, isLoading: true }));

    if (
      !state.newService.price ||
      !state.newService.description ||
      !state.newService.image ||
      !state.newService.estimatedTime
    ) {
      setState((old) => ({ ...old, isLoading: false }));
      return;
    }

    await createService({
      ...state.newService,
      estimatedTime: Number(state.newService.estimatedTime),
    });

    toast.success("Serviço cadastrado com sucesso!");
    await findServices();
    setState((old) => ({
      ...old,
      isLoading: false,
      newService: {
        price: "",
        description: "",
        image: "",
        estimatedTime: "",
      },
    }));
  };

  const onCreateService = () => {
    history.push('./new-service')
  }

  return (
    <HomeContext.Provider
      value={{
        state,
        findServices,
        handleNewServiceChange,
        onLogOut,
        onDelete,
        onSave,
        onCreateService
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
