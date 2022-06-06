const weekdays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sabado",
];
const pad = (value) => `${value}`.padStart(2, "0");

export const getDayFromDate = (timestamp) => {
  const date = new Date(timestamp);
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const weekday = weekdays[date.getDay()];

  return `${day}/${month} ${weekday}`;
};

export const getHourFromDate = (timestamp) => {
  const date = new Date(timestamp);
  const initialHour = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  let finalHour = "";
  if (initialHour.includes(":30")) {
    finalHour = `${pad(date.getHours() + 1)}:00`;
  } else {
    finalHour = `${pad(date.getHours())}:${pad(date.getMinutes() + 30)}`;
  }

  return `${initialHour} - ${finalHour}`;
};

export const getDescriptionFromDate = (timestamp) => {
  const day = getDayFromDate(timestamp);
  const hour = getHourFromDate(timestamp);
  return `${day} ${hour}`;
};
