import React, { createContext, useCallback, useContext, useState } from "react";
import { useApp } from "../../../context/application-context";
import { getDayFromDate, getHourFromDate } from "../../../infra";
import { findScheduleDetail as findScheduleDetailApi } from "../../../services/api";

const ClientScheduleDetailContext = createContext({
  isLoading: false,
  schedule: {
    offers: [],
    day: "",
    hour: "",
    finalPrice: "",
  },
  findClientScheduleDetail: () => {},
});

const ClientScheduleDetailProvider = ({ children }) => {
  const { user } = useApp();
  const [state, setState] = useState({
    isLoading: false,
    schedule: {
      offers: [],
      day: "",
      hour: "",
      finalPrice: "",
    },
  });

  const findClientScheduleDetail = useCallback(
    async (id) => {
      if (!user?._id) return;
      setState((old) => ({ ...old, isLoading: true }));
      const formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      const [response] = await findScheduleDetailApi(id);
      if (response) {
        setState((old) => ({
          ...old,
          schedule: {
            isAccepted: response.isAccepted,
            clientName: response.barberId.find((barber) => barber.name).name,
            clientImage: response.barberId.find((barber) => barber.image).image,
            offers: response.offersId.map((offer) => offer.description),
            day: getDayFromDate(response.date),
            hour: getHourFromDate(response.date),
            finalPrice: formatter.format(
              response.offersId
                .map((service) => service.price)
                .reduce((prev, curr) => prev + curr, 0)
            ),
          },
        }));
      }
      setState((old) => ({ ...old, isLoading: false }));
    },
    [user?._id]
  );

  return (
    <ClientScheduleDetailContext.Provider
      value={{
        ...state,
        findClientScheduleDetail,
      }}
    >
      {children}
    </ClientScheduleDetailContext.Provider>
  );
};

function useClientScheduleDetail() {
  const context = useContext(ClientScheduleDetailContext);
  if (!context) {
    throw new Error(
      "useClientScheduleDetail must be used within an ClientScheduleDetailProvider."
    );
  }

  return context;
}

export { ClientScheduleDetailProvider, useClientScheduleDetail };
