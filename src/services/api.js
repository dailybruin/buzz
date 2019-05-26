import axios from "axios";
import config from "../config";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const API_URL = config.SERVER_URL + "/api";

const get = url => (axios.get(url, { withCredentials: true}));

export const postDesignNote = (date, data) => (axios.post(`${API_URL}/designNotes/${date}`, data).then(res => ({ data: res.data, status: res.status })));

export const getDesignNotes = date => (get(`${API_URL}/designNotes/${date}`).then(res => res.data));

export const getModulars = (category, date) => (get(`${API_URL}/modular/${category}/${date}`).then(res => res.data));

export const postModular = (category, date, fields) => (axios.post(`${API_URL}/modular/${category}/${date}`, { fields }).then(res => ({ data: res.data, status: res.status})));