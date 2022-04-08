import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { createBarber } from "../../services/api";

export const SignUpContext = createContext({
  state: {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    isLoading: false,
  },
  handleChange: () => {},
  onSubmit: () => {},
  goBack: () => {},
});

export const SignUpProvider = ({ children }) => {
  const history = useHistory();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    isLoading: false,
  });

  const validate = ({ name, email, password, passwordConfirmation }) => {
    if (!name || !email || !password || !passwordConfirmation) return false;
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

    const barber = await createBarber({
      name: state.name,
      email: state.email,
      password: state.password,
    });

    if (barber) {
      history.push("/login");
      toast.success("Barbeiro cadastrado com sucesso!");
    }
    setState((old) => ({ ...old, isLoading: false }));
  };

  const goBack = () => {
    history.push("/login");
  };

  return (
    <SignUpContext.Provider
      value={{
        state,
        handleChange,
        onSubmit,
        goBack,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
};
