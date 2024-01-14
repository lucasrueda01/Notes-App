import axios from "axios";
import { baseUrl } from "../consts";

const getAllNotes = () => {
  return axios.get(baseUrl + "/notes");
};

const postNote = (note) => {
  return axios.post(baseUrl + "/notes", note);
};

const getNoteById = (id) => {
  return axios.get(baseUrl + "/notes/" + id);
};

const updateNote = (id, note) => {
  return axios.put(baseUrl + "/notes/" + id, note);
};

const deleteNote = (id) => {
  return axios.delete(baseUrl + "/notes/" + id);
};

export default {
  getAllNotes,
  postNote,
  getNoteById,
  updateNote,
  deleteNote,
};
