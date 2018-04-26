package hu.mik.pte.bpnh16.repository.search;

import hu.mik.pte.bpnh16.domain.County;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the County entity.
 */
public interface CountySearchRepository extends ElasticsearchRepository<County, Long> {
}
