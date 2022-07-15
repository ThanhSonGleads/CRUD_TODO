import axios from "axios";
const host = "http://192.168.1.212:8080/api";

const access_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTc4NTAxNTcsImV4cCI6MTY1Nzg3MTc1NywiZGF0YSI6IjM4NTQwNTMzODQxNzEzNmRmOTdkMmJhNjU2YWRjZDhkIn0._xCIH_8d1D457DHtJBxmjxJw_LNC3nFd7kqr-e2xLSg";

export const targetApi = {
  getTargetContact: (time_from, time_to) =>
    axios.get(
      `${host}/statistic/admin?filter={"created_time_from": "${time_from}", "created_time_to": "${time_to}", "target_type_id":1 }`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    ),
  getTargetCompany: (time_from, time_to) =>
    axios.get(
      `${host}/statistic/admin?filter={"created_time_from": "${time_from}", "created_time_to": "${time_to}", "target_type_id":2 }`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    ),
};
