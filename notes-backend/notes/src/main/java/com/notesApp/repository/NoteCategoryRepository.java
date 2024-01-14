package com.notesApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.notesApp.model.NoteCategory;

public interface NoteCategoryRepository extends JpaRepository<NoteCategory, Long> {

	@Modifying
	@Query(value = "INSERT INTO notes_categories(categoryId, noteId) VALUES(?1, ?2)", nativeQuery = true)
	@Transactional
	void insertIntoNoteCategory(Long categoryId, Long noteId);

	@Modifying
	@Query(value = "DELETE FROM notes_categories nc WHERE nc.categoryid = ?1 AND nc.noteid = ?2", nativeQuery = true)
	@Transactional
	void deleteFromNoteCategory(Long categoryId, Long noteId);
	
	@Modifying
	@Query(value = "DELETE FROM notes_categories nc WHERE nc.noteid = ?1", nativeQuery = true)
	@Transactional
	void deleteAllFromNoteCategory(Long noteId);
	
	

}
