import React, { createContext, useState } from "react";
import { createBarber } from "../../services/api";

export const SignUpContext = createContext({
  state: {
    step: 0,
    name: "",
    telephone: "",
    email: "",
    image: "",
    address: "",
    password: "",
    passwordConfirmation: "",
  },
  handleChange: () => {},
  handleAddressChange: () => {},
  onSubmit: () => {},
  nextStep: () => {},
  backStep: () => {},
});

export const SignUpProvider = ({ children }) => {
  const [state, setState] = useState({
    step: 0,
    name: "",
    telephone: "",
    email: "",
    image: "",
    address: {
      zipCode: "",
      number: "",
      street: "",
      neighborhood: "",
      city: "",
      state: "",
      country: "BR",
      complement: "",
    },
    password: "",
    passwordConfirmation: "",
  });

  const validate = ({
    name,
    telephone,
    email,
    password,
    passwordConfirmation,
  }) => {
    if (!name || !telephone || !email || !password || !passwordConfirmation)
      return false;

    return true;
  };

  const handleChange = (e) => {
    setState((old) => ({ ...old, [e.target.id]: e.target.value }));
  };
  const handleAddressChange = (field, value) => {
    setState((old) => ({
      ...old,
      address: { ...old.address, [field]: value },
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate(state);
    if (!isValid) return;

    await createBarber({
      name: state.name,
      telephone: state.telephone,
      email: state.email,
      image: state.image,
      address: state.address,
      password: state.password,
    });
  };

  const nextStep = () => {
    setState((old) => ({ ...old, step: old.step + 1 }));
  };
  const backStep = () => {
    setState((old) => ({ ...old, step: old.step - 1 }));
  };

  return (
    <SignUpContext.Provider
      value={{
        state,
        handleChange,
        handleAddressChange,
        onSubmit,
        nextStep,
        backStep,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
};
