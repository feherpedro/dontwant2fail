package hu.mik.pte.bpnh16.service;

import hu.mik.pte.bpnh16.service.dto.ProductStorageDTO;
import java.util.List;

/**
 * Service Interface for managing ProductStorage.
 */
public interface ProductStorageService {

    /**
     * Save a productStorage.
     *
     * @param productStorageDTO the entity to save
     * @return the persisted entity
     */
    ProductStorageDTO save(ProductStorageDTO productStorageDTO);

    /**
     * Get all the productStorages.
     *
     * @return the list of entities
     */
    List<ProductStorageDTO> findAll();

    /**
     * Get the "id" productStorage.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ProductStorageDTO findOne(Long id);

    /**
     * Delete the "id" productStorage.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the productStorage corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<ProductStorageDTO> search(String query);
}
