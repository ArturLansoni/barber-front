import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAccessToken } from "../infra";

export const ApplicationContext = createContext({
  user: null,
  userType: "",
  setUser: () => {},
  setUserType: () => {},
});

export const ApplicationProvider = ({ children }) => {
  const accessToken = getAccessToken();
  const history = useHistory();

  const [state, setState] = useState({
    user: null,
    userType: "",
  });

  useEffect(() => {
    if (!accessToken) {
      history.push("/login");
    }
  }, [accessToken, history]);

  const setUser = (user) => setState((old) => ({ ...old, user }));
  const setUserType = (userType) => setState((old) => ({ ...old, userType }));

  return (
    <ApplicationContext.Provider
      value={{
        ...state.user,
        setUser,
        setUserType,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
