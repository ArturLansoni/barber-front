import React, { useContext } from "react";
import { SignUpContext, SignUpProvider } from "./sign-up-context";
import { FirstStep, SecondStep, ThirdStep } from "./steps";

const SignUpPage = () => {
  const { state } = useContext(SignUpContext);

  return (
    <>
      {state.step === 0 && <FirstStep />}
      {state.step === 1 && <SecondStep />}
      {state.step === 2 && <ThirdStep />}
    </>
  );
};

const Page = () => (
  <SignUpProvider>
    <SignUpPage />
  </SignUpProvider>
);

export default Page;
