import axios from "axios";
import config from "../config";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const API_URL = config.SERVER_URL + "/api";

const get = url => (axios.get(url, { withCredentials: true}));

export const newDesignNote = (section, {placement, slug}) => {
  const req = {
    placement, 
    slug, 
    section, 
    date: { 
      year: "2019", 
      month: "05", 
      day: "24"
    }
  };

  return axios
    .post(`${API_URL}/designNotes/`, req)
    .then(res => {
      return {
        data: res.data,
        status: res.status
      };
    });
};

export const getDesignNotes = () => (get(`${API_URL}/designNotes/2019-05-24`).then(res => res.data));

export const getModulars = category => (get(`${API_URL}/modular/${category}`).then(res => res.data));

export const postModular = (category, fields) => (axios.post(`${API_URL}/modular/${category}`, { fields }).then(res => ({ data: res.data, status: res.status})));