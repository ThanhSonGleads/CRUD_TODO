import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CREATE_PRODUCT, UPDATE_PRODUCT } from "../../redux/constant";
import { createAction } from "../../redux/action/createAction";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
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
import { dateFormat } from "../../helper/dateformat";
import SelectField from "../SelectField";
import DateField from "../DateField";

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

export default function Modal() {
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

  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const isCreates = useSelector((state) => state.reducers.isCreate);
  const isUpdate = useSelector((state) => state.reducers.isUpdate);
  const data = useSelector((state) => state.reducers.data_update);

  const dispatch = useDispatch();

  console.log("dataUpdate", data);

  /*Effect Update Form Create Or Update */
  useEffect(() => {
    form.reset({
      id: data.id,
      title: data.title,
      status: data.status,
      description: data.description,
      start_date: data.start_date || dateFormat,
      end_date: data.end_date || "",
    });
  }, [form, data, dateFormat]);

  const handleClose = () => {
    if (isCreates) {
      dispatch(createAction(CREATE_PRODUCT, false));
    } else {
      dispatch(createAction(UPDATE_PRODUCT, false));
    }
  };

  const onSubmit = (values) => {
    console.log("values", values);
    if (isCreates) {
      dispatch(create_product(values, page, limit));
    } else if (isUpdate) {
      dispatch(update_product(values, page, limit));
    }
  };

  return (
    <div>
      <Dialog
        open={isCreates || isUpdate}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {isCreates ? "Create Product" : "Update Product"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 3 }}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Box>
                <Grid container spacing={2}>
                  {isUpdate ? (
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
                  ) : (
                    ""
                  )}
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
                      value={data.status}
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
                  <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack spacing={3}>
                        <DateField
                          name={"end_date"}
                          form={form}
                          label={"End Date"}
                          minDate={now()}
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
                  {isCreates ? "Create" : "Update"}
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
