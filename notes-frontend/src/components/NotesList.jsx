import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import notesService from "../services/notesService";
import EditFormModal from "./EditFormModal";
import SwitchArchiveFilter from "./SwitchArchiveFilter";

export default function NotesList() {
  const [notes, setNotes] = useState([]);
  const [show, setShow] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [archiveFilter, setArchiveFilter] = useState(false);

  const showNotes = (notes) => {
    if (archiveFilter) {
      return notes.filter((note) => note.archived);
    }
    return notes.filter((note) => !note.archived);
  };

  const handleSwitchChange = () => {
    setArchiveFilter(!archiveFilter);
    setRefresh(!refresh);
  };

  //////////////////////////TABLE/////////////////////////////

  useEffect(() => {
    notesService.getAllNotes().then((response) => {
      setNotes(response.data);
    });
  }, [refresh]);

  const handleDelete = (note) => {
    notesService.deleteNote(note.id).then((response) => {
      setRefresh(!refresh);
    });
  };

  const handleArchive = (note) => {
    const newNote = {
      ...note,
      archived: !note.archived,
    };
    notesService.updateNote(note.id, newNote).then((response) => {
      setRefresh(!refresh);
    });
  };

  //////////////////////////MODAL/////////////////////////////

  const handleClose = () => {
    setNoteToEdit("");
    setShow(false);
    setRefresh(!refresh);
  };

  const handleEdit = (note) => {
    setNoteToEdit(note);
    setShow(true);
    setRefresh(!refresh);
  };

  return (
    <div className="table">
      <SwitchArchiveFilter handleSwitchChange={handleSwitchChange} />
      <Table striped bordered hover>
        <thead>
          <tr className="center">
            <th>Title</th>
            <th>Description</th>
            <th>Tags</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {notes.length > 0 ? (
            showNotes(notes).map((note) => (
              <tr key={note.id}>
                <td>{note.title}</td>
                <td>{note.description}</td>
                <td></td>
                <td>
                  <Button
                    variant="primary"
                    className="me-1"
                    size="sm"
                    onClick={() => handleEdit(note)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="me-1"
                    size="sm"
                    onClick={() => handleDelete(note)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="dark"
                    className="me-1"
                    size="sm"
                    onClick={() => handleArchive(note)}
                  >
                    {!note.archived ? "Archive" : "Unarchive"}
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">
                <p>No Notes found</p>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <Button variant="primary" as={Link} to="/add" size="sm">
        +
      </Button>
      {show && (
        <EditFormModal onClose={handleClose} show={true} note={noteToEdit} />
      )}
    </div>
  );
}
