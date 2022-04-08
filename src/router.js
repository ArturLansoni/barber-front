import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { ApplicationProvider } from "./context/application-context";
import { HomePage, LoginPage, SignUpPage } from "./pages";
import theme from "./styles/theme";

const Router = () => (
  <>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ApplicationProvider>
          <Switch>
            <Route exact path="/" component={() => <HomePage />} />
            <Route exact path="/login" component={() => <LoginPage />} />
            <Route exact path="/sign-up" component={() => <SignUpPage />} />
          </Switch>
        </ApplicationProvider>
      </ThemeProvider>
    </BrowserRouter>
  </>
);

export default Router;
