import React, { useEffect } from "react";
import { ClientHomeProvider, useClientHome } from "./client-home-context";
import "./client-home-styles.css";

const ClientHomePage = () => {
  const { findBarbers } = useClientHome();
  useEffect(() => {
    findBarbers();
  }, []);

  return (
    <div className="client-home-page-container">
      <header>
        <h1>Teste</h1>
      </header>
    </div>
  );
};

const Page = () => (
  <ClientHomeProvider>
    <ClientHomePage />
  </ClientHomeProvider>
);

export default Page;
