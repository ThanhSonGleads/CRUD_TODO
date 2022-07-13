import React from "react";
import { MenuItem, Select } from "@mui/material";
export default function Selected({ labelId, id, value, label, onChange, options = [],  }) {
  return (
    <Select
      labelId={labelId}
      id={id}
      value={value}
      variant="standard"
      label={label}
      onChange={onChange}
    >
      {options?.map((item, index) => {
        return (
          <MenuItem value={item} key={index}>
            {item}
          </MenuItem>
        );
      })}
    </Select>
  );
}
