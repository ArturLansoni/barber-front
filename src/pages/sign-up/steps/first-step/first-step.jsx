import React, { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { SignUpContext } from "../../sign-up-context";

const FirstStep = () => {
  const { state, nextStep, handleChange } = useContext(SignUpContext);

  return (
    <Form onSubmit={nextStep}>
      <h1>Cadastro</h1>

      <Form.Group>
        <Form.Control
          id="name"
          placeholder="Nome"
          value={state.name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          id="telephone"
          placeholder="Telefone"
          value={state.telephone}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          id="email"
          type="email"
          placeholder="Email"
          value={state.email}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          id="password"
          type="password"
          placeholder="Senha"
          value={state.password}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          id="passwordConfirmation"
          type="password"
          placeholder="Confirmar senha"
          value={state.passwordConfirmation}
          onChange={handleChange}
        />
      </Form.Group>

      <Button type="submit">Continuar</Button>
    </Form>
  );
};

export default FirstStep;
