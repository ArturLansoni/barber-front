import React, { createContext, useCallback, useContext, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import { useApp } from "../../../context/application-context";
import {
  findBarberServices as findBarberServicesApi,
  findBarberDetails as findBarberDetailsApi,
  submitSchedule as submitScheduleApi,
} from "../../../services/api";

const initialDays = [
  "07/06 terca-feira",
  "08/06 quarta-feira",
  "09/06 quinta-feira",
  "10/06 sexta-feira",
  "11/06 sabado",
  "12/06 domingo",
  "13/06 segunda-feira",
  "14/06 terca-feira",
  "15/06 quarta-feira",
  "16/06 quinta-feira",
  "17/06 sexta-feira",
  "18/06 sabado",
  "19/06 domingo",
];

const initialHours = [
  "09:00 as 09:30",
  "09:30 as 10:00",
  "10:00 as 10:30",
  "10:30 as 11:00",
  "11:00 as 12:00",
  "13:00 as 13:30",
  "13:30 as 14:30",
  "14:00 as 14:30",
  "14:30 as 15:30",
  "15:00 as 15:30",
  "15:30 as 16:30",
  "16:00 as 16:30",
  "16:30 as 17:30",
  "17:30 as 18:00",
];

const formatServicesResponse = (rawService) => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return {
    key: rawService._id,
    offerId: rawService.offerId,
    barberId: rawService.barberId,
    isSelected: false,
    price: formatter.format(rawService.price),
    priceValue: rawService.price,
    imageUrl: rawService.image,
    title: rawService.description,
    duration: `${rawService.estimatedTime} minutos`,
  };
};

const ClientCheckoutContext = createContext({
  isLoading: false,
  services: [],
  step: 4,
  barber: {
    name: "",
    imageUrl: "",
  },
  days: [],
  hours: [],
  findBarberServices: () => {},
  findBarberDetails: () => {},
  toggleService: () => {},
  backStep: () => {},
  nextStep: () => {},
  onSelectDay: () => {},
  onSelectHour: () => {},
});

const ClientCheckoutProvider = ({ children }) => {
  const history = useHistory();
  const { user } = useApp();
  const [state, setState] = useState({
    isLoading: false,
    services: [],
    step: 1,
    finalPrice: 0,
    barber: {
      name: "",
      imageUrl: "",
    },
    days: initialDays.map((i, index) => ({
      label: i,
      key: index,
      isSelected: false,
    })),
    hours: initialHours.map((i, index) => ({
      label: i,
      key: index,
      isSelected: false,
    })),
  });

  const findBarberDetails = useCallback(async (id) => {
    setState((old) => ({ ...old, isLoading: true }));
    const response = await findBarberDetailsApi(id);
    if (response) {
      setState((old) => ({
        ...old,
        barber: { imageUrl: response.image, name: response.name },
      }));
    }
    setState((old) => ({ ...old, isLoading: false }));
  }, []);

  const findBarberServices = useCallback(async (id) => {
    setState((old) => ({ ...old, isLoading: true }));
    const response = await findBarberServicesApi(id);
    if (response) {
      setState((old) => ({
        ...old,
        services: response.map(formatServicesResponse),
      }));
    }
    setState((old) => ({ ...old, isLoading: false }));
  }, []);

  const submitSchedule = async (id) => {
    setState((old) => ({ ...old, isLoading: true }));
    const offers = state.services.filter((service) => service.isSelected);
    const [day, month] = state.days
      .find((day) => day.isSelected)
      .label.split(" ")[0]
      .split("/");
    const [hour, minutes] = state.hours
      .find((hour) => hour.isSelected)
      .label.split(" ")[0]
      .split(":");

    const currentYear = new Date().getFullYear();
    const date = new Date(
      currentYear,
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minutes),
      0,
      0
    ).getTime();

    const response = await submitScheduleApi({
      offersId: offers.map((offer) => offer.offerId),
      barberId: offers.find((offer) => offer.barberId).barberId,
      clientId: user._id,
      date,
      paymentType: "money",
      isAccepted: null,
    });

    if (response) {
      setState((old) => ({
        ...old,
        services: response.map(formatServicesResponse),
      }));
    }
    setState((old) => ({ ...old, isLoading: false }));
  };

  const toggleService = (serviceId) => {
    const services = state.services.map((item) => {
      if (item.key === serviceId)
        return { ...item, isSelected: !item.isSelected };
      return item;
    });

    setState((old) => ({ ...old, services }));
  };

  const backStep = () => {
    if (state.step === 1) {
      history.push("/client");
      return;
    }

    setState((old) => ({ ...old, step: old.step - 1 }));
  };

  const validate = () => {
    if (state.step === 1) {
      const hasSelectedServices = state.services.find(
        (service) => service.isSelected
      );
      if (!hasSelectedServices) {
        toast.error("Selecione algum serviço para prosseguir!");
        return false;
      }
      return true;
    }
    if (state.step === 2) {
      const hasSelectedHours = state.hours.find((item) => item.isSelected);
      const hasSelectedDays = state.days.find((item) => item.isSelected);

      if (!hasSelectedHours || !hasSelectedDays) {
        toast.error("Selecione o horário e dia para prosseguir!");
        return false;
      }
      return true;
    }
    return true;
  };

  const nextStep = async () => {
    const isValid = validate();
    if (!isValid) return;
    if (state.step + 1 === 3) {
      const finalPrice = state.services
        .filter((service) => service.isSelected)
        .map((service) => service.priceValue)
        .reduce((prev, curr) => prev + curr, 0);
      setState((old) => ({ ...old, finalPrice }));
    }
    if (state.step + 1 === 4) {
      await submitSchedule();
    }
    if (state.step + 1 === 5) {
      history.push("/client");
    }
    setState((old) => ({ ...old, step: old.step + 1 }));
  };

  const onSelectDay = (key) => {
    const alreadyIsSelected = state.days.find((item) => item.isSelected);
    const updatedDays = state.days.map((item) => {
      if (item.key === key)
        return {
          ...item,
          isSelected: !item.isSelected,
        };
      if (alreadyIsSelected) return { ...item, isSelected: false };
      return item;
    });

    setState((old) => ({ ...old, days: updatedDays }));
  };
  const onSelectHour = (key) => {
    const alreadyIsSelected = state.hours.find((item) => item.isSelected);
    const updatedHours = state.hours.map((item) => {
      if (item.key === key)
        return {
          ...item,
          isSelected: !item.isSelected,
        };
      if (alreadyIsSelected) return { ...item, isSelected: false };
      return item;
    });
    setState((old) => ({ ...old, hours: updatedHours }));
  };

  return (
    <ClientCheckoutContext.Provider
      value={{
        ...state,
        findBarberServices,
        findBarberDetails,
        toggleService,
        backStep,
        nextStep,
        onSelectDay,
        onSelectHour,
      }}
    >
      {children}
    </ClientCheckoutContext.Provider>
  );
};

function useClientCheckout() {
  const context = useContext(ClientCheckoutContext);
  if (!context) {
    throw new Error(
      "useClientCheckout must be used within an ClientCheckoutProvider."
    );
  }

  return context;
}

export { ClientCheckoutProvider, useClientCheckout };
