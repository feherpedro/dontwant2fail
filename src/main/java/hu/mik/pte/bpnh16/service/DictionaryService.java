package hu.mik.pte.bpnh16.service;

import hu.mik.pte.bpnh16.service.dto.DictionaryDTO;
import java.util.List;

/**
 * Service Interface for managing Dictionary.
 */
public interface DictionaryService {

    /**
     * Save a dictionary.
     *
     * @param dictionaryDTO the entity to save
     * @return the persisted entity
     */
    DictionaryDTO save(DictionaryDTO dictionaryDTO);

    /**
     * Get all the dictionaries.
     *
     * @return the list of entities
     */
    List<DictionaryDTO> findAll();

    /**
     * Get the "id" dictionary.
     *
     * @param id the id of the entity
     * @return the entity
     */
    DictionaryDTO findOne(Long id);

    /**
     * Delete the "id" dictionary.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the dictionary corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<DictionaryDTO> search(String query);
}
