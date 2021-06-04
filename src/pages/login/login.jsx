import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { loginBarber } from "../../services/api";
import { setAccessToken } from "../../infra";
import "./login-styles.css";

const LoginPage = () => {
  const history = useHistory();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    const barber = await loginBarber({
      email: state.email,
      password: state.password,
    });
    if (barber) {
      setAccessToken(barber.accessToken);
      history.push("/");
      return;
    }
  };

  const handleChange = (e) => {
    setState((old) => ({ ...old, [e.target.id]: e.target.value }));
  };

  const goToRegisterPage = () => history.push("/sign-up");

  return (
    <form onSubmit={onSubmit}>
      <h1>Bem vindo</h1>

      <div>
        <label>Email</label>
        <input
          id="email"
          type="email"
          value={state.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Senha</label>
        <input
          id="password"
          type="password"
          value={state.password}
          onChange={handleChange}
        />
      </div>

      <Button type="submit">Login</Button>
      <Button type="button" onClick={goToRegisterPage}>
        Cadastrar
      </Button>
    </form>
  );
};

export default LoginPage;
