package hu.mik.pte.bpnh16.service;

import hu.mik.pte.bpnh16.service.dto.PriceCategoryDTO;
import java.util.List;

/**
 * Service Interface for managing PriceCategory.
 */
public interface PriceCategoryService {

    /**
     * Save a priceCategory.
     *
     * @param priceCategoryDTO the entity to save
     * @return the persisted entity
     */
    PriceCategoryDTO save(PriceCategoryDTO priceCategoryDTO);

    /**
     * Get all the priceCategories.
     *
     * @return the list of entities
     */
    List<PriceCategoryDTO> findAll();

    /**
     * Get the "id" priceCategory.
     *
     * @param id the id of the entity
     * @return the entity
     */
    PriceCategoryDTO findOne(Long id);

    /**
     * Delete the "id" priceCategory.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the priceCategory corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<PriceCategoryDTO> search(String query);
}
