import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { SignUpContext } from "../../sign-up-context";

const SecondStep = () => {
  const { state, nextStep, backStep, handleAddressChange } =
    useContext(SignUpContext);

  const handleChange = (e) => {
    handleAddressChange(e.target.id, e.target.value);
  };

  return (
    <form onSubmit={nextStep}>
      <h1>Cadastro</h1>

      <div>
        <label>CEP</label>
        <input
          id="zipCode"
          value={state.address.zipCode}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Rua</label>
        <input
          id="street"
          value={state.address.street}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Número</label>
        <input
          id="number"
          value={state.address.number}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Bairro</label>
        <input
          id="neighborhood"
          value={state.address.neighborhood}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Cidade</label>
        <input id="city" value={state.address.city} onChange={handleChange} />
      </div>

      <div>
        <label>Estado</label>
        <input id="state" value={state.address.state} onChange={handleChange} />
      </div>

      <Button type="button" onClick={backStep}>
        Voltar
      </Button>
      <Button type="submit">Continuar</Button>
    </form>
  );
};

export default SecondStep;
