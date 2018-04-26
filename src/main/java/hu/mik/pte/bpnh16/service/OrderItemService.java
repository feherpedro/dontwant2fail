package hu.mik.pte.bpnh16.service;

import hu.mik.pte.bpnh16.service.dto.OrderItemDTO;
import java.util.List;

/**
 * Service Interface for managing OrderItem.
 */
public interface OrderItemService {

    /**
     * Save a orderItem.
     *
     * @param orderItemDTO the entity to save
     * @return the persisted entity
     */
    OrderItemDTO save(OrderItemDTO orderItemDTO);

    /**
     * Get all the orderItems.
     *
     * @return the list of entities
     */
    List<OrderItemDTO> findAll();

    /**
     * Get the "id" orderItem.
     *
     * @param id the id of the entity
     * @return the entity
     */
    OrderItemDTO findOne(Long id);

    /**
     * Delete the "id" orderItem.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the orderItem corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<OrderItemDTO> search(String query);
}
