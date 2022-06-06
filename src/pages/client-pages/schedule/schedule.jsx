import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CardItem, Spinner } from "../../../components";
import { ClientScheduleProvider, useClientSchedule } from "./schedule-context";
import "./schedule-styles.css";

const ClientSchedulePage = () => {
  const history = useHistory();
  const { findClientSchedules, schedules, isLoading } = useClientSchedule();

  useEffect(() => {
    findClientSchedules();
  }, [findClientSchedules]);

  return (
    <div className="client-schedule-page-container">
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
      <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {schedules.map((item) => (
          <CardItem
            key={item._id}
            title={item.title}
            description={item.description}
            imageUrl={item.imageUrl}
            onPress={() => history.push(`/client/schedule/detail/${item._id}`)}
          />
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
  <ClientScheduleProvider>
    <ClientSchedulePage />
  </ClientScheduleProvider>
);

export default Page;
