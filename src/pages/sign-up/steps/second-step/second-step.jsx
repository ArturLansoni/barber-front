import React, { useContext } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { SignUpContext } from "../../sign-up-context";

const SecondStep = () => {
  const { state, nextStep, backStep, handleAddressChange } =
    useContext(SignUpContext);

  const handleChange = (e) => {
    handleAddressChange(e.target.id, e.target.value);
  };

  return (
    <Form onSubmit={nextStep}>
      <h1>Cadastro</h1>

      <Form.Group>
        <Form.Control
          id="zipCode"
          placeholder="CEP"
          value={state.address.zipCode}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          id="street"
          placeholder="Rua"
          value={state.address.street}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          id="number"
          placeholder="Número"
          value={state.address.number}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          id="neighborhood"
          placeholder="Bairro"
          value={state.address.neighborhood}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          id="city"
          placeholder="Cidade"
          value={state.address.city}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          id="state"
          placeholder="Estado"
          value={state.address.state}
          onChange={handleChange}
        />
      </Form.Group>

      <div className="spaced-row">
        <Button variant="outline-secondary" type="button" onClick={backStep}>
          Voltar
        </Button>
        <Button type="submit">Continuar</Button>
      </div>
    </Form>
  );
};

export default SecondStep;
