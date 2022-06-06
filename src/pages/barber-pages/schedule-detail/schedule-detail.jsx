import { Box, Chip, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, DialogConfirmation, Image } from "../../../components";
import {
  BarberScheduleDetailProvider,
  useBarberScheduleDetail,
} from "./schedule-detail-context";
import "./schedule-detail-styles.css";

const BarberScheduleDetailPage = () => {
  const { scheduleId } = useParams();
  const {
    findBarberScheduleDetail,
    toggleRefuseDialog,
    toggleConfirmDialog,
    submitConfirmDialog,
    submitRefuseDialog,
    schedule,
    isLoading,
    isConfirmDialogOpen,
    isRefuseDialogOpen,
  } = useBarberScheduleDetail();

  useEffect(() => {
    findBarberScheduleDetail(scheduleId);
  }, [findBarberScheduleDetail, scheduleId]);

  return (
    <Box
      sx={{
        marginX: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        paddingTop: "80px",
      }}
    >
      <DialogConfirmation
        isOpen={isRefuseDialogOpen}
        onClose={toggleRefuseDialog}
        onSubmit={submitRefuseDialog}
        type="ERROR"
        title="Recusar agendamento"
        description={`Realmente deseja recusar o agendamento com “${schedule.clientName}”?`}
      />
      <DialogConfirmation
        isOpen={isConfirmDialogOpen}
        onClose={toggleConfirmDialog}
        onSubmit={submitConfirmDialog}
        title="Confirmar agendamento"
        description={`Realmente deseja confirmar o agendamento com “${schedule.clientName}”?`}
      />
      <Image
        src={schedule.clientImage}
        alt="Client"
        style={{
          height: 120,
          width: 120,
          marginTop: -64,
          borderRadius: 12,
        }}
      />
      <Typography
        variant="h6"
        style={{ marginLeft: 150, marginTop: -46, marginBottom: "48px" }}
      >
        {schedule.clientName}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography>Servicos</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: "12px",
          }}
        >
          {schedule.offers.map((service, index) => (
            <Chip key={index} label={service} />
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography>Dia</Typography>
        <Chip label={schedule.day} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography>Horario</Typography>
        <Chip label={schedule.hour} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography>Valor total</Typography>
        <Typography>{schedule.finalPrice}</Typography>
      </Box>
      {schedule.isAccepted === null && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "12px",
            marginTop: "52px",
          }}
        >
          <Button
            color="error"
            fullWidth
            onClick={toggleRefuseDialog}
            isLoading={isLoading}
          >
            Recusar
          </Button>
          <Button fullWidth onClick={toggleConfirmDialog} isLoading={isLoading}>
            Confirmar
          </Button>
        </Box>
      )}
      {schedule.isAccepted && (
        <Chip
          label="Confirmado"
          color="success"
          sx={{ fontWeight: "bold", fontSize: 14, marginTop: 2 }}
        />
      )}
      {schedule.isAccepted === false && (
        <Chip
          label="Recusado"
          color="error"
          sx={{ fontWeight: "bold", fontSize: 14, marginTop: 2 }}
        />
      )}
    </Box>
  );
};

const Page = () => (
  <BarberScheduleDetailProvider>
    <BarberScheduleDetailPage />
  </BarberScheduleDetailProvider>
);

export default Page;
