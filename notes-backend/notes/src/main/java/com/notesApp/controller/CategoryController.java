package com.notesApp.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.notesApp.model.Category;
import com.notesApp.repository.CategoryRepository;
import com.notesApp.repository.NoteCategoryRepository;



@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/")
public class CategoryController {

	@Autowired
	CategoryRepository categoryRepository;
	@Autowired
	NoteCategoryRepository NCrepository;

	@GetMapping("/categories")
	public ResponseEntity<List<Category>> getAllCategories() {
		try {
			List<Category> categories = new ArrayList<Category>();
			categoryRepository.findAll().forEach(categories::add);

			if (categories.isEmpty())
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);

			return new ResponseEntity<>(categories, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/categories")
	public ResponseEntity<Category> createCategory(@RequestBody Category category) {
		try {
			Category newCategory = categoryRepository.save(new Category(category.getName()));
			return new ResponseEntity<>(newCategory, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/notes/{id}/categories")
	public ResponseEntity<List<Category>> getAllCategoriesByNoteID(@PathVariable("id") long id) {
		try {
			List<Category> categories = new ArrayList<Category>();
			categoryRepository.findByNoteID(id).forEach(categories::add);

			if (categories.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(categories, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Transactional
	@PostMapping("/notes/{id}/categories")
	public ResponseEntity<Category> postCategoriesByNoteID(@PathVariable("id") long noteId, @RequestBody Category category) {
		try {
			Category newCategory = categoryRepository.save(new Category(category.getName()));
			NCrepository.insertIntoNoteCategory(newCategory.getId(), noteId); //creates a new relation in NotesCategory table
	
			return new ResponseEntity<>(newCategory, HttpStatus.CREATED);

		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@Transactional
	@DeleteMapping("/notes/{noteId}/category/{categoryId}")
	public ResponseEntity<HttpStatus> deleteNotes(@PathVariable("noteId") Long noteId, @PathVariable("categoryId") Long categoryId) {
		try {
			NCrepository.deleteFromNoteCategory(categoryId, noteId); //deletes the relation 
			categoryRepository.deleteById(categoryId);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
