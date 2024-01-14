import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import notesService from "../services/notesService";
import EditFormModal from "./EditFormModal";
import SwitchArchiveFilter from "./SwitchArchiveFilter";
import categoriesService from "../services/categoriesService";
import SearchFilter from "./SearchFilter";

export default function NotesList() {
  const [notes, setNotes] = useState([]);
  const [show, setShow] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [archiveFilter, setArchiveFilter] = useState(false);
  const [tagFilter, setTagFilter] = useState("");

  const showNotes = (notes) => {
    if (tagFilter !== "" && !archiveFilter) {
      const filteredNotes = notes.filter(
        (note) => filterMatchesTag(note.tags) && !note.archived
      );
      return filteredNotes;
    }

    if (tagFilter !== "" && archiveFilter) {
      const filteredNotes = notes.filter(
        (note) => filterMatchesTag(note.tags) && note.archived
      );
      return filteredNotes;
    }

    if (tagFilter === "" && archiveFilter)
      return notes.filter((note) => note.archived);

    if (tagFilter === "" && !archiveFilter)
      return notes.filter((note) => !note.archived);
  };

  const filterMatchesTag = (noteTags) => {
    for (const tag of noteTags) {
      if (tag.name.toLowerCase().includes(tagFilter.toLowerCase())) {
        return true;
      }
    }
    return false;
  };

  const handleSwitchChange = () => {
    setArchiveFilter(!archiveFilter);
    setRefresh(!refresh);
  };

  const handleFilterChange = (newFilter) => {
    setTagFilter(newFilter.trim());
  };

  //////////////////////////TABLE/////////////////////////////

  useEffect(() => {
    const getNotes = () => {
      // Fetch all notes
      notesService.getAllNotes().then((notesResponse) => {
        const notesWithTags = [];
        // Fetch all categories for each note
        for (const note of notesResponse.data) {
          categoriesService
            .getAllByNoteID(note.id)
            .then((categoriesResponse) => {
              // Combine note with its tags
              const noteWithTags = {
                ...note,
                // Map all tag names into tags property
                tags: categoriesResponse.data ? categoriesResponse.data : [],
              };
              //Add note to array
              notesWithTags.push(noteWithTags);

              // Update state when fetched all tags for all notes
              if (notesWithTags.length === notesResponse.data.length) {
                // Sort the array by note ID
                const sortedNotes = [...notesWithTags].sort(
                  (a, b) => a.id - b.id
                );

                setNotes(sortedNotes);
              }
            });
        }
      });
    };

    getNotes();
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
      <SearchFilter onInputChange={handleFilterChange}></SearchFilter>
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
                {note.tags.length > 0 ? (
                  <td>{note.tags.map((t) => t.name).join(", ")}</td>
                ) : (
                  <td>No tags</td>
                )}

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
