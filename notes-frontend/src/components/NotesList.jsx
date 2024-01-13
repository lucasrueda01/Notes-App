import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotesList() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Nota 1",
      description: "Descripción de la Nota 1",
      tags: "",
      archived: true,
    },
    {
      id: 2,
      title: "Nota 2",
      description: "Descripción de la Nota 2",
      tags: "",
      archived: false,
    },
    {
      id: 3,
      title: "Nota 3",
      description: "Descripción de la Nota 3",
      tags: "",
      archived: true,
    },
  ]);

  return (
    <div className="table">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr key={note.id}>
              <td>{note.id}</td>
              <td>{note.title}</td>
              <td>{note.description}</td>
              <td>{note.tags}</td>
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
