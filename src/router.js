import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ApplicationProvider } from "./context/application-context";
import { HomePage, LoginPage } from "./pages";

const Router = () => (
  <BrowserRouter>
    <ApplicationProvider>
      <Switch>
        <Route exact path="/" component={() => <HomePage />} />
        <Route exact path="/login" component={() => <LoginPage />} />
      </Switch>
    </ApplicationProvider>
  </BrowserRouter>
);

export default Router;
