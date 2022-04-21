import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import {
  ApplicationContext,
  ApplicationProvider,
} from "./context/application-context";
import { BarberHomePage, LoginPage, SignUpPage, ClientHomePage } from "./pages";
import theme from "./styles/theme";

const Routes = () => {
  const { userType } = useContext(ApplicationContext);
  const HomePage = () =>
    userType === "BARBER" ? <BarberHomePage /> : <ClientHomePage />;

  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
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
