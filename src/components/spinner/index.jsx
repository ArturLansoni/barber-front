import React from "react";
import { PulseLoader } from "react-spinners";
import { css } from "@emotion/react";

const override = css`
  display: flex;
  margin: 0 4px;
`;

export function Spinner(props) {
  return <PulseLoader size="12" color="#fff" css={override} {...props} />;
}
