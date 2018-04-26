package hu.mik.pte.bpnh16.service.impl;

import hu.mik.pte.bpnh16.service.OrderItemService;
import hu.mik.pte.bpnh16.domain.OrderItem;
import hu.mik.pte.bpnh16.repository.OrderItemRepository;
import hu.mik.pte.bpnh16.repository.search.OrderItemSearchRepository;
import hu.mik.pte.bpnh16.service.dto.OrderItemDTO;
import hu.mik.pte.bpnh16.service.mapper.OrderItemMapper;
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
 * Service Implementation for managing OrderItem.
 */
@Service
@Transactional
public class OrderItemServiceImpl implements OrderItemService {

    private final Logger log = LoggerFactory.getLogger(OrderItemServiceImpl.class);

    private final OrderItemRepository orderItemRepository;

    private final OrderItemMapper orderItemMapper;

    private final OrderItemSearchRepository orderItemSearchRepository;

    public OrderItemServiceImpl(OrderItemRepository orderItemRepository, OrderItemMapper orderItemMapper, OrderItemSearchRepository orderItemSearchRepository) {
        this.orderItemRepository = orderItemRepository;
        this.orderItemMapper = orderItemMapper;
        this.orderItemSearchRepository = orderItemSearchRepository;
    }

    /**
     * Save a orderItem.
     *
     * @param orderItemDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public OrderItemDTO save(OrderItemDTO orderItemDTO) {
        log.debug("Request to save OrderItem : {}", orderItemDTO);
        OrderItem orderItem = orderItemMapper.toEntity(orderItemDTO);
        orderItem = orderItemRepository.save(orderItem);
        OrderItemDTO result = orderItemMapper.toDto(orderItem);
        orderItemSearchRepository.save(orderItem);
        return result;
    }

    /**
     * Get all the orderItems.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<OrderItemDTO> findAll() {
        log.debug("Request to get all OrderItems");
        return orderItemRepository.findAll().stream()
            .map(orderItemMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one orderItem by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public OrderItemDTO findOne(Long id) {
        log.debug("Request to get OrderItem : {}", id);
        OrderItem orderItem = orderItemRepository.findOne(id);
        return orderItemMapper.toDto(orderItem);
    }

    /**
     * Delete the orderItem by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete OrderItem : {}", id);
        orderItemRepository.delete(id);
        orderItemSearchRepository.delete(id);
    }

    /**
     * Search for the orderItem corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<OrderItemDTO> search(String query) {
        log.debug("Request to search OrderItems for query {}", query);
        return StreamSupport
            .stream(orderItemSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(orderItemMapper::toDto)
            .collect(Collectors.toList());
    }
}
