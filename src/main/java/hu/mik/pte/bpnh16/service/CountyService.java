package hu.mik.pte.bpnh16.service;

import hu.mik.pte.bpnh16.service.dto.CountyDTO;
import java.util.List;

/**
 * Service Interface for managing County.
 */
public interface CountyService {

    /**
     * Save a county.
     *
     * @param countyDTO the entity to save
     * @return the persisted entity
     */
    CountyDTO save(CountyDTO countyDTO);

    /**
     * Get all the counties.
     *
     * @return the list of entities
     */
    List<CountyDTO> findAll();

    /**
     * Get the "id" county.
     *
     * @param id the id of the entity
     * @return the entity
     */
    CountyDTO findOne(Long id);

    /**
     * Delete the "id" county.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the county corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<CountyDTO> search(String query);
}
