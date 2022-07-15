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
  filter_sort_product,
  get_product,
  get_product_pagination,
  order_detail,
  product_params,
  search_filter_product,
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
  const [searchParams, setSearchParams] = useSearchParams();

  /*Get Value URL Params */
  let keywordParams = searchParams.get("keyword");
  let sortParams = searchParams.get("_sort");
  let statusParams = searchParams.get("status");
  let pageParams = searchParams.get("page");
  let limitParams = searchParams.get("limit");

  /*Check Va Call API Theo URL Query Params */
  useEffect(() => {
    /*Co Keyword Params Va Khong Co Status Sort Params */
    if (keywordParams && !statusParams && !sortParams) {
      dispatch(search_product(keywordParams, pageParams, limitParams));
    }

    /*Co Status Params Va Khong Co Keyword Sort Params */
    if (statusParams && !keywordParams && !sortParams) {
      dispatch(filter_product(statusParams, pageParams, limitParams));
    }

    /*Co Sort Params Va Khong Co Keyword Status Params */
    if (sortParams && !keywordParams && !statusParams) {
      dispatch(sort_product(sortParams, pageParams, limitParams));
    }

    /*Co Status Params Va Keyword Ko Co Sort Params */
    if (statusParams && keywordParams && !sortParams) {
      dispatch(
        search_filter_product(
          keywordParams,
          statusParams,
          pageParams,
          limitParams
        )
      );
    }

    /*Co Sort Params Va Keyword Ko Co Status Params */
    if (sortParams && keywordParams && !statusParams) {
      dispatch(
        search_sort_product(keywordParams, sortParams, pageParams, limitParams)
      );
    }

    /*Co Sort Params Va Status Ko Co Keyword Params */
    if (sortParams && statusParams && !keywordParams) {
      dispatch(
        filter_sort_product(statusParams, sortParams, pageParams, limitParams)
      );
    }

    /*Co Keyword Params Sort Params Va Status Params */
    if (keywordParams && sortParams && statusParams) {
      dispatch(
        product_params(
          keywordParams,
          sortParams,
          statusParams,
          pageParams,
          limitParams
        )
      );
    }

    /*Ko Co Keyword Params Sort Params Status Params PageParams, Limit Params */
    if (
      !keywordParams &&
      !sortParams &&
      !statusParams &&
      !pageParams &&
      !limitParams
    ) {
      dispatch(get_product_pagination(page, limit));
    }

    /*Ko Co Keyword Params Sort Params Status Params Nhung Co PageParams, Limit Params */
    if (!keywordParams && !sortParams && !statusParams) {
      dispatch(get_product_pagination(pageParams, limit));
    }
  }, [
    dispatch,
    page,
    limit,
    keywordParams,
    statusParams,
    sortParams,
    pageParams,
    limitParams,
  ]);

  /* Effect Get All Products */
  useEffect(() => {
    getProduct();
  }, []);

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
    setPage(newPage);

    /*Ko Co Sort Params Nhung Co Keyword Params Va Status Params*/
    if (!sortParams) {
      setSearchParams({
        keyword: keywordParams,
        status: statusParams,
        page: newPage,
        limit: limit,
      });
    }

    /*Ko Co Status Params Nhung Co Keyword Params Va Sort Params*/
    if (!statusParams) {
      setSearchParams({
        keyword: keywordParams,
        _sort: sortParams,
        _order: "asc",
        page: newPage,
        limit: limit,
      });
    }

    /*Ko Co Sort Params Status Params Nhung Co Keyword Params*/
    if (!sortParams && !statusParams) {
      setSearchParams({
        keyword: keywordParams,
        page: newPage,
        limit: limit,
      });
    }

    /*Ko Co Keyword Params Sort Params Nhung Co Status Params */
    if (!keywordParams && !sortParams) {
      setSearchParams({
        status: statusParams,
        page: newPage,
        limit: limit,
      });
    }

    /*Ko Co Keyword Params Status Params Nhung Co Sort Params */
    if (!keywordParams && !statusParams) {
      setSearchParams({
        _sort: sortParams,
        _order: "asc",
        page: newPage,
        limit: limit,
      });
    }

    /*Ko Co Keyword Params  Nhung Co Sort Params Status Params */
    if (!keywordParams && sortParams && statusParams) {
      setSearchParams({
        status: statusParams,
        _sort: sortParams,
        _order: "asc",
        page: newPage,
        limit: limit,
      });
    }

    /* Co Keyword Params Sort Params Status Params */
    if (keywordParams && sortParams && statusParams) {
      setSearchParams({
        keyword: keywordParams,
        status: statusParams,
        _sort: sortParams,
        _order: "asc",
        page: newPage,
        limit: limit,
      });
    }

    /* Ko Co Keyword Params Sort Params Status Params */
    if (!keywordParams && !sortParams && !statusParams) {
      setSearchParams({
        page: newPage,
        limit: limit,
      });
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

    /* Ko Co Sort Params Nhung Co Status Params */
    if (!sortParams && statusParams) {
      setSearchParams({
        keyword: keyword,
        status: statusParams,
        page: page,
        limit: limit,
      });
    }

    /* Ko Co Status Params Nhung Co Sort Params */
    if (sortParams && !statusParams) {
      setSearchParams({
        keyword: keyword,
        _sort: sortParams,
        _order: "asc",
        page: page,
        limit: limit,
      });
    }

    /* Ko Co Status Params Sort Params */
    if (!sortParams && !statusParams) {
      setSearchParams({
        keyword: keyword,
        page: page,
        limit: limit,
      });
    }

    /* Co Status Params Sort Params */
    if (sortParams && statusParams) {
      setSearchParams({
        keyword: keyword,
        status: statusParams,
        _sort: sortParams,
        _order: "asc",
        page: page,
        limit: limit,
      });
    }
    setLoadingSearch(false);
  };

  const handleReset = () => {
    window.location.reload();
  };

  const handleSort = (e) => {
    let valueSort = e.target.value;
    setSortValue(valueSort);

    /* Ko Co Status Params Nhung Co Keyword Params */
    if (!statusParams && keywordParams) {
      setSearchParams({
        keyword: keywordParams,
        _sort: valueSort,
        _order: "asc",
        page: page,
        limit: limit,
      });
    }

    /* Ko Co Status Params Keyword Params */
    if (!statusParams && !keywordParams) {
      setSearchParams({
        _sort: valueSort,
        _order: "asc",
        page: page,
        limit: limit,
      });
    }

    /* Co Status Params Nhung Co Keyword Params */
    if (statusParams && !keywordParams) {
      setSearchParams({
        status: statusParams,
        _sort: valueSort,
        _order: "asc",
        page: page,
        limit: limit,
      });
    }

    /* Co Status Params Keyword Params */
    if (keywordParams && statusParams) {
      setSearchParams({
        keyword: keywordParams,
        status: statusParams,
        _sort: valueSort,
        _order: "asc",
        page: page,
        limit: limit,
      });
    }
  };

  const handleFilterStatus = (e) => {
    let valueFilter = e.target.value;
    setStatusValue(valueFilter);

    /*Ko Co Sort Params Keyword Params */
    if (!sortParams && !keywordParams) {
      setSearchParams({
        status: valueFilter,
        page: page,
        limit: limit,
      });
    }

    /*Ko Co Sort Params Nhung Co Keyword Params */
    if (!sortParams && keywordParams) {
      setSearchParams({
        keyword: keywordParams,
        status: valueFilter,
        page: page,
        limit: limit,
      });
    }

    /* Co Sort Params Nhung Ko Co Keyword Params */
    if (sortParams && !keywordParams) {
      setSearchParams({
        status: valueFilter,
        _sort: sortParams,
        _order: "asc",
        page: page,
        limit: limit,
      });
    }

    /* Co Sort Params Keyword Params */
    if (sortParams && keywordParams) {
      setSearchParams({
        keyword: keywordParams,
        status: valueFilter,
        _sort: sortParams,
        _order: "asc",
        page: page,
        limit: limit,
      });
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
                    value={statusParams}
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
                    value={sortParams}
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
                page={!pageParams ? page : pageParams}
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
