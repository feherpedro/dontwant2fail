package hu.mik.pte.bpnh16.web.rest;

import com.codahale.metrics.annotation.Timed;
import hu.mik.pte.bpnh16.service.CountyService;
import hu.mik.pte.bpnh16.web.rest.errors.BadRequestAlertException;
import hu.mik.pte.bpnh16.web.rest.util.HeaderUtil;
import hu.mik.pte.bpnh16.service.dto.CountyDTO;
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
 * REST controller for managing County.
 */
@RestController
@RequestMapping("/api")
public class CountyResource {

    private final Logger log = LoggerFactory.getLogger(CountyResource.class);

    private static final String ENTITY_NAME = "county";

    private final CountyService countyService;

    public CountyResource(CountyService countyService) {
        this.countyService = countyService;
    }

    /**
     * POST  /counties : Create a new county.
     *
     * @param countyDTO the countyDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new countyDTO, or with status 400 (Bad Request) if the county has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/counties")
    @Timed
    public ResponseEntity<CountyDTO> createCounty(@RequestBody CountyDTO countyDTO) throws URISyntaxException {
        log.debug("REST request to save County : {}", countyDTO);
        if (countyDTO.getId() != null) {
            throw new BadRequestAlertException("A new county cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CountyDTO result = countyService.save(countyDTO);
        return ResponseEntity.created(new URI("/api/counties/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /counties : Updates an existing county.
     *
     * @param countyDTO the countyDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated countyDTO,
     * or with status 400 (Bad Request) if the countyDTO is not valid,
     * or with status 500 (Internal Server Error) if the countyDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/counties")
    @Timed
    public ResponseEntity<CountyDTO> updateCounty(@RequestBody CountyDTO countyDTO) throws URISyntaxException {
        log.debug("REST request to update County : {}", countyDTO);
        if (countyDTO.getId() == null) {
            return createCounty(countyDTO);
        }
        CountyDTO result = countyService.save(countyDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, countyDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /counties : get all the counties.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of counties in body
     */
    @GetMapping("/counties")
    @Timed
    public List<CountyDTO> getAllCounties() {
        log.debug("REST request to get all Counties");
        return countyService.findAll();
        }

    /**
     * GET  /counties/:id : get the "id" county.
     *
     * @param id the id of the countyDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the countyDTO, or with status 404 (Not Found)
     */
    @GetMapping("/counties/{id}")
    @Timed
    public ResponseEntity<CountyDTO> getCounty(@PathVariable Long id) {
        log.debug("REST request to get County : {}", id);
        CountyDTO countyDTO = countyService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(countyDTO));
    }

    /**
     * DELETE  /counties/:id : delete the "id" county.
     *
     * @param id the id of the countyDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/counties/{id}")
    @Timed
    public ResponseEntity<Void> deleteCounty(@PathVariable Long id) {
        log.debug("REST request to delete County : {}", id);
        countyService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/counties?query=:query : search for the county corresponding
     * to the query.
     *
     * @param query the query of the county search
     * @return the result of the search
     */
    @GetMapping("/_search/counties")
    @Timed
    public List<CountyDTO> searchCounties(@RequestParam String query) {
        log.debug("REST request to search Counties for query {}", query);
        return countyService.search(query);
    }

}
