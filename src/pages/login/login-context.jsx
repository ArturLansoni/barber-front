import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { setAccessToken } from "../../infra";
import { login } from "../../services/api";

export const LoginContext = createContext({
  state: {
    email: "",
    password: "",
    isLoading: false,
  },
  handleChange: () => {},
  onSubmit: () => {},
  goToRegisterPage: () => {},
});

export const LoginProvider = ({ children }) => {
  const history = useHistory();
  const [state, setState] = useState({
    email: "",
    password: "",
    isLoading: false,
  });

  const validate = ({ email, password }) => {
    if (!email || !password) return false;
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

    const user = await login({
      email: state.email,
      password: state.password,
    });

    if (user) {
      setAccessToken(user.accessToken);
      history.push("/");
    }
    setState((old) => ({ ...old, isLoading: false }));
  };

  const goToRegisterPage = () => {
    history.push("/sign-up");
  };

  return (
    <LoginContext.Provider
      value={{
        state,
        handleChange,
        onSubmit,
        goToRegisterPage,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
