import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { ApplicationProvider } from "./context/application-context";
import {
  BarberHomePage,
  LoginPage,
  SignUpPage,
  ClientHomePage,
  NewServicePage,
} from "./pages";
import theme from "./styles/theme";
import { Layout } from "./components";

const Router = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <ApplicationProvider>
        <Layout>
          <Switch>
            <Route exact path="/login" component={() => <LoginPage />} />
            <Route exact path="/sign-up" component={() => <SignUpPage />} />
            <Route exact path="/barber" component={() => <BarberHomePage />} />
            <Route
              exact
              path="/barber/new-service"
              component={() => <NewServicePage />}
            />
            <Route exact path="/client" component={() => <ClientHomePage />} />
          </Switch>
        </Layout>
      </ApplicationProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default Router;
