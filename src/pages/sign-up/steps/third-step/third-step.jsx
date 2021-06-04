import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { SignUpContext } from "../../sign-up-context";

const ThirdStep = () => {
  const { state, onSubmit, backStep, handleChange } = useContext(SignUpContext);

  return (
    <form onSubmit={onSubmit}>
      <h1>Cadastro</h1>

      <div>
        <label>Foto de perfil</label>
        <input
          id="image"
          placeholder="Digite aqui o endereço de uma imagem"
          value={state.image}
          onChange={handleChange}
        />
      </div>

      <Button type="button" onClick={backStep}>
        Voltar
      </Button>
      <Button type="submit">Cadastrar</Button>
    </form>
  );
};

export default ThirdStep;
