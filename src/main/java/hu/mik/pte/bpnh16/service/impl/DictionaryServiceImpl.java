package hu.mik.pte.bpnh16.service.impl;

import hu.mik.pte.bpnh16.service.DictionaryService;
import hu.mik.pte.bpnh16.domain.Dictionary;
import hu.mik.pte.bpnh16.repository.DictionaryRepository;
import hu.mik.pte.bpnh16.repository.search.DictionarySearchRepository;
import hu.mik.pte.bpnh16.service.dto.DictionaryDTO;
import hu.mik.pte.bpnh16.service.mapper.DictionaryMapper;
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
 * Service Implementation for managing Dictionary.
 */
@Service
@Transactional
public class DictionaryServiceImpl implements DictionaryService {

    private final Logger log = LoggerFactory.getLogger(DictionaryServiceImpl.class);

    private final DictionaryRepository dictionaryRepository;

    private final DictionaryMapper dictionaryMapper;

    private final DictionarySearchRepository dictionarySearchRepository;

    public DictionaryServiceImpl(DictionaryRepository dictionaryRepository, DictionaryMapper dictionaryMapper, DictionarySearchRepository dictionarySearchRepository) {
        this.dictionaryRepository = dictionaryRepository;
        this.dictionaryMapper = dictionaryMapper;
        this.dictionarySearchRepository = dictionarySearchRepository;
    }

    /**
     * Save a dictionary.
     *
     * @param dictionaryDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public DictionaryDTO save(DictionaryDTO dictionaryDTO) {
        log.debug("Request to save Dictionary : {}", dictionaryDTO);
        Dictionary dictionary = dictionaryMapper.toEntity(dictionaryDTO);
        dictionary = dictionaryRepository.save(dictionary);
        DictionaryDTO result = dictionaryMapper.toDto(dictionary);
        dictionarySearchRepository.save(dictionary);
        return result;
    }

    /**
     * Get all the dictionaries.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DictionaryDTO> findAll() {
        log.debug("Request to get all Dictionaries");
        return dictionaryRepository.findAll().stream()
            .map(dictionaryMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one dictionary by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public DictionaryDTO findOne(Long id) {
        log.debug("Request to get Dictionary : {}", id);
        Dictionary dictionary = dictionaryRepository.findOne(id);
        return dictionaryMapper.toDto(dictionary);
    }

    /**
     * Delete the dictionary by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Dictionary : {}", id);
        dictionaryRepository.delete(id);
        dictionarySearchRepository.delete(id);
    }

    /**
     * Search for the dictionary corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DictionaryDTO> search(String query) {
        log.debug("Request to search Dictionaries for query {}", query);
        return StreamSupport
            .stream(dictionarySearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(dictionaryMapper::toDto)
            .collect(Collectors.toList());
    }
}
