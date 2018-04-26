package hu.mik.pte.bpnh16.repository.search;

import hu.mik.pte.bpnh16.domain.ProductStorage;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ProductStorage entity.
 */
public interface ProductStorageSearchRepository extends ElasticsearchRepository<ProductStorage, Long> {
}
