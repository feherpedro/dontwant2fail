package hu.mik.pte.bpnh16.service.impl;

import hu.mik.pte.bpnh16.service.PriceCategoryService;
import hu.mik.pte.bpnh16.domain.PriceCategory;
import hu.mik.pte.bpnh16.repository.PriceCategoryRepository;
import hu.mik.pte.bpnh16.repository.search.PriceCategorySearchRepository;
import hu.mik.pte.bpnh16.service.dto.PriceCategoryDTO;
import hu.mik.pte.bpnh16.service.mapper.PriceCategoryMapper;
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
 * Service Implementation for managing PriceCategory.
 */
@Service
@Transactional
public class PriceCategoryServiceImpl implements PriceCategoryService {

    private final Logger log = LoggerFactory.getLogger(PriceCategoryServiceImpl.class);

    private final PriceCategoryRepository priceCategoryRepository;

    private final PriceCategoryMapper priceCategoryMapper;

    private final PriceCategorySearchRepository priceCategorySearchRepository;

    public PriceCategoryServiceImpl(PriceCategoryRepository priceCategoryRepository, PriceCategoryMapper priceCategoryMapper, PriceCategorySearchRepository priceCategorySearchRepository) {
        this.priceCategoryRepository = priceCategoryRepository;
        this.priceCategoryMapper = priceCategoryMapper;
        this.priceCategorySearchRepository = priceCategorySearchRepository;
    }

    /**
     * Save a priceCategory.
     *
     * @param priceCategoryDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PriceCategoryDTO save(PriceCategoryDTO priceCategoryDTO) {
        log.debug("Request to save PriceCategory : {}", priceCategoryDTO);
        PriceCategory priceCategory = priceCategoryMapper.toEntity(priceCategoryDTO);
        priceCategory = priceCategoryRepository.save(priceCategory);
        PriceCategoryDTO result = priceCategoryMapper.toDto(priceCategory);
        priceCategorySearchRepository.save(priceCategory);
        return result;
    }

    /**
     * Get all the priceCategories.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PriceCategoryDTO> findAll() {
        log.debug("Request to get all PriceCategories");
        return priceCategoryRepository.findAll().stream()
            .map(priceCategoryMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one priceCategory by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PriceCategoryDTO findOne(Long id) {
        log.debug("Request to get PriceCategory : {}", id);
        PriceCategory priceCategory = priceCategoryRepository.findOne(id);
        return priceCategoryMapper.toDto(priceCategory);
    }

    /**
     * Delete the priceCategory by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PriceCategory : {}", id);
        priceCategoryRepository.delete(id);
        priceCategorySearchRepository.delete(id);
    }

    /**
     * Search for the priceCategory corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PriceCategoryDTO> search(String query) {
        log.debug("Request to search PriceCategories for query {}", query);
        return StreamSupport
            .stream(priceCategorySearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(priceCategoryMapper::toDto)
            .collect(Collectors.toList());
    }
}
