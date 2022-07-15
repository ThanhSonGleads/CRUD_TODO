import axios from "axios";
const host = "http://192.168.1.212:8080/api";

const access_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTc4NzI0NjMsImV4cCI6MTY1Nzg5NDA2MywiZGF0YSI6ImViYzIwMzYyODc4YzE1ZjBjYTBiYzNiMGI3OWFmNmQxIn0.LvLhU19C8JAfbEmpWG2ztgQUgkqXbo43s6ArC6neS1s";

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
