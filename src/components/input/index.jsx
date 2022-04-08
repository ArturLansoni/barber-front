import React, { useState } from "react";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export function Input({ children, helperText, errorText = "", ...props }) {
  const [showPassword, setShowPassword] = useState(false);

  const passwordAttributes = {
    type:
      props.type === "password"
        ? showPassword
          ? "text"
          : "password"
        : props.type,
    endAdornment:
      props.type === "password" ? (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={() => setShowPassword((old) => !old)}
            onMouseDown={(e) => e.preventDefault()}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      ) : (
        <></>
      ),
  };

  return (
    <FormControl>
      <TextField
        error={!!errorText}
        variant="outlined"
        {...props}
        InputProps={{ ...props, ...passwordAttributes }}
      >
        {children}
      </TextField>
      <FormHelperText error={!!errorText}>
        {helperText || errorText}
      </FormHelperText>
    </FormControl>
  );
}
