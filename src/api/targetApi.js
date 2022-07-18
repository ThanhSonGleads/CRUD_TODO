import axios from "axios";
const host = "http://192.168.1.212:8080/api";

const access_token = localStorage.getItem('accessToken')

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
