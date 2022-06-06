import React, { createContext, useCallback, useContext, useState } from "react";
import { getDescriptionFromDate } from "../../../infra";
import { findSchedules as findSchedulesApi } from "../../../services/api";

const BarberScheduleContext = createContext({
  isLoading: false,
  schedules: [],
  findBarberSchedules: () => {},
});

const BarberScheduleProvider = ({ children }) => {
  const [state, setState] = useState({
    isLoading: false,
    schedules: [],
  });

  const findBarberSchedules = useCallback(async () => {
    setState((old) => ({ ...old, isLoading: true }));
    const response = await findSchedulesApi();
    if (response) {
      setState((old) => ({
        ...old,
        schedules: response.map((item) => ({
          isAccepted: item.isAccepted,
          title: item.clientId?.[0].name,
          imageUrl: item.clientId?.[0].image,
          description: getDescriptionFromDate(item.date),
          offers: item.offersId.map((offer) => offer.description),
          _id: item._id,
        })),
      }));
    }
    setState((old) => ({ ...old, isLoading: false }));
  }, []);

  return (
    <BarberScheduleContext.Provider
      value={{
        ...state,
        findBarberSchedules,
      }}
    >
      {children}
    </BarberScheduleContext.Provider>
  );
};

function useBarberSchedule() {
  const context = useContext(BarberScheduleContext);
  if (!context) {
    throw new Error(
      "useBarberSchedule must be used within an BarberScheduleProvider."
    );
  }

  return context;
}

export { BarberScheduleProvider, useBarberSchedule };
