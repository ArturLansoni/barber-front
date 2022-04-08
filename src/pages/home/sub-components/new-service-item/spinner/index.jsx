import React from "react";
import { PulseLoader } from "react-spinners";

export function Spinner(props) {
  return <PulseLoader size="12" {...props} />;
}
