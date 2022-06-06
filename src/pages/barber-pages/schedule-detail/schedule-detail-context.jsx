import React, { createContext, useCallback, useContext, useState } from "react";
import { useApp } from "../../../context/application-context";
import { getDayFromDate, getHourFromDate } from "../../../infra";
import {
  findScheduleDetail as findScheduleDetailApi,
  updateSchedule as updateScheduleApi,
} from "../../../services/api";

const BarberScheduleDetailContext = createContext({
  isLoading: false,
  schedule: {
    offers: [],
    day: "",
    hour: "",
    finalPrice: "",
  },
  isRefuseDialogOpen: false,
  isConfirmDialogOpen: false,
  findBarberScheduleDetail: () => {},
  toggleRefuseDialog: () => {},
  toggleConfirmDialog: () => {},
  submitConfirmDialog: () => {},
  submitRefuseDialog: () => {},
});

const BarberScheduleDetailProvider = ({ children }) => {
  const { user } = useApp();
  const [state, setState] = useState({
    isLoading: false,
    schedule: {
      offers: [],
      day: "",
      hour: "",
      finalPrice: "",
    },
    isRefuseDialogOpen: false,
    isConfirmDialogOpen: false,
  });

  const findBarberScheduleDetail = useCallback(
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
            _id: response._id,
            isAccepted: response.isAccepted,
            clientName: response.clientId.find((client) => client.name).name,
            clientImage: response.clientId.find((client) => client.image).image,
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

  const toggleRefuseDialog = async () =>
    setState((old) => ({
      ...old,
      isRefuseDialogOpen: !old.isRefuseDialogOpen,
    }));

  const toggleConfirmDialog = async () =>
    setState((old) => ({
      ...old,
      isConfirmDialogOpen: !old.isConfirmDialogOpen,
    }));

  const submitRefuseDialog = async () => {
    setState((old) => ({ ...old, isLoading: true }));
    await updateScheduleApi(state.schedule._id, {
      isAccepted: false,
    });
    await findBarberScheduleDetail(state.schedule._id);
    toggleRefuseDialog();
    setState((old) => ({ ...old, isLoading: false }));
  };

  const submitConfirmDialog = async () => {
    setState((old) => ({ ...old, isLoading: true }));
    await updateScheduleApi(state.schedule._id, {
      isAccepted: true,
    });
    await findBarberScheduleDetail(state.schedule._id);
    toggleConfirmDialog();
    setState((old) => ({ ...old, isLoading: false }));
  };

  return (
    <BarberScheduleDetailContext.Provider
      value={{
        ...state,
        findBarberScheduleDetail,
        toggleRefuseDialog,
        toggleConfirmDialog,
        submitConfirmDialog,
        submitRefuseDialog,
      }}
    >
      {children}
    </BarberScheduleDetailContext.Provider>
  );
};

function useBarberScheduleDetail() {
  const context = useContext(BarberScheduleDetailContext);
  if (!context) {
    throw new Error(
      "useBarberScheduleDetail must be used within an BarberScheduleDetailProvider."
    );
  }

  return context;
}

export { BarberScheduleDetailProvider, useBarberScheduleDetail };
