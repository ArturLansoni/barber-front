import React, { useContext, useEffect } from "react";
import { Button, Spinner } from "../../components";
import { ServiceItem, NewServiceItem } from "./sub-components";
import { HomeContext, HomeProvider } from "./home-context";
import "./home-styles.css";

const HomePage = () => {
  const {
    state,
    findServices,
    handleNewServiceChange,
    onDelete,
    onLogOut,
    onSave,
    onCreateService
  } = useContext(HomeContext);

  useEffect(() => {
    findServices();
  }, []);

  return (
    <div className="home-page-container">
      <header>
        <h1>Barberbook</h1>
        <Button color="error" onClick={onLogOut}>
          LOGOUT
        </Button>
      </header>

      <div className="home-title">
        <h2>Serviços</h2>
        <Button type="button" color="secondary" onClick={onCreateService}>
          + Novo Serviço
        </Button>
      </div>

      <ul>
        {!state.services.length && state.isLoading && <Spinner />}
        {state.services.map((i) => (
          <ServiceItem
            isLoading={state.isLoading}
            key={i._id}
            price={i.price}
            description={i.description}
            image={i.image}
            estimatedTime={i.estimatedTime}
            onDelete={() => onDelete(i._id)}
          />
        ))}
      </ul>
    </div>
  );
};

const Page = () => (
  <HomeProvider>
    <HomePage />
  </HomeProvider>
);

export default Page;
