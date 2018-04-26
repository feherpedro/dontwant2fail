package hu.mik.pte.bpnh16.web.rest;

import com.codahale.metrics.annotation.Timed;
import hu.mik.pte.bpnh16.service.OrderEntityService;
import hu.mik.pte.bpnh16.web.rest.errors.BadRequestAlertException;
import hu.mik.pte.bpnh16.web.rest.util.HeaderUtil;
import hu.mik.pte.bpnh16.service.dto.OrderEntityDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing OrderEntity.
 */
@RestController
@RequestMapping("/api")
public class OrderEntityResource {

    private final Logger log = LoggerFactory.getLogger(OrderEntityResource.class);

    private static final String ENTITY_NAME = "orderEntity";

    private final OrderEntityService orderEntityService;

    public OrderEntityResource(OrderEntityService orderEntityService) {
        this.orderEntityService = orderEntityService;
    }

    /**
     * POST  /order-entities : Create a new orderEntity.
     *
     * @param orderEntityDTO the orderEntityDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new orderEntityDTO, or with status 400 (Bad Request) if the orderEntity has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/order-entities")
    @Timed
    public ResponseEntity<OrderEntityDTO> createOrderEntity(@RequestBody OrderEntityDTO orderEntityDTO) throws URISyntaxException {
        log.debug("REST request to save OrderEntity : {}", orderEntityDTO);
        if (orderEntityDTO.getId() != null) {
            throw new BadRequestAlertException("A new orderEntity cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrderEntityDTO result = orderEntityService.save(orderEntityDTO);
        return ResponseEntity.created(new URI("/api/order-entities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /order-entities : Updates an existing orderEntity.
     *
     * @param orderEntityDTO the orderEntityDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated orderEntityDTO,
     * or with status 400 (Bad Request) if the orderEntityDTO is not valid,
     * or with status 500 (Internal Server Error) if the orderEntityDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/order-entities")
    @Timed
    public ResponseEntity<OrderEntityDTO> updateOrderEntity(@RequestBody OrderEntityDTO orderEntityDTO) throws URISyntaxException {
        log.debug("REST request to update OrderEntity : {}", orderEntityDTO);
        if (orderEntityDTO.getId() == null) {
            return createOrderEntity(orderEntityDTO);
        }
        OrderEntityDTO result = orderEntityService.save(orderEntityDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, orderEntityDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /order-entities : get all the orderEntities.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of orderEntities in body
     */
    @GetMapping("/order-entities")
    @Timed
    public List<OrderEntityDTO> getAllOrderEntities() {
        log.debug("REST request to get all OrderEntities");
        return orderEntityService.findAll();
        }

    /**
     * GET  /order-entities/:id : get the "id" orderEntity.
     *
     * @param id the id of the orderEntityDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the orderEntityDTO, or with status 404 (Not Found)
     */
    @GetMapping("/order-entities/{id}")
    @Timed
    public ResponseEntity<OrderEntityDTO> getOrderEntity(@PathVariable Long id) {
        log.debug("REST request to get OrderEntity : {}", id);
        OrderEntityDTO orderEntityDTO = orderEntityService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(orderEntityDTO));
    }

    /**
     * DELETE  /order-entities/:id : delete the "id" orderEntity.
     *
     * @param id the id of the orderEntityDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/order-entities/{id}")
    @Timed
    public ResponseEntity<Void> deleteOrderEntity(@PathVariable Long id) {
        log.debug("REST request to delete OrderEntity : {}", id);
        orderEntityService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/order-entities?query=:query : search for the orderEntity corresponding
     * to the query.
     *
     * @param query the query of the orderEntity search
     * @return the result of the search
     */
    @GetMapping("/_search/order-entities")
    @Timed
    public List<OrderEntityDTO> searchOrderEntities(@RequestParam String query) {
        log.debug("REST request to search OrderEntities for query {}", query);
        return orderEntityService.search(query);
    }

}
