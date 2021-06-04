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
      <div class="login-box">
        <h1>Bem vindo</h1>
        <div class="textbox">
          <i class="fa fa-user" aria-hidden="true"></i>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={state.email}
            onChange={handleChange}
          />
        </div>

        <div class="textbox">
          <i class="fa fa-lock" aria-hidden="true"></i>
          <input
            id="password"
            type="password"
            placeholder="Senha"
            value={state.password}
            onChange={handleChange}
          />
        </div>
        <Button classname="btn" type="submit">
          Login
        </Button>
        <Button classname="btn" type="button" onClick={goToRegisterPage}>
          Cadastrar
        </Button>
      </div>
    </form>
  );
};

export default LoginPage;
