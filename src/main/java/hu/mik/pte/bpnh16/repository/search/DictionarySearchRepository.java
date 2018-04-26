package hu.mik.pte.bpnh16.repository.search;

import hu.mik.pte.bpnh16.domain.Dictionary;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Dictionary entity.
 */
public interface DictionarySearchRepository extends ElasticsearchRepository<Dictionary, Long> {
}
