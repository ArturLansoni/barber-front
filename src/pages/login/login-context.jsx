import React, { createContext, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useApp } from "../../context/application-context";
import { setAccessToken } from "../../infra";
import { login } from "../../services/api";

const validate = ({ email, password }) => {
  if (!email || !password) return false;
  return true;
};

const LoginContext = createContext({
  state: {
    email: "",
    password: "",
    isLoading: false,
  },
  handleChange: () => {},
  onSubmit: () => {},
  goToRegisterPage: () => {},
});

const LoginProvider = ({ children }) => {
  const { setUser, setUserType } = useApp();
  const history = useHistory();
  const [state, setState] = useState({
    email: "",
    password: "",
    isLoading: false,
  });

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
      const { userType, ...userData } = user;
      setUser(userData);
      setUserType(userType);
      setAccessToken(user.accessToken);
      if (userType === "BARBER") {
        history.push("/barber");
        history.go(0);
      } else if (userType === "CLIENT") {
        history.push("/client");
        history.go(0);
      }
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

function useLogin() {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within an LoginProvider.");
  }

  return context;
}

export { useLogin, LoginProvider };
