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
  ClientCheckoutPage,
  ClientSchedulePage,
  ClientScheduleDetailPage,
  BarberSchedulePage,
  BarberScheduleDetailPage,
} from "./pages";
import theme from "./styles/theme";
import { Layout } from "./components";

const Router = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <ApplicationProvider>
        <Switch>
          <Layout>
            <Route exact path="/login" component={() => <LoginPage />} />
            <Route exact path="/sign-up" component={() => <SignUpPage />} />
            {/* Barber routes */}
            <Route exact path="/barber" component={() => <BarberHomePage />} />
            <Route
              exact
              path="/barber/new-service"
              component={() => <NewServicePage />}
            />
            <Route
              exact
              path="/barber/schedule"
              component={() => <BarberSchedulePage />}
            />
            <Route
              exact
              path="/barber/schedule/detail/:scheduleId"
              component={() => <BarberScheduleDetailPage />}
            />
            {/* Client routes */}
            <Route exact path="/client" component={() => <ClientHomePage />} />
            <Route
              exact
              path="/client/offers/:barberId"
              component={() => <ClientCheckoutPage />}
            />
            <Route
              exact
              path="/client/schedule"
              component={() => <ClientSchedulePage />}
            />
            <Route
              path="/client/schedule/detail/:scheduleId"
              component={() => <ClientScheduleDetailPage />}
            />
          </Layout>
        </Switch>
      </ApplicationProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default Router;
