import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  DOMAIN,
  FILTER_PRODUCT,
  FILTER_STATUS,
  GET_PRODUCT,
  GET_PRODUCT_PAGINATION,
  PRODUCT_PARAMS,
  SEARCH_PRODUCT,
  SEARCH_SORT_PRODUCT,
  SORT_PRODUCT,
  UPDATE_PRODUCT,
} from "../constant";
import { createAction } from "./createAction";
import axios from "axios";
import Swal from "sweetalert2";

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
