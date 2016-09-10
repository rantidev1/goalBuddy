package com.planner.goalbuddy.repository.search;

import com.planner.goalbuddy.domain.Todo;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data ElasticSearch repository for the Todo entity.
 */
public interface TodoSearchRepository extends ElasticsearchRepository<Todo, Long> {
}
