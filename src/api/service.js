import axios from "axios";

const ENDPOINT = 'service_type';

export const serviceTypeApi = {
    getList: (params) => axios.get(ENDPOINT, {
        params
    }),
    get: (id) => axios.get(ENDPOINT + '/' + id),
    delete: (id) => axios.delete(ENDPOINT + '/' + id),
    update: (id, data) => axios.put(ENDPOINT + '/' + id, data),
    create: (data) => axios.post(ENDPOINT, data)
}