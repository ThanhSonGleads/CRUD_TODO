import { TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { now } from "lodash";
import React from "react";
import { Controller } from "react-hook-form";

export default function DateField({ form, label, minDate, maxDate, name}) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({
        field: { onChange, value },
        fieldState: { invalid, isTouched, isDirty, error },
      }) => {
        return (
          <DesktopDatePicker
            minDate={minDate}
            maxDate={maxDate}
            label={label}
            value={value}
            inputFormat="MM/dd/yyyy"
            onChange={onChange}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                error={invalid}
                helperText={error?.message || ""}
              />
            )}
          />
        );
      }}
    />
  );
}
