package com.notesApp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "NotesCategories")
public class NoteCategory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@ManyToOne
	@JoinColumn(name = "NoteID")
	private Note note;

	@ManyToOne
	@JoinColumn(name = "CategoryID")
	private Category category;

	public Note getNote() {
		return note;
	}

	public void setNote(Note note) {
		this.note = note;
	}

	public Category getCategory() {
		return category;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public NoteCategory(Note note, Category category) {
		super();
		this.note = note;
		this.category = category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public NoteCategory() {

	}
}
