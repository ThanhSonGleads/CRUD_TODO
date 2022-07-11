import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CREATE_PRODUCT, UPDATE_PRODUCT } from "../../redux/constant";
import { createAction } from "../../redux/action/createAction";
import { useDispatch, useSelector } from "react-redux";
import {
  Autocomplete,
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import InputField from "../InputField";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { create_product, update_product } from "../../redux/action/product";
import { now } from "lodash";
import { useState } from "react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { dateFormat } from "../../helper/dateformat";
import SelectField from "../SelectField";

const statusOptions = [{ label: "Processing" }, { label: "Done" }];

const schema = yup
  .object({
    title: yup.string().nullable().required("Please enter title"),
    status: yup.string().nullable().required("Please enter status"),
    description: yup.string().nullable().required("Please enter description"),
    start_date: yup.string().nullable().required("Please enter start date"),
    end_date: yup.string().nullable().required("Please enter end date"),
  })
  .required();

export default function UpdateProduct({ data }) {
  const form = useForm({
    defaultValues: {
      id: null,
      title: null,
      status: null,
      description: null,
      start_date: null,
      end_date: null,
    },
    resolver: yupResolver(schema),
  });

  const [valueEndDate, setValueEndDate] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const isUpdate = useSelector((state) => state.reducers.isUpdate);
  const dispatch = useDispatch();

  console.log("dataUpdate", data);

  /*Effect Update Form */
  useEffect(() => {
    form.reset({
      id: data.id,
      title: data.title,
      status: data.status,
      description: data.description,
      start_date: data.start_date,
      end_date: valueEndDate,
    });
  }, [form, data, valueEndDate]);

  const handleChangeEndDate = (newValues) => {
    setValueEndDate(newValues);
  };

  const handleClose = () => {
    dispatch(createAction(UPDATE_PRODUCT, false));
  };

  const onSubmit = (values) => {
    dispatch(update_product(values, page, limit));
  };

  return (
    <div>
      <Dialog
        open={isUpdate}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Update Product</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 3 }}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <InputField
                      disabled
                      name={"id"}
                      form={form}
                      label={"ID"}
                      size="small"
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputField
                      name={"title"}
                      form={form}
                      label={"Title"}
                      size="small"
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputField
                      name={"description"}
                      form={form}
                      label={"Description"}
                      size="small"
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <SelectField
                      name={"status"}
                      label="Select status"
                      form={form}
                      options={statusOptions}
                      multiple={false}
                      getOptionLabel={statusOptions.label}
                      disabeled={false}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputField
                      disabled
                      name={"start_date"}
                      form={form}
                      label={"Start Date"}
                      size="small"
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack spacing={3}>
                        <Controller
                          name={"end_date"}
                          control={form.control}
                          render={({
                            field: { onChange, value },
                            fieldState: { invalid, isTouched, isDirty, error },
                          }) => {
                            return (
                              <DesktopDatePicker
                                minDate={now()}
                                label="End Date"
                                value={valueEndDate}
                                inputFormat="MM/dd/yyyy"
                                onChange={handleChangeEndDate}
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
                      </Stack>
                    </LocalizationProvider>
                  </Grid>
                </Grid>
                <LoadingButton
                  type={"submit"}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Update
                </LoadingButton>
              </Box>
            </form>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
