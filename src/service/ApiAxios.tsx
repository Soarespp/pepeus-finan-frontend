import axios from "axios";

const URL_LOCAL = "http://localhost:8000";

const ApiAxios = axios.create({ baseURL: URL_LOCAL });

export default ApiAxios;
