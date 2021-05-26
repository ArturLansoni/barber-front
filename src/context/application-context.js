import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAccessToken } from "../infra";
import { findCurrentBarber } from "../services/api";

export const ApplicationContext = createContext({
  barber: null,
});

export const ApplicationProvider = ({ children }) => {
  const accessToken = getAccessToken();
  const history = useHistory();

  const [state, setState] = useState({
    barber: null,
  });

  useEffect(() => {
    if (!accessToken) {
      history.push("/login");
    } else {
      if (!state.barber) {
        findBarber();
      }
    }
  }, [accessToken]);

  const findBarber = async () => {
    const barber = await findCurrentBarber();

    if (barber._id) {
      setState((old) => ({ ...old, barber }));
      if (history.location.pathname === "/login") history.push("/");
    } else {
      history.push("/login");
    }
  };

  return (
    <ApplicationContext.Provider
      value={{
        barber: state.barber,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
