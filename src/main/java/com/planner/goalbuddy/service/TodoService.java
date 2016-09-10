package com.planner.goalbuddy.service;

import com.planner.goalbuddy.domain.Todo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * Service Interface for managing Todo.
 */
public interface TodoService {

    /**
     * Save a todo.
     *
     * @param todo the entity to save
     * @return the persisted entity
     */
    Todo save(Todo todo);

    /**
     *  Get all the todos.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<Todo> findAll(Pageable pageable);

    /**
     *  Get the "id" todo.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    Todo findOne(Long id);

    /**
     *  Delete the "id" todo.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the todo corresponding to the query.
     *
     *  @param query the query of the search
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<Todo> search(String query, Pageable pageable);
}
