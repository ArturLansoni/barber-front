import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAccessToken } from "../infra";

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
    }
  }, [accessToken]);

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
