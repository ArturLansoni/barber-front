import { Chip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CardItem, Spinner } from "../../../components";
import { BarberScheduleProvider, useBarberSchedule } from "./schedule-context";
import "./schedule-styles.css";

const BarberSchedulePage = () => {
  const history = useHistory();
  const { findBarberSchedules, schedules, isLoading } = useBarberSchedule();

  useEffect(() => {
    findBarberSchedules();
  }, [findBarberSchedules]);

  return (
    <div className="barber-schedule-page-container">
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: "48px",
          paddingLeft: "32px",
        }}
      >
        <Typography variant="h4">Agendamentos</Typography>
      </Box>
      <Box sx={{ gap: "12px", display: "flex", flexDirection: "column" }}>
        {schedules.map((item) => (
          <Box sx={{ position: "relative" }} key={item._id}>
            <CardItem
              key={item._id}
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
              onPress={() =>
                history.push(`/barber/schedule/detail/${item._id}`)
              }
            />
            {item.isAccepted && (
              <Chip
                label="Confirmado"
                color="success"
                sx={{ position: "absolute", right: 55, bottom: 4 }}
              />
            )}
            {item.isAccepted === false && (
              <Chip
                label="Recusado"
                color="error"
                sx={{ position: "absolute", right: 55, bottom: 4 }}
              />
            )}
          </Box>
        ))}
      </Box>
      {isLoading && (
        <Typography textAlign="center" sx={{ paddingTop: 4 }}>
          <Spinner /> Buscando agendamentos...
        </Typography>
      )}
      {schedules.length === 0 && !isLoading && (
        <Typography textAlign="center" sx={{ paddingTop: 4 }}>
          Nenhum agendamento foi encontrado
        </Typography>
      )}
    </div>
  );
};

const Page = () => (
  <BarberScheduleProvider>
    <BarberSchedulePage />
  </BarberScheduleProvider>
);

export default Page;
