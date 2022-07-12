import axios from "axios";
import Swal from "sweetalert2";
import { DOMAIN, SIGNIN, SIGNUP } from "../constant";
import { createAction } from "./createAction";

export const signUp = (form) => {
  try {
    return async (dispatch) => {
      await axios({
        url: `${DOMAIN}/Users`,
        method: "POST",
        data: form,
      })
        .then((res) => {
          dispatch(createAction(SIGNUP, res.data));
          Swal.fire({
            title: "",
            html: `<a  style="color: #27ae60">SignUp Successfully</a>`,
            icon: "success",
            confirmButtonText: "Confirm",
          }).then((res) => {
            setTimeout(() => {
              window.location.href = "/signin";
            }, 500);
          });
        })
        .catch((err) => {
          alert(err.response.data);
        });
    };
  } catch (err) {}
};

export const signIn = (form) => {
  try {
    return async (dispatch) => {
      await axios({
        url: `${DOMAIN}/Users`,
        method: "GET",
      })
        .then((res) => {
          const user = res.data.find(
            (item) =>
              item.username === form.username && item.password === form.password
          );
          dispatch(createAction(SIGNIN, user));
          console.log("user", user);
          if (user) {
            Swal.fire({
              title: "",
              html: `<a  style="color: #27ae60">Login Successfully</a>`,
              icon: "success",
              confirmButtonText: "Confirm",
            }).then((res) => {
              setTimeout(() => {
                window.location.href = "/crud-todo";
              }, 500);
            });

            localStorage.setItem("login", user.username);
          } else {
            Swal.fire({
              title: "",
              html: `<a  style="color: red">User Not Found</a>`,
              icon: "error",
              confirmButtonText: "Confirm",
            });
          }
        })
        .catch((err) => {
          alert(err);
        });
    };
  } catch (err) {}
};
