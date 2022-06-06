import { Box, Chip, Typography } from "@mui/material";
import { Done as DoneIcon } from "@mui/icons-material";
import React from "react";

export const ScheduleOptionsStep = ({
  days = [],
  hours = [],
  onSelectDay,
  onSelectHour,
}) => (
  <Box sx={{ marginX: "32px" }}>
    <Typography>Dia</Typography>
    <Box
      sx={{
        gap: "12px",
        display: "flex",
        flexWrap: "wrap",
        marginBottom: "24px",
      }}
    >
      {days.map((day) => (
        <Chip
          key={day.key}
          sx={{ flex: 1 }}
          label={day.label}
          onClick={() => onSelectDay(day.key)}
          icon={day.isSelected ? <DoneIcon /> : null}
          variant={day.isSelected ? "" : "outlined"}
        />
      ))}
    </Box>
    <Typography>Horário</Typography>
    <Box
      sx={{
        gap: "12px",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {hours.map((hour) => (
        <Chip
          key={hour.key}
          sx={{ flex: 1 }}
          label={hour.label}
          onClick={() => onSelectHour(hour.key)}
          icon={hour.isSelected ? <DoneIcon /> : null}
          variant={hour.isSelected ? "" : "outlined"}
        />
      ))}
    </Box>
  </Box>
);
