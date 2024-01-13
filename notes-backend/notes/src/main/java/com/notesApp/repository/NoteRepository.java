package com.notesApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.notesApp.model.Note;

public interface NoteRepository extends JpaRepository<Note,Long> {

	
}
