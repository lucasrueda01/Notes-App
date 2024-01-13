package com.notesApp.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.notesApp.model.Note;
import com.notesApp.repository.NoteRepository;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/")
public class NoteController {

	@Autowired
	NoteRepository noteRepository;

	@GetMapping("/notes")
	public ResponseEntity<List<Note>> getAllNotes() {
		try {
			List<Note> notes = new ArrayList<Note>();
			noteRepository.findAll().forEach(notes::add);

			if (notes.isEmpty())
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);

			return new ResponseEntity<>(notes, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/notes")
	public ResponseEntity<Note> createTutorial(@RequestBody Note note) {
		try {
			Note noteSaved = noteRepository.save(new Note(note.getTitle(), note.getDescription(), note.isArchived()));
			return new ResponseEntity<>(noteSaved, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
