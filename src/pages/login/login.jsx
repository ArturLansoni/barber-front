import React, { useState } from "react";
import "./login-styles.css";

const LoginPage = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setState((old) => ({ ...old, [e.target.id]: e.target.value }));
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Bem vindo</h1>

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

      <button type="submit">Login</button>
      <button type="button">Cadastrar</button>
    </form>
  );
};

export default LoginPage;
