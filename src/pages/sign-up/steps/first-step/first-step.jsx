import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { SignUpContext } from "../../sign-up-context";

const FirstStep = () => {
  const { state, nextStep, handleChange } = useContext(SignUpContext);

  return (
    <form onSubmit={nextStep}>
      <h1>Cadastro</h1>

      <div>
        <label>Nome</label>
        <input id="name" value={state.name} onChange={handleChange} />
      </div>

      <div>
        <label>Telefone</label>
        <input id="telephone" value={state.telephone} onChange={handleChange} />
      </div>

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

      <div>
        <label>Confirmar senha</label>
        <input
          id="passwordConfirmation"
          type="password"
          value={state.passwordConfirmation}
          onChange={handleChange}
        />
      </div>

      <Button type="submit">Continuar</Button>
    </form>
  );
};

export default FirstStep;
