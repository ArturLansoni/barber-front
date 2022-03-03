import React, { useContext } from "react";
import { SignUpContext, SignUpProvider } from "./sign-up-context";
import { FirstStep, SecondStep, ThirdStep } from "./steps";

const SignUpPage = () => {
  const { state } = useContext(SignUpContext);

  return (
    <div className="page-container">
      <div className="card">
        {state.step === 0 && <FirstStep />}
        {state.step === 1 && <SecondStep />}
        {state.step === 2 && <ThirdStep />}
      </div>
    </div>
  );
};

const Page = () => (
  <SignUpProvider>
    <SignUpPage />
  </SignUpProvider>
);

export default Page;
