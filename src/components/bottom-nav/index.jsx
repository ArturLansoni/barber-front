import React, { useState } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import {
  Schedule as ScheduleIcon,
  ContentCut as ContentCutIcon,
} from "@mui/icons-material";
import { useApp } from "../../context/application-context";
import { useHistory } from "react-router-dom";

export function BottomNav() {
  const history = useHistory();
  const { userType } = useApp();
  const [page, setPage] = useState(
    history?.location.pathname.includes("schedule") ? "schedule" : "home"
  );

  const handleChange = (_, value) => {
    setPage(value);

    if (value === "home") {
      if (userType === "BARBER") {
        history.push("/barber");
      } else {
        history.push("/client");
      }
    } else if (value === "schedule") {
      if (userType === "BARBER") {
        history.push("/barber/schedule");
      } else {
        history.push("/client/schedule");
      }
    }
  };

  if (["/login", "/sign-up"].includes(history.location.pathname)) return <></>;

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        sx={{ height: "80px" }}
        value={page}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label={userType === "BARBER" ? "Servicos" : "Barbearias"}
          value="home"
          icon={<ContentCutIcon />}
        />
        <BottomNavigationAction
          label="Agendamentos"
          value="schedule"
          icon={<ScheduleIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}
