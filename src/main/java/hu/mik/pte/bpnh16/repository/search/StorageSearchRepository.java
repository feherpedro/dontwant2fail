package hu.mik.pte.bpnh16.repository.search;

import hu.mik.pte.bpnh16.domain.Storage;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Storage entity.
 */
public interface StorageSearchRepository extends ElasticsearchRepository<Storage, Long> {
}
