import axios from "axios";
import { baseUrl } from "../consts";

const getAllByNoteID = (noteId) => {
  return axios.get(baseUrl + "/notes/" + noteId + "/categories");
};

const postToNoteID = (noteId, category) => {
  return axios.post(baseUrl + "/notes/" + noteId + "/categories", category);
};

const deleteCategoryFromNote = (noteId, categoryId) => {
  return axios.delete(baseUrl + "/notes/" + noteId + "/category/" + categoryId);
};

export default { getAllByNoteID, postToNoteID, deleteCategoryFromNote };
