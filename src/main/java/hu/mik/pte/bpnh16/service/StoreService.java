package hu.mik.pte.bpnh16.service;

import hu.mik.pte.bpnh16.service.dto.StoreDTO;
import java.util.List;

/**
 * Service Interface for managing Store.
 */
public interface StoreService {

    /**
     * Save a store.
     *
     * @param storeDTO the entity to save
     * @return the persisted entity
     */
    StoreDTO save(StoreDTO storeDTO);

    /**
     * Get all the stores.
     *
     * @return the list of entities
     */
    List<StoreDTO> findAll();

    /**
     * Get the "id" store.
     *
     * @param id the id of the entity
     * @return the entity
     */
    StoreDTO findOne(Long id);

    /**
     * Delete the "id" store.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the store corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<StoreDTO> search(String query);
}
