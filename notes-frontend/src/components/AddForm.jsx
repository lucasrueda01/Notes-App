import React from "react";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import notesService from "../services/notesService";

export default function AddForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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

  const handleAdd = () => {
    const newNote = {
      title: title,
      description: description,
      archived: false,
    };
    notesService.postNote(newNote).then((response) => {
      console.log(response);
      navigate("/home");
    });
  };
  return (
    <div>
      <Form className="form">
        <h1 className="main-title">Add new Note</h1>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Note title"
            onChange={handleTitleChange}
            value={title}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDescription">
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
