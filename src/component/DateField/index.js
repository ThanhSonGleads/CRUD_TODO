import { TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { debounce, now } from "lodash";
import React from "react";
import { Controller } from "react-hook-form";

export default function DateField({
  form,
  label,
  minDate,
  maxDate,
  name,
  onChange,
  debounceTime = 0,
}) {
  const callDebounce = debounce((e) => {
    onChange(e);
  }, debounceTime);

  return (
    <Controller
      name={name}
      control={form.control}
      render={({
        field,
        fieldState: { invalid, isTouched, isDirty, error },
      }) => {
        return (
          <DesktopDatePicker
            views={["year", "month"]}
            minDate={minDate}
            maxDate={maxDate}
            label={label}
            value={field.value}
            inputFormat="MM/yyyy"
            onChange={(e) => {
              field.onChange(e);
              onChange && callDebounce(e);
            }}
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
