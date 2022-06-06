import React, { createContext, useCallback, useContext, useState } from "react";
import { getDescriptionFromDate } from "../../../infra";
import { findSchedules as findSchedulesApi } from "../../../services/api";

const ClientScheduleContext = createContext({
  isLoading: false,
  schedules: [],
  findClientSchedules: () => {},
});

const ClientScheduleProvider = ({ children }) => {
  const [state, setState] = useState({
    isLoading: false,
    schedules: [],
  });

  const findClientSchedules = useCallback(async () => {
    setState((old) => ({ ...old, isLoading: true }));
    const response = await findSchedulesApi();
    if (response) {
      setState((old) => ({
        ...old,
        schedules: response.map((item) => ({
          title: item.barberId.find((barber) => barber.name)?.name,
          imageUrl: item.barberId.find((barber) => barber.image)?.image,
          description: getDescriptionFromDate(item.date),
          _id: item._id,
        })),
      }));
    }
    setState((old) => ({ ...old, isLoading: false }));
  }, []);

  return (
    <ClientScheduleContext.Provider
      value={{
        ...state,
        findClientSchedules,
      }}
    >
      {children}
    </ClientScheduleContext.Provider>
  );
};

function useClientSchedule() {
  const context = useContext(ClientScheduleContext);
  if (!context) {
    throw new Error(
      "useClientSchedule must be used within an ClientScheduleProvider."
    );
  }

  return context;
}

export { ClientScheduleProvider, useClientSchedule };
