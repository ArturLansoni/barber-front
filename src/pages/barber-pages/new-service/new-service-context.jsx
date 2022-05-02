import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { createService, updateService } from "../../../services/api";

const NewServiceContext = createContext({
  state: {
    description: "",
    price: "",
    estimatedTime: "",
    image: "",
    isLoading: false,
  },
  handleChange: () => {},
  onSubmit: () => {},
  goBack: () => {},
});

const NewServiceProvider = ({ children }) => {
  const location = useLocation();
  const history = useHistory();

  const [state, setState] = useState({
    _id: "",
    description: "",
    price: "",
    estimatedTime: "",
    image: "",
    isLoading: false,
    isEditing: false,
  });

  useEffect(() => {
    if (location.state && location.state.service) {
      setState(() => ({ ...location.state.service, isEditing: true }));
    }
  }, [location.state]);

  const validate = ({ description, price, estimatedTime, image }) => {
    if (!description || !price || !estimatedTime || !image) return false;
    return true;
  };

  const handleChange = (e) => {
    setState((old) => ({ ...old, [e.target.id]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (state.isLoading) return;
    setState((old) => ({ ...old, isLoading: true }));

    const isValid = validate(state);
    if (!isValid) {
      toast.error("Todos os campos devem ser preenchidos!");
      setState((old) => ({ ...old, isLoading: false }));
      return;
    }

    if (!state.isEditing) {
      const service = await createService({
        description: state.description,
        price: state.price,
        estimatedTime: state.estimatedTime,
        image: state.image,
      });

      if (service) {
        goBack();
        toast.success("Serviço cadastrado com sucesso!");
      }
    } else {
      const service = {
        _id: state._id,
        description: state.description,
        price: state.price,
        estimatedTime: state.estimatedTime,
        image: state.image,
      };
      await updateService(service);
      goBack();
      toast.success("Serviço editado com sucesso!");
    }
    setState((old) => ({ ...old, isLoading: false }));
  };

  const goBack = () => {
    history.push("/barber");
  };

  return (
    <NewServiceContext.Provider
      value={{
        state,
        handleChange,
        onSubmit,
        goBack,
      }}
    >
      {children}
    </NewServiceContext.Provider>
  );
};

function useNewService() {
  const context = useContext(NewServiceContext);
  if (!context) {
    throw new Error("useNewService must be used within an NewServiceProvider.");
  }

  return context;
}

export { useNewService, NewServiceProvider };
