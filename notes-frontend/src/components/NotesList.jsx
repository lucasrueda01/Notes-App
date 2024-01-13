import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import notesService from "./services/notesService";

export default function NotesList() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    notesService.getAllNotes().then((response) => {
      console.log(response);
      setNotes(response.data);
    });
  }, []);

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
                  as={Link}
                  to="/edit"
                >
                  Edit
                </Button>
                <Button
                  variant="secondary"
                  type="submit"
                  size="sm"
                  as={Link}
                  to="/delete"
                >
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
    </div>
  );
}
