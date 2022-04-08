import React, { useContext } from "react";
import { Button, Input } from "../../components";
import { SignUpContext, SignUpProvider } from "./sign-up-context";
import "./sign-up-styles.css";

const SignUpPage = () => {
  const { state, handleChange, onSubmit, goBack } = useContext(SignUpContext);

  return (
    <div className="sign-up-page-container">
      <form className="sign-up-form-container" onSubmit={onSubmit}>
        <h1>Cadastro</h1>
        <Input
          id="name"
          label="Nome"
          value={state.name}
          onChange={handleChange}
        />

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

        <Input
          id="passwordConfirmation"
          type="password"
          label="Confirmar senha"
          value={state.passwordConfirmation}
          onChange={handleChange}
        />

        <Button type="submit" isLoading={state.isLoading}>
          Cadastrar
        </Button>
        <Button variant="outline" onClick={goBack}>
          Voltar
        </Button>
      </form>
    </div>
  );
};

const Page = () => (
  <SignUpProvider>
    <SignUpPage />
  </SignUpProvider>
);

export default Page;
