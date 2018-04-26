package hu.mik.pte.bpnh16.service.impl;

import hu.mik.pte.bpnh16.service.CountyService;
import hu.mik.pte.bpnh16.domain.County;
import hu.mik.pte.bpnh16.repository.CountyRepository;
import hu.mik.pte.bpnh16.repository.search.CountySearchRepository;
import hu.mik.pte.bpnh16.service.dto.CountyDTO;
import hu.mik.pte.bpnh16.service.mapper.CountyMapper;
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
 * Service Implementation for managing County.
 */
@Service
@Transactional
public class CountyServiceImpl implements CountyService {

    private final Logger log = LoggerFactory.getLogger(CountyServiceImpl.class);

    private final CountyRepository countyRepository;

    private final CountyMapper countyMapper;

    private final CountySearchRepository countySearchRepository;

    public CountyServiceImpl(CountyRepository countyRepository, CountyMapper countyMapper, CountySearchRepository countySearchRepository) {
        this.countyRepository = countyRepository;
        this.countyMapper = countyMapper;
        this.countySearchRepository = countySearchRepository;
    }

    /**
     * Save a county.
     *
     * @param countyDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CountyDTO save(CountyDTO countyDTO) {
        log.debug("Request to save County : {}", countyDTO);
        County county = countyMapper.toEntity(countyDTO);
        county = countyRepository.save(county);
        CountyDTO result = countyMapper.toDto(county);
        countySearchRepository.save(county);
        return result;
    }

    /**
     * Get all the counties.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CountyDTO> findAll() {
        log.debug("Request to get all Counties");
        return countyRepository.findAll().stream()
            .map(countyMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one county by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public CountyDTO findOne(Long id) {
        log.debug("Request to get County : {}", id);
        County county = countyRepository.findOne(id);
        return countyMapper.toDto(county);
    }

    /**
     * Delete the county by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete County : {}", id);
        countyRepository.delete(id);
        countySearchRepository.delete(id);
    }

    /**
     * Search for the county corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CountyDTO> search(String query) {
        log.debug("Request to search Counties for query {}", query);
        return StreamSupport
            .stream(countySearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(countyMapper::toDto)
            .collect(Collectors.toList());
    }
}
