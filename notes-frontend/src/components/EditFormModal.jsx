import React, { useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import notesService from "../services/notesService";
import categoriesService from "../services/categoriesService";

export default function EditFormModal({ onClose, show, note }) {
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);
  const [tag, setTag] = useState("");
  const [tagsToShow, setTagsToShow] = useState(note.tags);
  const [tagsToAdd, setTagsToAdd] = useState([]);
  const [tagsToDelete, setTagsToDelete] = useState([]);

  const handleTagChange = (e) => {
    setTag(e.target.value);
  };

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
      if (tagsToDelete.length > 0) {
        for (const tag of tagsToDelete) {
          categoriesService
            .deleteCategoryFromNote(note.id, tag.id)
            .then((response) => {});
        }
        setTagsToDelete([]);
      }
      if (tagsToAdd.length > 0) {
        for (const tag of tagsToAdd) {
          const category = {
            name: tag.toUpperCase(),
          };
          categoriesService
            .postToNoteID(note.id, category)
            .then((response) => {});
        }
        setTagsToAdd([]);
      }
      onClose();
    });
  };

  const handleClick = () => {
    setTagsToShow(tagsToShow.concat({ name: tag.toUpperCase(), id: null }));
    setTagsToAdd(tagsToAdd.concat(tag.toUpperCase()));
    setTag("");
  };

  const handleDelete = (t, i) => {
    const tagsToShowSliced = [
      ...tagsToShow.slice(0, i),
      ...tagsToShow.slice(i + 1),
    ];
    const tagsToAddSliced = tagsToAdd.filter((e) => e !== t.name);
    setTagsToShow(tagsToShowSliced);
    setTagsToAdd(tagsToAddSliced);
    if (t.id !== null) {
      setTagsToDelete(tagsToDelete.concat(t));
    }
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
            <Form.Group>
              <Form.Label>Tags</Form.Label>
              <Form.Control
                placeholder="Add a tag..."
                onChange={handleTagChange}
                value={tag}
              />
              <Button
                variant="primary"
                size="sm"
                onClick={handleClick}
                className="m-2"
              >
                +
              </Button>
              {tagsToShow.length > 0 ? (
                <p>Tags: {tagsToShow.map((t) => t.name).join(", ")}</p>
              ) : (
                <p>Tags:</p>
              )}

              {tagsToShow.length > 0 ? (
                <Table striped bordered hover>
                  <tbody>
                    {tagsToShow.map((t, i) => (
                      <tr key={i}>
                        <td>{t.name}</td>
                        <td>
                          <Button
                            variant="danger"
                            className="me-1"
                            size="sm"
                            onClick={() => handleDelete(t, i)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <></>
              )}
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
