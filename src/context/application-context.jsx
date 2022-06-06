import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useHistory } from "react-router-dom";
import { clearLocalStorage, getAccessToken } from "../infra";
import { findCurrentUser } from "../services/api";

const ApplicationContext = createContext({
  user: null,
  userType: "",
  setUser: () => {},
  setUserType: () => {},
  logOut: () => {},
});

const ApplicationProvider = ({ children }) => {
  const accessToken = getAccessToken();
  const history = useHistory();

  const [state, setState] = useState({
    user: null,
    userType: "",
  });

  const validateUser = useCallback(async () => {
    if (
      ["/login", "/sign-up"].includes(history.location.pathname) &&
      !accessToken
    )
      return;

    if (!accessToken) {
      history.push("/login");
      return;
    }
    if (!state.user || !state.userType) {
      const response = await findCurrentUser();
      const { userType, ...user } = response.user;
      setUser(user);
      setUserType(userType);
    }
    if (
      state.userType === "BARBER" &&
      !history.location.pathname.includes("/barber")
    ) {
      history.push("/barber");
    }
    if (
      state.userType === "CLIENT" &&
      !history.location.pathname.includes("/client")
    ) {
      history.push("/client");
    }
  }, [history, accessToken, state]);

  useEffect(() => {
    validateUser();
  }, [validateUser]);

  const logOut = () => {
    clearLocalStorage();
    history.push("/login");
  };

  const setUser = (user) => setState((old) => ({ ...old, user }));
  const setUserType = (userType) => setState((old) => ({ ...old, userType }));

  return (
    <ApplicationContext.Provider
      value={{
        ...state,
        setUser,
        setUserType,
        logOut,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

function useApp() {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error("useApp must be used within an ApplicationProvider.");
  }

  return context;
}

export { useApp, ApplicationProvider };
