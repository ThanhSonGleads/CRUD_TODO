import { LoadingButton } from "@mui/lab";
import { Box, Grid } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { useForm } from "react-hook-form";
import InputField from "../component/InputField";

export default function MUI() {
  const form = useForm({
    defaultValues: {
      start_date: null,
    },
  });
  useEffect(() => {
    form.reset({
      start_date: form.start_date,
    });
  }, [form]);

  const handleChange = (e) => {
    console.log("values", e.target.value);
  };
  return (
    <div>
        <Box sx={{ width: "30%" }}>
          <Grid item xs={6} sm={6}>
            <InputField
              debounceTime={3000}
              onChange={handleChange}
              name={"start_date"}
              form={form}
              label={"Start Date"}
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Box>
    </div>
  );
}
