import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Form, Spinner } from "react-bootstrap";
import { loginBarber } from "../../services/api";
import { setAccessToken } from "../../infra";
import "./login-styles.css";

const LoginPage = () => {
  const history = useHistory();
  const [state, setState] = useState({
    email: "",
    password: "",
    isLoading: false,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (state.isLoading) return;
    setState((old) => ({ ...old, isLoading: true }));

    const isValid = validate();
    if (!isValid) {
      toast.error("Todos os campos devem ser preenchidos!");
      setState((old) => ({ ...old, isLoading: false }));
      return;
    }

    const barber = await loginBarber({
      email: state.email,
      password: state.password,
    });

    if (barber) {
      setAccessToken(barber.accessToken);
      history.push("/");
    }

    setState((old) => ({ ...old, isLoading: false }));
  };

  const validate = () => {
    if (!state.email || !state.password) return false;
    return true;
  };

  const handleChange = (e) => {
    setState((old) => ({ ...old, [e.target.id]: e.target.value }));
  };

  const goToRegisterPage = () => history.push("/sign-up");

  return (
    <div className="page-container">
      <Form className="card" onSubmit={onSubmit}>
        <h1>Bem vindo</h1>
        <Form.Group>
          <i className="fa fa-user" aria-hidden="true"></i>
          <Form.Control
            id="email"
            type="email"
            placeholder="Email"
            value={state.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <i className="fa fa-lock" aria-hidden="true"></i>
          <Form.Control
            id="password"
            type="password"
            placeholder="Senha"
            value={state.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit">
          {state.isLoading && (
            <Spinner animation="border" role="status" size="sm" />
          )}
          Login
        </Button>
        <Button
          variant="outline-secondary"
          type="button"
          onClick={goToRegisterPage}
        >
          Cadastrar
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
