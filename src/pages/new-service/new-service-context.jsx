import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { createService } from "../../services/api";

export const NewServiceContext = createContext({
  state: {
    description: "",
    price: "",
    estimatedTime: "",
    image: "",
    isLoading: false
  },
  handleChange: () => {},
  onSubmit: () => {},
  goBack: () => {},
});

export const NewServiceProvider = ({ children }) => {
  const history = useHistory();
  const [state, setState] = useState({
    description: "",
    price: "",
    estimatedTime: "",
    image: "",
    isLoading: false
  });

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

    const service = await createService({
      description: state.description,
      price: state.price,
      estimatedTime: state.estimatedTime,
      image: state.image
    });

    if (service) {
      goBack();
      toast.success("Serviço cadastrado com sucesso!");
    }
    setState((old) => ({ ...old, isLoading: false }));
  };

  const goBack = () => {
    history.push("/");
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
