package hu.mik.pte.bpnh16.service.impl;

import hu.mik.pte.bpnh16.service.ProductStorageService;
import hu.mik.pte.bpnh16.domain.ProductStorage;
import hu.mik.pte.bpnh16.repository.ProductStorageRepository;
import hu.mik.pte.bpnh16.repository.search.ProductStorageSearchRepository;
import hu.mik.pte.bpnh16.service.dto.ProductStorageDTO;
import hu.mik.pte.bpnh16.service.mapper.ProductStorageMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing ProductStorage.
 */
@Service
@Transactional
public class ProductStorageServiceImpl implements ProductStorageService {

    private final Logger log = LoggerFactory.getLogger(ProductStorageServiceImpl.class);

    private final ProductStorageRepository productStorageRepository;

    private final ProductStorageMapper productStorageMapper;

    private final ProductStorageSearchRepository productStorageSearchRepository;

    public ProductStorageServiceImpl(ProductStorageRepository productStorageRepository, ProductStorageMapper productStorageMapper, ProductStorageSearchRepository productStorageSearchRepository) {
        this.productStorageRepository = productStorageRepository;
        this.productStorageMapper = productStorageMapper;
        this.productStorageSearchRepository = productStorageSearchRepository;
    }

    /**
     * Save a productStorage.
     *
     * @param productStorageDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ProductStorageDTO save(ProductStorageDTO productStorageDTO) {
        log.debug("Request to save ProductStorage : {}", productStorageDTO);
        ProductStorage productStorage = productStorageMapper.toEntity(productStorageDTO);
        productStorage = productStorageRepository.save(productStorage);
        ProductStorageDTO result = productStorageMapper.toDto(productStorage);
        productStorageSearchRepository.save(productStorage);
        return result;
    }

    /**
     * Get all the productStorages.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ProductStorageDTO> findAll() {
        log.debug("Request to get all ProductStorages");
        return productStorageRepository.findAll().stream()
            .map(productStorageMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one productStorage by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ProductStorageDTO findOne(Long id) {
        log.debug("Request to get ProductStorage : {}", id);
        ProductStorage productStorage = productStorageRepository.findOne(id);
        return productStorageMapper.toDto(productStorage);
    }

    /**
     * Delete the productStorage by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProductStorage : {}", id);
        productStorageRepository.delete(id);
        productStorageSearchRepository.delete(id);
    }

    /**
     * Search for the productStorage corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ProductStorageDTO> search(String query) {
        log.debug("Request to search ProductStorages for query {}", query);
        return StreamSupport
            .stream(productStorageSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(productStorageMapper::toDto)
            .collect(Collectors.toList());
    }
}
