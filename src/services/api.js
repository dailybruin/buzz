import axios from "axios";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const SERVER_URL = "http://localhost:3000";
const API_URL = SERVER_URL + "/api";

const get = url => (axios.get(url, { withCredentials: true}));

export const newDesignNote = ({placement, slug, section, date: { year, month, day}}) => {
  const req = {
    placement, 
    slug, 
    section, 
    date: { 
      year, 
      month, 
      day
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