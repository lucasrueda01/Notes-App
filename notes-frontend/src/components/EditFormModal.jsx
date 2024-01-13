import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import notesService from "../services/notesService";

export default function EditFormModal({ onClose, show, note }) {
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const checkInputs = () => {
    if (title === "") return false;
    return true;
  };

  const onSave = () => {
    const updatedNote = {
      title: title,
      description: description,
      archived: note.archived,
    };

    notesService.updateNote(note.id, updatedNote).then((response) => {
      onClose();
    });
  };

  return (
    <div>
      <Form>
        <Modal show={show} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formModalBasicName">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                onChange={handleTitleChange}
                value={title}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formModalBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as={"textarea"}
                rows={3}
                onChange={handleDescriptionChange}
                value={description}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            {!checkInputs() ? (
              <Button variant="primary" type="button" disabled>
                Save Changes
              </Button>
            ) : (
              <Button variant="primary" onClick={onSave}>
                Save Changes
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </Form>
    </div>
  );
}
