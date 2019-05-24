import axios from "axios";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const SERVER_URL = "http://localhost:3000";

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
    .post(`${SERVER_URL}/api/designNotes/`, req)
    .then(res => {
      return {
        data: res.data,
        status: res.status
      };
    });
};

export const getDesignNotes = () => (axios.get(`${SERVER_URL}/api/designNotes/2019-05-24`, {
  withCredentials: true
}).then(res => res.data));