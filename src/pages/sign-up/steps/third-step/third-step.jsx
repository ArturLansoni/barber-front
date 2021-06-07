import React, { useContext } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { SignUpContext } from "../../sign-up-context";
import "./third-step-styles.css";

const ThirdStep = () => {
  const { state, onSubmit, backStep, handleChange } = useContext(SignUpContext);

  return (
    <Form onSubmit={onSubmit}>
      <h1>Cadastro</h1>

      {state.image && (
        <div className="img-container">
          <Image src={state.image} alt="Foto de perfil" roundedCircle />
        </div>
      )}
      <Form.Group>
        <Form.Control
          id="image"
          placeholder="Digite aqui o endereço de uma imagem"
          value={state.image}
          onChange={handleChange}
        />
      </Form.Group>

      <div className="spaced-row">
        <Button type="button" variant="outline-secondary" onClick={backStep}>
          Voltar
        </Button>
        <Button type="submit">Cadastrar</Button>
      </div>
    </Form>
  );
};

export default ThirdStep;
