import React from "react";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import notesService from "../services/notesService";
import TagsForm from "./TagsForm";
import categoriesService from "../services/categoriesService";

export default function AddForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const checkInputs = () => {
    if (title.trim() === "") return false;
    return true;
  };

  const addTag = (t) => {
    if (t.trim() !== "") setTags(tags.concat(t.toUpperCase().trim()));
  };

  const handleAdd = async () => {
    const newNote = {
      title: title,
      description: description,
      archived: false,
    };
    //Post new Note
    await notesService.postNote(newNote).then((response) => {
      const noteID = response.data.id;
      //After posting Note, post new Category/ies related to the Note.ID
      for (let i = 0; i < tags.length; i++) {
        const newCategory = {
          //format
          name: tags[i],
        };
        categoriesService
          .postToNoteID(noteID, newCategory)
          .then((response) => {});
      }
      navigate("/home");
    });
  };
  return (
    <div>
      <Form className="form">
        <h1 className="main-title">Add new Note</h1>
        <Form.Group className="mb-2" controlId="formBasicName">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Note title"
            onChange={handleTitleChange}
            value={title}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as={"textarea"}
            rows={3}
            placeholder="Add a description..."
            onChange={handleDescriptionChange}
            value={description}
            required
          />
        </Form.Group>
        <TagsForm handleTag={(t) => addTag(t)} showTags={tags} />
        {checkInputs() ? (
          <Button variant="primary" type="button" onClick={handleAdd}>
            Add Note
          </Button>
        ) : (
          <Button variant="primary" type="button" disabled>
            Add Note
          </Button>
        )}
      </Form>
    </div>
  );
}
