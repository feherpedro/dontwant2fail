package hu.mik.pte.bpnh16.service;

import hu.mik.pte.bpnh16.service.dto.OrderEntityDTO;
import java.util.List;

/**
 * Service Interface for managing OrderEntity.
 */
public interface OrderEntityService {

    /**
     * Save a orderEntity.
     *
     * @param orderEntityDTO the entity to save
     * @return the persisted entity
     */
    OrderEntityDTO save(OrderEntityDTO orderEntityDTO);

    /**
     * Get all the orderEntities.
     *
     * @return the list of entities
     */
    List<OrderEntityDTO> findAll();

    /**
     * Get the "id" orderEntity.
     *
     * @param id the id of the entity
     * @return the entity
     */
    OrderEntityDTO findOne(Long id);

    /**
     * Delete the "id" orderEntity.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the orderEntity corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<OrderEntityDTO> search(String query);
}
