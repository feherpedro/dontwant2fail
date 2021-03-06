package hu.mik.pte.bpnh16.web.rest;

import hu.mik.pte.bpnh16.Dontwant2FailApp;

import hu.mik.pte.bpnh16.domain.Storage;
import hu.mik.pte.bpnh16.repository.StorageRepository;
import hu.mik.pte.bpnh16.service.StorageService;
import hu.mik.pte.bpnh16.repository.search.StorageSearchRepository;
import hu.mik.pte.bpnh16.service.dto.StorageDTO;
import hu.mik.pte.bpnh16.service.mapper.StorageMapper;
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
 * Test class for the StorageResource REST controller.
 *
 * @see StorageResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Dontwant2FailApp.class)
public class StorageResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Boolean DEFAULT_OWN = false;
    private static final Boolean UPDATED_OWN = true;

    private static final Boolean DEFAULT_PRIMARY = false;
    private static final Boolean UPDATED_PRIMARY = true;

    @Autowired
    private StorageRepository storageRepository;

    @Autowired
    private StorageMapper storageMapper;

    @Autowired
    private StorageService storageService;

    @Autowired
    private StorageSearchRepository storageSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restStorageMockMvc;

    private Storage storage;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StorageResource storageResource = new StorageResource(storageService);
        this.restStorageMockMvc = MockMvcBuilders.standaloneSetup(storageResource)
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
    public static Storage createEntity(EntityManager em) {
        Storage storage = new Storage()
            .name(DEFAULT_NAME)
            .own(DEFAULT_OWN)
            .primary(DEFAULT_PRIMARY);
        return storage;
    }

    @Before
    public void initTest() {
        storageSearchRepository.deleteAll();
        storage = createEntity(em);
    }

    @Test
    @Transactional
    public void createStorage() throws Exception {
        int databaseSizeBeforeCreate = storageRepository.findAll().size();

        // Create the Storage
        StorageDTO storageDTO = storageMapper.toDto(storage);
        restStorageMockMvc.perform(post("/api/storages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(storageDTO)))
            .andExpect(status().isCreated());

        // Validate the Storage in the database
        List<Storage> storageList = storageRepository.findAll();
        assertThat(storageList).hasSize(databaseSizeBeforeCreate + 1);
        Storage testStorage = storageList.get(storageList.size() - 1);
        assertThat(testStorage.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testStorage.isOwn()).isEqualTo(DEFAULT_OWN);
        assertThat(testStorage.isPrimary()).isEqualTo(DEFAULT_PRIMARY);

        // Validate the Storage in Elasticsearch
        Storage storageEs = storageSearchRepository.findOne(testStorage.getId());
        assertThat(storageEs).isEqualToIgnoringGivenFields(testStorage);
    }

    @Test
    @Transactional
    public void createStorageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = storageRepository.findAll().size();

        // Create the Storage with an existing ID
        storage.setId(1L);
        StorageDTO storageDTO = storageMapper.toDto(storage);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStorageMockMvc.perform(post("/api/storages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(storageDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Storage in the database
        List<Storage> storageList = storageRepository.findAll();
        assertThat(storageList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllStorages() throws Exception {
        // Initialize the database
        storageRepository.saveAndFlush(storage);

        // Get all the storageList
        restStorageMockMvc.perform(get("/api/storages?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(storage.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].own").value(hasItem(DEFAULT_OWN.booleanValue())))
            .andExpect(jsonPath("$.[*].primary").value(hasItem(DEFAULT_PRIMARY.booleanValue())));
    }

    @Test
    @Transactional
    public void getStorage() throws Exception {
        // Initialize the database
        storageRepository.saveAndFlush(storage);

        // Get the storage
        restStorageMockMvc.perform(get("/api/storages/{id}", storage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(storage.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.own").value(DEFAULT_OWN.booleanValue()))
            .andExpect(jsonPath("$.primary").value(DEFAULT_PRIMARY.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingStorage() throws Exception {
        // Get the storage
        restStorageMockMvc.perform(get("/api/storages/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStorage() throws Exception {
        // Initialize the database
        storageRepository.saveAndFlush(storage);
        storageSearchRepository.save(storage);
        int databaseSizeBeforeUpdate = storageRepository.findAll().size();

        // Update the storage
        Storage updatedStorage = storageRepository.findOne(storage.getId());
        // Disconnect from session so that the updates on updatedStorage are not directly saved in db
        em.detach(updatedStorage);
        updatedStorage
            .name(UPDATED_NAME)
            .own(UPDATED_OWN)
            .primary(UPDATED_PRIMARY);
        StorageDTO storageDTO = storageMapper.toDto(updatedStorage);

        restStorageMockMvc.perform(put("/api/storages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(storageDTO)))
            .andExpect(status().isOk());

        // Validate the Storage in the database
        List<Storage> storageList = storageRepository.findAll();
        assertThat(storageList).hasSize(databaseSizeBeforeUpdate);
        Storage testStorage = storageList.get(storageList.size() - 1);
        assertThat(testStorage.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testStorage.isOwn()).isEqualTo(UPDATED_OWN);
        assertThat(testStorage.isPrimary()).isEqualTo(UPDATED_PRIMARY);

        // Validate the Storage in Elasticsearch
        Storage storageEs = storageSearchRepository.findOne(testStorage.getId());
        assertThat(storageEs).isEqualToIgnoringGivenFields(testStorage);
    }

    @Test
    @Transactional
    public void updateNonExistingStorage() throws Exception {
        int databaseSizeBeforeUpdate = storageRepository.findAll().size();

        // Create the Storage
        StorageDTO storageDTO = storageMapper.toDto(storage);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restStorageMockMvc.perform(put("/api/storages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(storageDTO)))
            .andExpect(status().isCreated());

        // Validate the Storage in the database
        List<Storage> storageList = storageRepository.findAll();
        assertThat(storageList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteStorage() throws Exception {
        // Initialize the database
        storageRepository.saveAndFlush(storage);
        storageSearchRepository.save(storage);
        int databaseSizeBeforeDelete = storageRepository.findAll().size();

        // Get the storage
        restStorageMockMvc.perform(delete("/api/storages/{id}", storage.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean storageExistsInEs = storageSearchRepository.exists(storage.getId());
        assertThat(storageExistsInEs).isFalse();

        // Validate the database is empty
        List<Storage> storageList = storageRepository.findAll();
        assertThat(storageList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchStorage() throws Exception {
        // Initialize the database
        storageRepository.saveAndFlush(storage);
        storageSearchRepository.save(storage);

        // Search the storage
        restStorageMockMvc.perform(get("/api/_search/storages?query=id:" + storage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(storage.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].own").value(hasItem(DEFAULT_OWN.booleanValue())))
            .andExpect(jsonPath("$.[*].primary").value(hasItem(DEFAULT_PRIMARY.booleanValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Storage.class);
        Storage storage1 = new Storage();
        storage1.setId(1L);
        Storage storage2 = new Storage();
        storage2.setId(storage1.getId());
        assertThat(storage1).isEqualTo(storage2);
        storage2.setId(2L);
        assertThat(storage1).isNotEqualTo(storage2);
        storage1.setId(null);
        assertThat(storage1).isNotEqualTo(storage2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(StorageDTO.class);
        StorageDTO storageDTO1 = new StorageDTO();
        storageDTO1.setId(1L);
        StorageDTO storageDTO2 = new StorageDTO();
        assertThat(storageDTO1).isNotEqualTo(storageDTO2);
        storageDTO2.setId(storageDTO1.getId());
        assertThat(storageDTO1).isEqualTo(storageDTO2);
        storageDTO2.setId(2L);
        assertThat(storageDTO1).isNotEqualTo(storageDTO2);
        storageDTO1.setId(null);
        assertThat(storageDTO1).isNotEqualTo(storageDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(storageMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(storageMapper.fromId(null)).isNull();
    }
}
