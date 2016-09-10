package com.planner.goalbuddy.service.impl;

import com.planner.goalbuddy.service.TodoService;
import com.planner.goalbuddy.domain.Todo;
import com.planner.goalbuddy.repository.TodoRepository;
import com.planner.goalbuddy.repository.search.TodoSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Todo.
 */
@Service
@Transactional
public class TodoServiceImpl implements TodoService{

    private final Logger log = LoggerFactory.getLogger(TodoServiceImpl.class);
    
    @Inject
    private TodoRepository todoRepository;

    @Inject
    private TodoSearchRepository todoSearchRepository;

    /**
     * Save a todo.
     *
     * @param todo the entity to save
     * @return the persisted entity
     */
    public Todo save(Todo todo) {
        log.debug("Request to save Todo : {}", todo);
        Todo result = todoRepository.save(todo);
        todoSearchRepository.save(result);
        return result;
    }

    /**
     *  Get all the todos.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public Page<Todo> findAll(Pageable pageable) {
        log.debug("Request to get all Todos");
        Page<Todo> result = todoRepository.findAll(pageable);
        return result;
    }

    /**
     *  Get one todo by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public Todo findOne(Long id) {
        log.debug("Request to get Todo : {}", id);
        Todo todo = todoRepository.findOne(id);
        return todo;
    }

    /**
     *  Delete the  todo by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Todo : {}", id);
        todoRepository.delete(id);
        todoSearchRepository.delete(id);
    }

    /**
     * Search for the todo corresponding to the query.
     *
     *  @param query the query of the search
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Todo> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Todos for query {}", query);
        Page<Todo> result = todoSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
