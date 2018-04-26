package hu.mik.pte.bpnh16.service.impl;

import hu.mik.pte.bpnh16.service.OrderEntityService;
import hu.mik.pte.bpnh16.domain.OrderEntity;
import hu.mik.pte.bpnh16.repository.OrderEntityRepository;
import hu.mik.pte.bpnh16.repository.search.OrderEntitySearchRepository;
import hu.mik.pte.bpnh16.service.dto.OrderEntityDTO;
import hu.mik.pte.bpnh16.service.mapper.OrderEntityMapper;
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
 * Service Implementation for managing OrderEntity.
 */
@Service
@Transactional
public class OrderEntityServiceImpl implements OrderEntityService {

    private final Logger log = LoggerFactory.getLogger(OrderEntityServiceImpl.class);

    private final OrderEntityRepository orderEntityRepository;

    private final OrderEntityMapper orderEntityMapper;

    private final OrderEntitySearchRepository orderEntitySearchRepository;

    public OrderEntityServiceImpl(OrderEntityRepository orderEntityRepository, OrderEntityMapper orderEntityMapper, OrderEntitySearchRepository orderEntitySearchRepository) {
        this.orderEntityRepository = orderEntityRepository;
        this.orderEntityMapper = orderEntityMapper;
        this.orderEntitySearchRepository = orderEntitySearchRepository;
    }

    /**
     * Save a orderEntity.
     *
     * @param orderEntityDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public OrderEntityDTO save(OrderEntityDTO orderEntityDTO) {
        log.debug("Request to save OrderEntity : {}", orderEntityDTO);
        OrderEntity orderEntity = orderEntityMapper.toEntity(orderEntityDTO);
        orderEntity = orderEntityRepository.save(orderEntity);
        OrderEntityDTO result = orderEntityMapper.toDto(orderEntity);
        orderEntitySearchRepository.save(orderEntity);
        return result;
    }

    /**
     * Get all the orderEntities.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<OrderEntityDTO> findAll() {
        log.debug("Request to get all OrderEntities");
        return orderEntityRepository.findAll().stream()
            .map(orderEntityMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one orderEntity by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public OrderEntityDTO findOne(Long id) {
        log.debug("Request to get OrderEntity : {}", id);
        OrderEntity orderEntity = orderEntityRepository.findOne(id);
        return orderEntityMapper.toDto(orderEntity);
    }

    /**
     * Delete the orderEntity by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete OrderEntity : {}", id);
        orderEntityRepository.delete(id);
        orderEntitySearchRepository.delete(id);
    }

    /**
     * Search for the orderEntity corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<OrderEntityDTO> search(String query) {
        log.debug("Request to search OrderEntities for query {}", query);
        return StreamSupport
            .stream(orderEntitySearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(orderEntityMapper::toDto)
            .collect(Collectors.toList());
    }
}
