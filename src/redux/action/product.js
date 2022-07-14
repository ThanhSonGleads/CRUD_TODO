import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  DOMAIN,
  FILTER_PRODUCT,
  FILTER_SORT_PRODUCT,
  FILTER_STATISTIC,
  FILTER_STATUS,
  GET_PRODUCT,
  GET_PRODUCT_PAGINATION,
  ORDER_PRODUCT,
  PRODUCT_PARAMS,
  SEARCH_FILTER_PRODUCT,
  SEARCH_PRODUCT,
  SEARCH_SORT_PRODUCT,
  SORT_PRODUCT,
  TARGET_STATISTIC,
  UPDATE_PRODUCT,
} from "../constant";
import { createAction } from "./createAction";
import axios from "axios";
import Swal from "sweetalert2";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTc3NzgxMTAsImV4cCI6MTY1Nzc5OTcxMCwiZGF0YSI6IjA5OTFlN2Y4YjNlZTY1ZTFlMTcxZTNiZTA4ZThhMzI4In0.Pleyu5vQUZDX34tSHeMQ5WNpuI3cZzdES9vdQ-MfScQ";
export const get_product_pagination = (page, limit) => {
  try {
    return async (dispatch) => {
      await axios
        .get(`http://localhost:3000/Products?_page=${page}&_limit=${limit}`)
        .then((res) => {
          dispatch(createAction(GET_PRODUCT_PAGINATION, res.data));
        })
        .catch((err) => console.log(err));
    };
  } catch (err) {}
};

export const search_product = (keyword, page, limit) => {
  try {
    return async (dispatch) => {
      await axios
        .get(
          `http://localhost:3000/Products?q=${keyword}&_page=${page}&_limit=${limit}`
        )
        .then((res) => {
          dispatch(createAction(SEARCH_PRODUCT, res.data));
        })
        .catch((err) => console.log(err));
    };
  } catch (err) {}
};

export const sort_product = (valueSort, page, limit) => {
  try {
    return async (dispatch) => {
      await axios
        .get(
          `http://localhost:3000/Products?_sort=${valueSort}&_order=acs&_page=${page}&_limit=${limit}`
        )
        .then((res) => {
          dispatch(createAction(SORT_PRODUCT, res.data));
        })
        .catch((err) => console.log(err));
    };
  } catch (err) {}
};

export const filter_product = (valueFilter, page, limit) => {
  try {
    return async (dispatch) => {
      await axios
        .get(
          `http://localhost:3000/Products?status=${valueFilter}&_page=${page}&_limit=${limit}`
        )
        .then((res) => {
          dispatch(createAction(FILTER_PRODUCT, res.data));
        })
        .catch((err) => console.log(err));
    };
  } catch (err) {}
};

export const search_sort_product = (keyword, valueSort, page, limit) => {
  try {
    return async (dispatch) => {
      await axios
        .get(
          `http://localhost:3000/Products?q=${keyword}&_sort=${valueSort}&_order=acs&_page=${page}&_limit=${limit}`
        )
        .then((res) => {
          dispatch(createAction(SEARCH_SORT_PRODUCT, res.data));
        })
        .catch((err) => console.log(err));
    };
  } catch (err) {}
};

export const search_filter_product = (keyword, status, page, limit) => {
  try {
    return async (dispatch) => {
      await axios
        .get(
          `http://localhost:3000/Products?q=${keyword}&status=${status}&_page=${page}&_limit=${limit}`
        )
        .then((res) => {
          dispatch(createAction(SEARCH_FILTER_PRODUCT, res.data));
        })
        .catch((err) => console.log(err));
    };
  } catch (err) {}
};

export const filter_sort_product = (status, valueSort, page, limit) => {
  try {
    return async (dispatch) => {
      await axios
        .get(
          `http://localhost:3000/Products?status=${status}&_sort=${valueSort}&_order=acs&_page=${page}&_limit=${limit}`
        )
        .then((res) => {
          dispatch(createAction(FILTER_SORT_PRODUCT, res.data));
        })
        .catch((err) => console.log(err));
    };
  } catch (err) {}
};
export const product_params = (
  keyword,
  valueSort,
  valueFilter,
  page,
  limit
) => {
  try {
    return async (dispatch) =>
      await axios
        .get(
          `http://localhost:3000/Products?q=${keyword}&_sort=${valueSort}&_order=acs&status=${valueFilter}&_page=${page}&_limit=${limit}`
        )
        .then((res) => {
          dispatch(createAction(PRODUCT_PARAMS, res.data));
        })
        .catch((err) => {
          console.log(err);
        });
  } catch (err) {}
};

export const product_detail = (id) => {
  try {
    return async (dispatch) => {
      await axios({
        url: `${DOMAIN}/Products/${id}`,
        method: "GET",
      })
        .then((res) => {
          dispatch(createAction(ORDER_PRODUCT, res.data));
        })
        .catch((err) => {});
    };
  } catch (err) {}
};
export const delete_product = (id, page, limit) => {
  try {
    return async (dispatch) => {
      await axios({
        url: `${DOMAIN}/Products/${id}`,
        method: "DELETE",
      })
        .then((res) => {
          dispatch(createAction(DELETE_PRODUCT, true));
          Swal.fire({
            title: "",
            html: `<a  style="color: green">Delete Success</a>`,
            icon: "success",
            confirmButtonText: "Confirm",
          }).then((res) => {
            window.location.reload();
          });
          //  dispatch(get_product(page, limit));
        })
        .catch((err) => {
          alert(err);
        });
    };
  } catch (err) {}
};

export const update_product = (form, page, limit) => {
  try {
    return async (dispatch) => {
      await axios({
        url: `${DOMAIN}/Products/${form.id}`,
        method: "PUT",
        data: form,
      })
        .then((res) => {
          dispatch(createAction(UPDATE_PRODUCT, false));
          Swal.fire({
            title: "",
            html: `<a  style="color: green">Update Success</a>`,
            icon: "success",
            confirmButtonText: "Confirm",
          });
          dispatch(get_product_pagination(page, limit));
        })
        .catch((err) => {
          alert(err);
        });
    };
  } catch (err) {}
};

export const create_product = (form, page, limit) => {
  try {
    return async (dispatch) => {
      await axios({
        url: `${DOMAIN}/Products`,
        method: "POST",
        data: form,
      })
        .then((res) => {
          dispatch(createAction(CREATE_PRODUCT, false));
          Swal.fire({
            title: "",
            html: `<a  style="color: green">Create Success</a>`,
            icon: "success",
            confirmButtonText: "Confirm",
          });
          dispatch(get_product_pagination(page, limit));
        })
        .catch((err) => {
          alert(err.response.data);
        });
    };
  } catch (err) {}
};

export const filter_statistic = (time_from, time_to) => {
  try {
    return async (dispatch) => {
      await axios({
        url: `http://192.168.1.212:8080/api/statistic/admin?filter={"created_time_from": "${time_from}", "created_time_to": "${time_to}"}`,
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          dispatch(createAction(FILTER_STATISTIC, res.data));
          console.log("data statistic ", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  } catch (err) {}
};

export const target_statistic = (time_from, time_to) => {
  try {
    return async (dispatch) => {
      await axios({
        url: `http://192.168.1.212:8080/api/statistic/admin?filter={"created_time_from": "${time_from}", "created_time_to": "${time_to}", "target_type_id":1 }`,
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          dispatch(createAction(TARGET_STATISTIC, res.data.data));
          console.log("target statistic ", res.data.data);
        })
        .catch((err) => {});
    };
  } catch (err) {}
};
