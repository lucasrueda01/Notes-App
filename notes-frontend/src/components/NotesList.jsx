import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import notesService from "./services/notesService";
import EditFormModal from "./EditFormModal";

export default function NotesList() {
  const [notes, setNotes] = useState([]);
  const [show, setShow] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState("");

  //////////////////////////TABLE/////////////////////////////

  useEffect(() => {
    notesService.getAllNotes().then((response) => {
      console.log(response);
      setNotes(response.data);
    });
  }, [show]);

  //////////////////////////MODAL/////////////////////////////

  const handleClose = () => {
    setNoteToEdit("");
    setShow(false);
  };

  const handleShow = (note) => {
    setNoteToEdit(note);
    setShow(true);
  };

  return (
    <div className="table">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr key={note.id}>
              <td>{note.title}</td>
              <td>{note.description}</td>
              <td></td>
              <td>
                <Button
                  variant="primary"
                  type="submit"
                  className="me-1"
                  size="sm"
                  onClick={() => handleShow(note)}
                >
                  Edit
                </Button>
                <Button variant="secondary" type="submit" size="sm">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="secondary" as={Link} to="/add">
        +
      </Button>
      {show && (
        <EditFormModal onClose={handleClose} show={true} note={noteToEdit} />
      )}
    </div>
  );
}
