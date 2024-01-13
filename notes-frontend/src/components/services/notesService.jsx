import axios from "axios";
const baseUrl = "http://localhost:8081";

const getAllNotes = () => {
  return axios.get(baseUrl + "/notes");
};

const postNote = (note) => {
  return axios.post(baseUrl + "/notes", note);
};

export default {
  getAllNotes,
  postNote,
};
