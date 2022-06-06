import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Image, Spinner } from "../../../components";
import BACKGROUND from "../../../assets/barber-background.jpg";
import { BottomNav } from "./bottom-nav";
import {
  ClientCheckoutProvider,
  useClientCheckout,
} from "./client-checkout-context";
import {
  ConfirmationStep,
  ScheduleOptionsStep,
  ServicesOfferedStep,
  SummaryStep,
} from "./steps";

const ClientCheckoutPage = () => {
  const {
    findBarberServices,
    findBarberDetails,
    toggleService,
    backStep,
    nextStep,
    onSelectDay,
    onSelectHour,
    services,
    isLoading,
    barber,
    step,
    days,
    hours,
    finalPrice,
  } = useClientCheckout();
  const { barberId } = useParams();

  useEffect(() => {
    if (barberId) {
      findBarberServices(barberId);
      findBarberDetails(barberId);
    }
  }, [barberId, findBarberDetails, findBarberServices]);

  return (
    <div className="client-home-page-container">
      <Image
        src={BACKGROUND}
        alt="Barber cover"
        style={{
          width: "100%",
          height: "20%",
          maxHeight: 180,
          marginTop: -20,
        }}
      />
      <Image
        src={barber.imageUrl}
        alt="Barber logo"
        style={{
          height: 120,
          width: 120,
          marginLeft: 32,
          marginTop: -64,
          borderRadius: 12,
        }}
      />
      <Typography variant="h6" style={{ marginLeft: 180, marginTop: -46 }}>
        {barber.name}
      </Typography>
      <Box
        sx={{
          gap: "12px",
          display: "flex",
          flexDirection: "column",
          marginTop: "48px",
        }}
      >
        {isLoading && (
          <Typography textAlign="center" sx={{ paddingTop: 4 }}>
            <Spinner /> Buscando serviços...
          </Typography>
        )}
        {services.length === 0 && !isLoading && (
          <Typography textAlign="center" sx={{ paddingTop: 4 }}>
            Nenhum serviço foi encontrado
          </Typography>
        )}
        {step === 1 && (
          <ServicesOfferedStep
            services={services}
            toggleService={toggleService}
          />
        )}
        {step === 2 && (
          <ScheduleOptionsStep
            days={days}
            hours={hours}
            onSelectDay={onSelectDay}
            onSelectHour={onSelectHour}
          />
        )}
        {step === 3 && (
          <SummaryStep
            services={services.filter((service) => service.isSelected)}
            day={days.find((day) => day.isSelected)?.label}
            hour={hours.find((hour) => hour.isSelected)?.label}
            finalPrice={finalPrice}
          />
        )}
        {step === 4 && <ConfirmationStep />}
        <BottomNav
          disableBackButton={step > 2}
          backButtonText={step === 1 ? "Descartar" : "Voltar"}
          onGoBack={backStep}
          onGoNext={nextStep}
          isLoading={isLoading}
        />
      </Box>
    </div>
  );
};

const Page = () => (
  <ClientCheckoutProvider>
    <ClientCheckoutPage />
  </ClientCheckoutProvider>
);

export default Page;
