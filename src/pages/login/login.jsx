import React from "react";
import { Button, Input } from "../../components";
import { LoginProvider, useLogin } from "./login-context";
import "./login-styles.css";

const LoginPage = () => {
  const { state, handleChange, onSubmit, goToRegisterPage } = useLogin();

  return (
    <div className="login-page-container">
      <form className="login-form-container" onSubmit={onSubmit}>
        <h1>Bem vindo</h1>
        <Input
          id="email"
          type="email"
          label="Email"
          value={state.email}
          onChange={handleChange}
        />
        <Input
          id="password"
          type="password"
          label="Senha"
          value={state.password}
          onChange={handleChange}
        />
        <Button onClick={onSubmit} isLoading={state.isLoading}>
          Login
        </Button>
        <Button variant="outline" onClick={goToRegisterPage}>
          Cadastrar
        </Button>
      </form>
    </div>
  );
};

const Page = () => (
  <LoginProvider>
    <LoginPage />
  </LoginProvider>
);

export default Page;
