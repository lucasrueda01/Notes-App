package com.notesApp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.notesApp.model.Category;

public interface CategoryRepository extends JpaRepository<Category,Long>{
	@Query(value = "SELECT c.id, c.name "
			+ "FROM categories c JOIN notes_categories "
			+ "ON c.id = notes_categories.categoryid "
			+ "WHERE notes_categories.noteid= ?1", nativeQuery=true)
	List<Category> findByNoteID(Long id);
	
	
}
