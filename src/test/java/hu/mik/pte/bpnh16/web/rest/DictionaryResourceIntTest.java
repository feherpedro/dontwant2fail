package hu.mik.pte.bpnh16.web.rest;

import hu.mik.pte.bpnh16.Dontwant2FailApp;

import hu.mik.pte.bpnh16.domain.Dictionary;
import hu.mik.pte.bpnh16.repository.DictionaryRepository;
import hu.mik.pte.bpnh16.service.DictionaryService;
import hu.mik.pte.bpnh16.repository.search.DictionarySearchRepository;
import hu.mik.pte.bpnh16.service.dto.DictionaryDTO;
import hu.mik.pte.bpnh16.service.mapper.DictionaryMapper;
import hu.mik.pte.bpnh16.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static hu.mik.pte.bpnh16.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DictionaryResource REST controller.
 *
 * @see DictionaryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Dontwant2FailApp.class)
public class DictionaryResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    @Autowired
    private DictionaryRepository dictionaryRepository;

    @Autowired
    private DictionaryMapper dictionaryMapper;

    @Autowired
    private DictionaryService dictionaryService;

    @Autowired
    private DictionarySearchRepository dictionarySearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDictionaryMockMvc;

    private Dictionary dictionary;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DictionaryResource dictionaryResource = new DictionaryResource(dictionaryService);
        this.restDictionaryMockMvc = MockMvcBuilders.standaloneSetup(dictionaryResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Dictionary createEntity(EntityManager em) {
        Dictionary dictionary = new Dictionary()
            .name(DEFAULT_NAME)
            .code(DEFAULT_CODE);
        return dictionary;
    }

    @Before
    public void initTest() {
        dictionarySearchRepository.deleteAll();
        dictionary = createEntity(em);
    }

    @Test
    @Transactional
    public void createDictionary() throws Exception {
        int databaseSizeBeforeCreate = dictionaryRepository.findAll().size();

        // Create the Dictionary
        DictionaryDTO dictionaryDTO = dictionaryMapper.toDto(dictionary);
        restDictionaryMockMvc.perform(post("/api/dictionaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dictionaryDTO)))
            .andExpect(status().isCreated());

        // Validate the Dictionary in the database
        List<Dictionary> dictionaryList = dictionaryRepository.findAll();
        assertThat(dictionaryList).hasSize(databaseSizeBeforeCreate + 1);
        Dictionary testDictionary = dictionaryList.get(dictionaryList.size() - 1);
        assertThat(testDictionary.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testDictionary.getCode()).isEqualTo(DEFAULT_CODE);

        // Validate the Dictionary in Elasticsearch
        Dictionary dictionaryEs = dictionarySearchRepository.findOne(testDictionary.getId());
        assertThat(dictionaryEs).isEqualToIgnoringGivenFields(testDictionary);
    }

    @Test
    @Transactional
    public void createDictionaryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dictionaryRepository.findAll().size();

        // Create the Dictionary with an existing ID
        dictionary.setId(1L);
        DictionaryDTO dictionaryDTO = dictionaryMapper.toDto(dictionary);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDictionaryMockMvc.perform(post("/api/dictionaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dictionaryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Dictionary in the database
        List<Dictionary> dictionaryList = dictionaryRepository.findAll();
        assertThat(dictionaryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDictionaries() throws Exception {
        // Initialize the database
        dictionaryRepository.saveAndFlush(dictionary);

        // Get all the dictionaryList
        restDictionaryMockMvc.perform(get("/api/dictionaries?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dictionary.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())));
    }

    @Test
    @Transactional
    public void getDictionary() throws Exception {
        // Initialize the database
        dictionaryRepository.saveAndFlush(dictionary);

        // Get the dictionary
        restDictionaryMockMvc.perform(get("/api/dictionaries/{id}", dictionary.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dictionary.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDictionary() throws Exception {
        // Get the dictionary
        restDictionaryMockMvc.perform(get("/api/dictionaries/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDictionary() throws Exception {
        // Initialize the database
        dictionaryRepository.saveAndFlush(dictionary);
        dictionarySearchRepository.save(dictionary);
        int databaseSizeBeforeUpdate = dictionaryRepository.findAll().size();

        // Update the dictionary
        Dictionary updatedDictionary = dictionaryRepository.findOne(dictionary.getId());
        // Disconnect from session so that the updates on updatedDictionary are not directly saved in db
        em.detach(updatedDictionary);
        updatedDictionary
            .name(UPDATED_NAME)
            .code(UPDATED_CODE);
        DictionaryDTO dictionaryDTO = dictionaryMapper.toDto(updatedDictionary);

        restDictionaryMockMvc.perform(put("/api/dictionaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dictionaryDTO)))
            .andExpect(status().isOk());

        // Validate the Dictionary in the database
        List<Dictionary> dictionaryList = dictionaryRepository.findAll();
        assertThat(dictionaryList).hasSize(databaseSizeBeforeUpdate);
        Dictionary testDictionary = dictionaryList.get(dictionaryList.size() - 1);
        assertThat(testDictionary.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testDictionary.getCode()).isEqualTo(UPDATED_CODE);

        // Validate the Dictionary in Elasticsearch
        Dictionary dictionaryEs = dictionarySearchRepository.findOne(testDictionary.getId());
        assertThat(dictionaryEs).isEqualToIgnoringGivenFields(testDictionary);
    }

    @Test
    @Transactional
    public void updateNonExistingDictionary() throws Exception {
        int databaseSizeBeforeUpdate = dictionaryRepository.findAll().size();

        // Create the Dictionary
        DictionaryDTO dictionaryDTO = dictionaryMapper.toDto(dictionary);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDictionaryMockMvc.perform(put("/api/dictionaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dictionaryDTO)))
            .andExpect(status().isCreated());

        // Validate the Dictionary in the database
        List<Dictionary> dictionaryList = dictionaryRepository.findAll();
        assertThat(dictionaryList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDictionary() throws Exception {
        // Initialize the database
        dictionaryRepository.saveAndFlush(dictionary);
        dictionarySearchRepository.save(dictionary);
        int databaseSizeBeforeDelete = dictionaryRepository.findAll().size();

        // Get the dictionary
        restDictionaryMockMvc.perform(delete("/api/dictionaries/{id}", dictionary.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean dictionaryExistsInEs = dictionarySearchRepository.exists(dictionary.getId());
        assertThat(dictionaryExistsInEs).isFalse();

        // Validate the database is empty
        List<Dictionary> dictionaryList = dictionaryRepository.findAll();
        assertThat(dictionaryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchDictionary() throws Exception {
        // Initialize the database
        dictionaryRepository.saveAndFlush(dictionary);
        dictionarySearchRepository.save(dictionary);

        // Search the dictionary
        restDictionaryMockMvc.perform(get("/api/_search/dictionaries?query=id:" + dictionary.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dictionary.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Dictionary.class);
        Dictionary dictionary1 = new Dictionary();
        dictionary1.setId(1L);
        Dictionary dictionary2 = new Dictionary();
        dictionary2.setId(dictionary1.getId());
        assertThat(dictionary1).isEqualTo(dictionary2);
        dictionary2.setId(2L);
        assertThat(dictionary1).isNotEqualTo(dictionary2);
        dictionary1.setId(null);
        assertThat(dictionary1).isNotEqualTo(dictionary2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DictionaryDTO.class);
        DictionaryDTO dictionaryDTO1 = new DictionaryDTO();
        dictionaryDTO1.setId(1L);
        DictionaryDTO dictionaryDTO2 = new DictionaryDTO();
        assertThat(dictionaryDTO1).isNotEqualTo(dictionaryDTO2);
        dictionaryDTO2.setId(dictionaryDTO1.getId());
        assertThat(dictionaryDTO1).isEqualTo(dictionaryDTO2);
        dictionaryDTO2.setId(2L);
        assertThat(dictionaryDTO1).isNotEqualTo(dictionaryDTO2);
        dictionaryDTO1.setId(null);
        assertThat(dictionaryDTO1).isNotEqualTo(dictionaryDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(dictionaryMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(dictionaryMapper.fromId(null)).isNull();
    }
}
