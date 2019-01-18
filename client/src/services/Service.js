//@flow
import axios from 'axios';

let service = axios.create();
service.interceptors.response.use(response => response.data);
export default service;