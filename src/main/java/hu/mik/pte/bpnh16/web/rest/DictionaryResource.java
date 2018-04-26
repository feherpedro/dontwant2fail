package hu.mik.pte.bpnh16.web.rest;

import com.codahale.metrics.annotation.Timed;
import hu.mik.pte.bpnh16.service.DictionaryService;
import hu.mik.pte.bpnh16.web.rest.errors.BadRequestAlertException;
import hu.mik.pte.bpnh16.web.rest.util.HeaderUtil;
import hu.mik.pte.bpnh16.service.dto.DictionaryDTO;
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
 * REST controller for managing Dictionary.
 */
@RestController
@RequestMapping("/api")
public class DictionaryResource {

    private final Logger log = LoggerFactory.getLogger(DictionaryResource.class);

    private static final String ENTITY_NAME = "dictionary";

    private final DictionaryService dictionaryService;

    public DictionaryResource(DictionaryService dictionaryService) {
        this.dictionaryService = dictionaryService;
    }

    /**
     * POST  /dictionaries : Create a new dictionary.
     *
     * @param dictionaryDTO the dictionaryDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new dictionaryDTO, or with status 400 (Bad Request) if the dictionary has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/dictionaries")
    @Timed
    public ResponseEntity<DictionaryDTO> createDictionary(@RequestBody DictionaryDTO dictionaryDTO) throws URISyntaxException {
        log.debug("REST request to save Dictionary : {}", dictionaryDTO);
        if (dictionaryDTO.getId() != null) {
            throw new BadRequestAlertException("A new dictionary cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DictionaryDTO result = dictionaryService.save(dictionaryDTO);
        return ResponseEntity.created(new URI("/api/dictionaries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /dictionaries : Updates an existing dictionary.
     *
     * @param dictionaryDTO the dictionaryDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated dictionaryDTO,
     * or with status 400 (Bad Request) if the dictionaryDTO is not valid,
     * or with status 500 (Internal Server Error) if the dictionaryDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/dictionaries")
    @Timed
    public ResponseEntity<DictionaryDTO> updateDictionary(@RequestBody DictionaryDTO dictionaryDTO) throws URISyntaxException {
        log.debug("REST request to update Dictionary : {}", dictionaryDTO);
        if (dictionaryDTO.getId() == null) {
            return createDictionary(dictionaryDTO);
        }
        DictionaryDTO result = dictionaryService.save(dictionaryDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, dictionaryDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /dictionaries : get all the dictionaries.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of dictionaries in body
     */
    @GetMapping("/dictionaries")
    @Timed
    public List<DictionaryDTO> getAllDictionaries() {
        log.debug("REST request to get all Dictionaries");
        return dictionaryService.findAll();
        }

    /**
     * GET  /dictionaries/:id : get the "id" dictionary.
     *
     * @param id the id of the dictionaryDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the dictionaryDTO, or with status 404 (Not Found)
     */
    @GetMapping("/dictionaries/{id}")
    @Timed
    public ResponseEntity<DictionaryDTO> getDictionary(@PathVariable Long id) {
        log.debug("REST request to get Dictionary : {}", id);
        DictionaryDTO dictionaryDTO = dictionaryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(dictionaryDTO));
    }

    /**
     * DELETE  /dictionaries/:id : delete the "id" dictionary.
     *
     * @param id the id of the dictionaryDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/dictionaries/{id}")
    @Timed
    public ResponseEntity<Void> deleteDictionary(@PathVariable Long id) {
        log.debug("REST request to delete Dictionary : {}", id);
        dictionaryService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/dictionaries?query=:query : search for the dictionary corresponding
     * to the query.
     *
     * @param query the query of the dictionary search
     * @return the result of the search
     */
    @GetMapping("/_search/dictionaries")
    @Timed
    public List<DictionaryDTO> searchDictionaries(@RequestParam String query) {
        log.debug("REST request to search Dictionaries for query {}", query);
        return dictionaryService.search(query);
    }

}
