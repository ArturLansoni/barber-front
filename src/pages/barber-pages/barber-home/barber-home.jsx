import React, { useContext, useEffect } from "react";
import { Button, Spinner } from "../../../components";
import { ServiceItem, NewServiceItem } from "./sub-components";
import { BarberHomeContext, BarberHomeProvider } from "./barber-home-context";
import "./barber-home-styles.css";

const BarberHomePage = () => {
  const {
    state,
    findServices,
    handleNewServiceChange,
    onDelete,
    onLogOut,
    onSave,
  } = useContext(BarberHomeContext);

  useEffect(() => {
    findServices();
  }, [findServices]);

  return (
    <div className="home-page-container">
      <header>
        <h1>✂ Barber Book</h1>
        <Button color="error" onClick={onLogOut}>
          LOGOUT
        </Button>
      </header>

      <ul>
        <NewServiceItem
          isLoading={state.isLoading}
          price={state.newService.price}
          description={state.newService.description}
          image={state.newService.image}
          estimatedTime={state.newService.estimatedTime}
          handleChange={handleNewServiceChange}
          onSave={onSave}
        />
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
  <BarberHomeProvider>
    <BarberHomePage />
  </BarberHomeProvider>
);

export default Page;
