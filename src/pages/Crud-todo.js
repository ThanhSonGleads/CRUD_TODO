import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { Box } from "@mui/system";
import {
  create_product,
  delete_product,
  filter_product,
  get_product,
  get_product_pagination,
  order_detail,
  product_params,
  search_product,
  search_sort_product,
  sort_product,
  update_product,
} from "../redux/action/product";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import {
  CREATE_PRODUCT,
  DOMAIN,
  ORDER_PRODUCT,
  SEARCH_PRODUCT,
  SET_UPDATE,
  SORT_PRODUCT,
  UPDATE_PRODUCT,
} from "../redux/constant";
import { createAction } from "../redux/action/createAction";
import InputField from "../component/InputField";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import Loading from "../component/Loading";
import Modal from "../component/Modal";
import Selected from "../component/Selected";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CrudTodo() {
  /*Luu url params khi F5 van giu nguyen data */

  const sortOptions = [
    "title",
    "status",
    "description",
    "start_date",
    "end_date",
  ];
  const filterStatus = ["Processing", "Done"];

  const form = useForm({
    defaultValues: {
      keyword: null,
    },
  });

  const [loading, setLoading] = useState(false);
  const dataSignin = localStorage.getItem("login");
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [sortValue, setSortValue] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [dataLength, setDataLength] = useState([]);
  const data = useSelector((state) => state.reducers.data_product);

  /*Search Params */
  const [searchParams, setSearchParams] = useSearchParams();

  /*Effect SetSearchParams */
  useEffect(() => {
    if (keyword.length === 0) {
      searchParams.delete("keyword");
      setSearchParams(searchParams, { replace: true });
    }
    if (sortValue === "") {
      searchParams.delete("_sort");
      searchParams.delete("_order");
      setSearchParams(searchParams, { replace: true });
    }
    if (statusValue === "") {
      searchParams.delete("status");
      setSearchParams(searchParams, { replace: true });
    }
  }, [keyword, sortValue, statusValue, searchParams]);

  /* Effect Get All Products */
  useEffect(() => {
    getProduct();
  }, []);

  /*Effect Get Products Pagination */
  useEffect(() => {
    dispatch(get_product_pagination(page, limit));
  }, [dispatch]);

  /* Effect Loading Page */
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  /* Effect Check Login Redirect */
  useEffect(() => {
    if (!dataSignin) {
      navigator("/signin");
      Swal.fire({
        title: "",
        html: `<span style="color:red">Please Login</span>`,
        icon: "error",
        confirmButtonText: "Xác Nhận",
      });
    }
  }, [dataSignin]);

  /* Effect Update Form */
  useEffect(() => {
    form.reset({
      keyword: form.keyword,
    });
  }, [form]);

  const getProduct = async () => {
    let data = await axios.get(`${DOMAIN}/Products`);
    setDataLength(data.data.length);
  };

  const handleChangePage = (e, newPage) => {
    console.log("newPage", newPage);
    setPage(newPage);
    if ((sortValue || keyword || statusValue) == "") {
      setSearchParams({
        page: newPage,
        limit: limit,
      });
      dispatch(get_product_pagination(newPage, limit));
    } else if ((sortValue || keyword) == "") {
      setSearchParams({
        status: statusValue,
        page: newPage,
        limit: limit,
      });
      dispatch(filter_product(statusValue, newPage, limit));
    } else if ((statusValue || keyword) == "") {
      setSearchParams({
        _sort: sortValue,
        _order: "asc",
        page: newPage,
        limit: limit,
      });
      dispatch(sort_product(sortValue, newPage, limit));
    } else if ((sortValue || statusValue) == "") {
      setSearchParams({
        keyword: keyword,
        page: newPage,
        limit: limit,
      });
      dispatch(search_product(keyword, newPage, limit));
    } else if (statusValue === "") {
      setSearchParams({
        keyword: keyword,
        _sort: sortValue,
        _order: "asc",
        page: newPage,
        limit: limit,
      });
      dispatch(search_sort_product(keyword, sortValue, newPage, limit));
    } else {
      setSearchParams({
        keyword: keyword,
        _sort: sortValue,
        _order: "asc",
        status: statusValue,
        page: newPage,
        limit: limit,
      });
      dispatch(product_params(keyword, sortValue, statusValue, newPage, limit));
    }
  };

  const handleDelete = (id, page, limit) => {
    dispatch(delete_product(id, page, limit));
  };

  const handleUpdate = async (id) => {
    let dataUpdate = await axios.get(`${DOMAIN}/Products/${id}`);
    dispatch(createAction(UPDATE_PRODUCT, true));
    dispatch(createAction(SET_UPDATE, dataUpdate.data));
  };

  const handleOrder = async (id) => {
    navigator(`/crud-todo/tree-todo`);
    //dispatch(order_detail(id));
  };

  const handleCreate = () => {
    dispatch(createAction(CREATE_PRODUCT, true));
    dispatch(createAction(SET_UPDATE, []));
  };

  const handleSearch = () => {
    setLoadingSearch(true);
    if (statusValue === "") {
      setSearchParams({
        keyword: keyword,
        _sort: sortValue,
        _order: "asc",
        page: page,
        limit: limit,
      });
      dispatch(search_sort_product(keyword, sortValue, page, limit));
    } else if (sortValue === "" && statusValue === "") {
      setSearchParams({
        keyword: keyword,
        page: page,
        limit: limit,
      });
      dispatch(search_product(keyword, page, limit));
    } else {
      setSearchParams({
        keyword: keyword,
        _sort: sortValue,
        _order: "asc",
        status: statusValue,
        page: page,
        limit: limit,
      });
      dispatch(product_params(keyword, sortValue, statusValue, page, limit));
    }
    setLoadingSearch(false);
  };

  const handleReset = () => {
    window.location.reload();
  };

  const handleSort = (e) => {
    let valueSort = e.target.value;
    setSortValue(valueSort);
    if (statusValue === "" && keyword === "") {
      setSearchParams({
        _sort: valueSort,
        _order: "asc",
        page: page,
        limit: limit,
      });
      dispatch(sort_product(valueSort, page, limit));
    } else if (statusValue === "") {
      setSearchParams({
        keyword: keyword,
        _sort: valueSort,
        _order: "asc",
        page: page,
        limit: limit,
      });
      dispatch(search_sort_product(keyword, valueSort, page, limit));
    } else {
      setSearchParams({
        keyword: keyword,
        _sort: valueSort,
        _order: "asc",
        status: statusValue,
        page: page,
        limit: limit,
      });
      dispatch(product_params(keyword, valueSort, statusValue, page, limit));
    }
  };

  const handleFilterStatus = (e) => {
    let valueFilter = e.target.value;
    setStatusValue(valueFilter);
    if (sortValue === "" && keyword === "") {
      setSearchParams({
        status: valueFilter,
        page: page,
        limit: limit,
      });
      dispatch(filter_product(valueFilter, page, limit));
    } else {
      setSearchParams({
        keyword: keyword,
        _sort: sortValue,
        _order: "asc",
        status: valueFilter,
        page: page,
        limit: limit,
      });
      dispatch(product_params(keyword, sortValue, valueFilter, page, limit));
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("login");
    navigator("/signin");
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box
          sx={{
            background: "#CFD2CF",
            width: "80%",
            height: "45rem",
            margin: "auto",
            mt: "9%",
            mb: "2%",
            borderRadius: "20px",
          }}
        >
          <Box sx={{ width: "70%", margin: "auto" }}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <Grid
                item
                xs={12}
                sm={12}
                display={"flex"}
                alignItems={"center"}
                width={"100%"}
                justifyContent={"space-between"}
              >
                <Box>
                  <Typography variant={"h6"}>CRUD</Typography>
                </Box>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  width={"50%"}
                  justifyContent={"space-between"}
                >
                  <InputField
                    name={"keyword"}
                    form={form}
                    label={"Search"}
                    size="small"
                    sx={{ mb: 2, mr: 2 }}
                    flexShrink={0}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <LoadingButton
                    size="small"
                    color="primary"
                    type="button"
                    variant="contained"
                    loading={loadingSearch}
                    flexShrink={0}
                    onClick={() => handleSearch()}
                  >
                    Search
                  </LoadingButton>
                  <LoadingButton
                    size="small"
                    color="success"
                    type="button"
                    variant="contained"
                    flexShrink={0}
                    sx={{ ml: 2 }}
                    onClick={() => handleReset()}
                  >
                    Reset
                  </LoadingButton>
                </Box>
                <LoadingButton
                  size="small"
                  color="primary"
                  type="button"
                  variant="contained"
                  loading={loadingLogout}
                  onClick={() => handleLogOut()}
                >
                  LogOut
                </LoadingButton>
              </Grid>
            </form>
            <Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <FormControl variant="standard" sx={{ width: "20%" }}>
                  <InputLabel id="filter-status-label">
                    Filter-Status
                  </InputLabel>
                  <Selected
                    labelId="filter-status-label"
                    id="filter-status"
                    value={statusValue}
                    variant="standard"
                    label="Filter"
                    onChange={handleFilterStatus}
                    options={filterStatus}
                  />
                </FormControl>
                <FormControl variant="standard" sx={{ width: "20%" }}>
                  <InputLabel id="sort-label">Sort</InputLabel>
                  <Selected
                    labelId="sort-label"
                    id="sort"
                    value={sortValue}
                    variant="standard"
                    label="Sort"
                    onChange={handleSort}
                    options={sortOptions}
                  />
                </FormControl>
              </Box>
            </Box>
          </Box>
          <TableContainer
            component={Paper}
            sx={{ width: "90%", margin: "auto", marginTop: 2, mb: "2%" }}
          >
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">ID</StyledTableCell>
                  <StyledTableCell align="left">Title</StyledTableCell>
                  <StyledTableCell align="left">Description</StyledTableCell>
                  <StyledTableCell align="left">Status</StyledTableCell>
                  <StyledTableCell align="left">Start Date</StyledTableCell>
                  <StyledTableCell align="left">End Date</StyledTableCell>
                  <StyledTableCell align="left">
                    <Box
                      display={"flex"}
                      justifyContent={"space-around"}
                      alignItems={"left"}
                    >
                      <Typography sx={{ ml: 5, mr: 2 }}>Action</Typography>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <LoadingButton
                      sx={{ mr: 2 }}
                      size="small"
                      color="primary"
                      type="button"
                      variant="contained"
                      onClick={() => handleCreate()}
                    >
                      Create
                    </LoadingButton>
                    <LoadingButton
                      size="small"
                      color="success"
                      onClick={() => handleOrder()}
                      loading={loadingOrder}
                      variant="contained"
                    >
                      Order
                    </LoadingButton>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((item) => (
                  <StyledTableRow key={item.name}>
                    <StyledTableCell component="th" scope="row">
                      {item.id}
                    </StyledTableCell>
                    <StyledTableCell align="left">{item.title}</StyledTableCell>
                    <StyledTableCell align="left">
                      {item.description}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {item.status}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {item.start_date}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {item.end_date}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Box display={"flex"}>
                        <LoadingButton
                          sx={{ mr: 2 }}
                          size="small"
                          onClick={() => handleDelete(item.id)}
                          loading={loadingDelete}
                          variant="contained"
                          color="error"
                        >
                          Delete
                        </LoadingButton>
                        <LoadingButton
                          size="small"
                          sx={{ mr: 2 }}
                          color="success"
                          onClick={() => handleUpdate(item.id)}
                          loading={loadingUpdate}
                          variant="contained"
                        >
                          Update
                        </LoadingButton>
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell align="left"></StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            <Stack
              spacing={2}
              sx={{ mt: 2, mb: 2 }}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Pagination
                count={Math.ceil(dataLength / 5)}
                page={page}
                onChange={handleChangePage}
                className="pagination"
                shape="rounded"
              />
            </Stack>
          </TableContainer>
          <Modal />
        </Box>
      )}
    </>
  );
}
