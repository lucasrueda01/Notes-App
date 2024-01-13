import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import notesService from "./services/notesService";
import EditFormModal from "./EditFormModal";

export default function NotesList() {
  const [notes, setNotes] = useState([]);
  const [show, setShow] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState("");
  const [noteToDelete, setNoteToDelete] = useState("");

  //////////////////////////TABLE/////////////////////////////

  useEffect(() => {
    notesService.getAllNotes().then((response) => {
      console.log(response);
      setNotes(response.data);
    });
  }, [noteToEdit, noteToDelete]);

  const handleDelete = (note) => {
    setNoteToDelete(note);
    notesService.deleteNote(note.id).then((response) => {
      console.log(response);
      setNoteToDelete("");
    });
  };

  //////////////////////////MODAL/////////////////////////////

  const handleClose = () => {
    setNoteToEdit("");
    setShow(false);
  };

  const handleEdit = (note) => {
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
          {notes.length > 0 ? (
            notes.map((note) => (
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
                    onClick={() => handleEdit(note)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="secondary"
                    type="submit"
                    size="sm"
                    onClick={() => handleDelete(note)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">
                <p>No Notes found. Try adding some!</p>
              </td>
            </tr>
          )}
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
