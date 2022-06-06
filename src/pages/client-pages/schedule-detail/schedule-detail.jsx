import { Box, Chip, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Image } from "../../../components";
import BACKGROUND from "../../../assets/barber-background.jpg";
import {
  ClientScheduleDetailProvider,
  useClientScheduleDetail,
} from "./schedule-detail-context";
import "./schedule-detail-styles.css";

const ClientScheduleDetailPage = () => {
  const { scheduleId } = useParams();
  const { findClientScheduleDetail, schedule } = useClientScheduleDetail();

  useEffect(() => {
    findClientScheduleDetail(scheduleId);
  }, [findClientScheduleDetail, scheduleId]);

  return (
    <Box sx={{ position: "relative" }}>
      <Image
        src={BACKGROUND}
        alt="Barber cover"
        style={{
          position: "absolute",
          width: "100%",
          height: "20%",
          maxHeight: 180,
          marginTop: -20,
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          marginX: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          paddingTop: "80px",
        }}
      >
        <Image
          src={schedule.clientImage}
          alt="Client"
          style={{
            zIndex: 2,
            height: 120,
            width: 120,
            marginTop: -64,
            borderRadius: 12,
          }}
        />
        <Typography variant="h6" style={{ marginLeft: 150, marginTop: -46 }}>
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
        {!schedule.isAccepted && schedule.isAccepted !== false && (
          <Chip
            label="Aguardando confirmação"
            color="default"
            sx={{ fontWeight: "bold", fontSize: 14, marginTop: 2 }}
          />
        )}
      </Box>
    </Box>
  );
};

const Page = () => (
  <ClientScheduleDetailProvider>
    <ClientScheduleDetailPage />
  </ClientScheduleDetailProvider>
);

export default Page;
