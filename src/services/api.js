import axios from "axios";
import config from "../config";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const API_URL = config.SERVER_URL + "/api";

const get = url => (axios.get(url, { withCredentials: true}));
const fn_delete = url => (axios.delete(url, { withCredentials: true }));

export const postDesignNote = (date, data) => (axios.post(`${API_URL}/designNotes/${date}`, data).then(res => ({ data: res.data, status: res.status })));

export const getDesignNotes = date => (get(`${API_URL}/designNotes/${date}`).then(res => res.data));

export const patchDesignNote = id => data => (axios.patch(`${API_URL}/designNotes`, Object.assign(data, { "id": id })).then(res => ({ data: res.data, status: res.status })));

export const deleteDesignNote = id => (fn_delete(`${API_URL}/designNotes/${id}`).then(res => res.data));

export const getModulars = (category, date) => (get(`${API_URL}/modular/${category}/${date}`).then(res => res.data));

export const postModular = (category, date, fields) => (axios.post(`${API_URL}/modular/${category}/${date}`, { fields }).then(res => ({ data: res.data, status: res.status})));

export const patchModular = id => data => (axios.patch(`${API_URL}/modular`, Object.assign({ "fields": data }, { "id": id })).then(res => ({ data: res.data, status: res.status })));

export const deleteModular = id => (fn_delete(`${API_URL}/modular/${id}`).then(res => res.data));

export const getSchedule = section => (get(`${API_URL}/schedule/${section}`).then(res => res.data));

export const postSchedule = data => (axios.post(`${API_URL}/schedule`, data).then(res => ({ data: res.data, status: res.status })));

export const patchSchedule = data => (axios.patch(`${API_URL}/schedule`, data).then(res => ({ data: res.data, status: res.status })));

export const getStories = date => (get(`${API_URL}/story/${date}`).then(res => res.data));

export const postStory = (date, data) => (axios.post(`${API_URL}/story/${date}`, data).then(res => ({ data: res.data, status: res.status })));

export const deleteStory = id => (fn_delete(`${API_URL}/story/${id}`).then(res => res.data));

export const getStaff = () => (get(`${API_URL}/staff`).then(res => res.data));

export const getMultimedia = () => (get(`${API_URL}/staff/multimedia`).then(res => res.data));

export const postMember = data => (axios.post(`${API_URL}/staff`, data).then(res => ({ data: res.data, status: res.status })));

export const patchMember = slug => data => (axios.patch(`${API_URL}/staff/${slug}`, data).then(res => ({ data: res.data, status: res.status })));

export const deleteMember = id => (fn_delete(`${API_URL}/staff/${id}`).then(res => res.data));

export const stingMember = data => id => (axios.post(`${API_URL}/staff/${id}/sting`, { text: data }).then(res => ({ data: res.data, status: res.status })));

export const isAdmin = () => (get(`${API_URL}/isAdmin`).then(res => res.data.isAdmin));