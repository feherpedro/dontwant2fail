package hu.mik.pte.bpnh16.web.rest;

import com.codahale.metrics.annotation.Timed;
import hu.mik.pte.bpnh16.service.ProductStorageService;
import hu.mik.pte.bpnh16.web.rest.errors.BadRequestAlertException;
import hu.mik.pte.bpnh16.web.rest.util.HeaderUtil;
import hu.mik.pte.bpnh16.service.dto.ProductStorageDTO;
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
 * REST controller for managing ProductStorage.
 */
@RestController
@RequestMapping("/api")
public class ProductStorageResource {

    private final Logger log = LoggerFactory.getLogger(ProductStorageResource.class);

    private static final String ENTITY_NAME = "productStorage";

    private final ProductStorageService productStorageService;

    public ProductStorageResource(ProductStorageService productStorageService) {
        this.productStorageService = productStorageService;
    }

    /**
     * POST  /product-storages : Create a new productStorage.
     *
     * @param productStorageDTO the productStorageDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new productStorageDTO, or with status 400 (Bad Request) if the productStorage has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/product-storages")
    @Timed
    public ResponseEntity<ProductStorageDTO> createProductStorage(@RequestBody ProductStorageDTO productStorageDTO) throws URISyntaxException {
        log.debug("REST request to save ProductStorage : {}", productStorageDTO);
        if (productStorageDTO.getId() != null) {
            throw new BadRequestAlertException("A new productStorage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductStorageDTO result = productStorageService.save(productStorageDTO);
        return ResponseEntity.created(new URI("/api/product-storages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /product-storages : Updates an existing productStorage.
     *
     * @param productStorageDTO the productStorageDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated productStorageDTO,
     * or with status 400 (Bad Request) if the productStorageDTO is not valid,
     * or with status 500 (Internal Server Error) if the productStorageDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/product-storages")
    @Timed
    public ResponseEntity<ProductStorageDTO> updateProductStorage(@RequestBody ProductStorageDTO productStorageDTO) throws URISyntaxException {
        log.debug("REST request to update ProductStorage : {}", productStorageDTO);
        if (productStorageDTO.getId() == null) {
            return createProductStorage(productStorageDTO);
        }
        ProductStorageDTO result = productStorageService.save(productStorageDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, productStorageDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /product-storages : get all the productStorages.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of productStorages in body
     */
    @GetMapping("/product-storages")
    @Timed
    public List<ProductStorageDTO> getAllProductStorages() {
        log.debug("REST request to get all ProductStorages");
        return productStorageService.findAll();
        }

    /**
     * GET  /product-storages/:id : get the "id" productStorage.
     *
     * @param id the id of the productStorageDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the productStorageDTO, or with status 404 (Not Found)
     */
    @GetMapping("/product-storages/{id}")
    @Timed
    public ResponseEntity<ProductStorageDTO> getProductStorage(@PathVariable Long id) {
        log.debug("REST request to get ProductStorage : {}", id);
        ProductStorageDTO productStorageDTO = productStorageService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(productStorageDTO));
    }

    /**
     * DELETE  /product-storages/:id : delete the "id" productStorage.
     *
     * @param id the id of the productStorageDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/product-storages/{id}")
    @Timed
    public ResponseEntity<Void> deleteProductStorage(@PathVariable Long id) {
        log.debug("REST request to delete ProductStorage : {}", id);
        productStorageService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/product-storages?query=:query : search for the productStorage corresponding
     * to the query.
     *
     * @param query the query of the productStorage search
     * @return the result of the search
     */
    @GetMapping("/_search/product-storages")
    @Timed
    public List<ProductStorageDTO> searchProductStorages(@RequestParam String query) {
        log.debug("REST request to search ProductStorages for query {}", query);
        return productStorageService.search(query);
    }

}
