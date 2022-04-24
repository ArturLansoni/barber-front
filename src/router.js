import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import {
  ApplicationContext,
  ApplicationProvider,
} from "./context/application-context";
import {
  BarberHomePage,
  LoginPage,
  SignUpPage,
  ClientHomePage,
  NewServicePage,
} from "./pages";
import theme from "./styles/theme";

const Routes = () => {
  const { userType } = useContext(ApplicationContext);

  const barberRoutes = true ? (
    <>
      <Route exact path="/" component={() => <BarberHomePage />} />
      <Route exact path="/new-service" component={() => <NewServicePage />} />
    </>
  ) : (
    <></>
  );

  const clientRoutes =
    userType === "CLIENT" ? (
      <>
        <Route exact path="/" component={() => <ClientHomePage />} />
      </>
    ) : (
      <></>
    );

  return (
    <Switch>
      {barberRoutes}
      {clientRoutes}
      <Route exact path="/login" component={() => <LoginPage />} />
      <Route exact path="/sign-up" component={() => <SignUpPage />} />
    </Switch>
  );
};

const Router = () => (
  <>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ApplicationProvider>
          <Routes />
        </ApplicationProvider>
      </ThemeProvider>
    </BrowserRouter>
  </>
);

export default Router;
