package hu.mik.pte.bpnh16.web.rest;

import hu.mik.pte.bpnh16.Dontwant2FailApp;

import hu.mik.pte.bpnh16.domain.ProductStorage;
import hu.mik.pte.bpnh16.repository.ProductStorageRepository;
import hu.mik.pte.bpnh16.service.ProductStorageService;
import hu.mik.pte.bpnh16.repository.search.ProductStorageSearchRepository;
import hu.mik.pte.bpnh16.service.dto.ProductStorageDTO;
import hu.mik.pte.bpnh16.service.mapper.ProductStorageMapper;
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
 * Test class for the ProductStorageResource REST controller.
 *
 * @see ProductStorageResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Dontwant2FailApp.class)
public class ProductStorageResourceIntTest {

    private static final Long DEFAULT_QUANTITY = 1L;
    private static final Long UPDATED_QUANTITY = 2L;

    @Autowired
    private ProductStorageRepository productStorageRepository;

    @Autowired
    private ProductStorageMapper productStorageMapper;

    @Autowired
    private ProductStorageService productStorageService;

    @Autowired
    private ProductStorageSearchRepository productStorageSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restProductStorageMockMvc;

    private ProductStorage productStorage;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProductStorageResource productStorageResource = new ProductStorageResource(productStorageService);
        this.restProductStorageMockMvc = MockMvcBuilders.standaloneSetup(productStorageResource)
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
    public static ProductStorage createEntity(EntityManager em) {
        ProductStorage productStorage = new ProductStorage()
            .quantity(DEFAULT_QUANTITY);
        return productStorage;
    }

    @Before
    public void initTest() {
        productStorageSearchRepository.deleteAll();
        productStorage = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductStorage() throws Exception {
        int databaseSizeBeforeCreate = productStorageRepository.findAll().size();

        // Create the ProductStorage
        ProductStorageDTO productStorageDTO = productStorageMapper.toDto(productStorage);
        restProductStorageMockMvc.perform(post("/api/product-storages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productStorageDTO)))
            .andExpect(status().isCreated());

        // Validate the ProductStorage in the database
        List<ProductStorage> productStorageList = productStorageRepository.findAll();
        assertThat(productStorageList).hasSize(databaseSizeBeforeCreate + 1);
        ProductStorage testProductStorage = productStorageList.get(productStorageList.size() - 1);
        assertThat(testProductStorage.getQuantity()).isEqualTo(DEFAULT_QUANTITY);

        // Validate the ProductStorage in Elasticsearch
        ProductStorage productStorageEs = productStorageSearchRepository.findOne(testProductStorage.getId());
        assertThat(productStorageEs).isEqualToIgnoringGivenFields(testProductStorage);
    }

    @Test
    @Transactional
    public void createProductStorageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productStorageRepository.findAll().size();

        // Create the ProductStorage with an existing ID
        productStorage.setId(1L);
        ProductStorageDTO productStorageDTO = productStorageMapper.toDto(productStorage);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductStorageMockMvc.perform(post("/api/product-storages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productStorageDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ProductStorage in the database
        List<ProductStorage> productStorageList = productStorageRepository.findAll();
        assertThat(productStorageList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllProductStorages() throws Exception {
        // Initialize the database
        productStorageRepository.saveAndFlush(productStorage);

        // Get all the productStorageList
        restProductStorageMockMvc.perform(get("/api/product-storages?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productStorage.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY.intValue())));
    }

    @Test
    @Transactional
    public void getProductStorage() throws Exception {
        // Initialize the database
        productStorageRepository.saveAndFlush(productStorage);

        // Get the productStorage
        restProductStorageMockMvc.perform(get("/api/product-storages/{id}", productStorage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(productStorage.getId().intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingProductStorage() throws Exception {
        // Get the productStorage
        restProductStorageMockMvc.perform(get("/api/product-storages/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProductStorage() throws Exception {
        // Initialize the database
        productStorageRepository.saveAndFlush(productStorage);
        productStorageSearchRepository.save(productStorage);
        int databaseSizeBeforeUpdate = productStorageRepository.findAll().size();

        // Update the productStorage
        ProductStorage updatedProductStorage = productStorageRepository.findOne(productStorage.getId());
        // Disconnect from session so that the updates on updatedProductStorage are not directly saved in db
        em.detach(updatedProductStorage);
        updatedProductStorage
            .quantity(UPDATED_QUANTITY);
        ProductStorageDTO productStorageDTO = productStorageMapper.toDto(updatedProductStorage);

        restProductStorageMockMvc.perform(put("/api/product-storages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productStorageDTO)))
            .andExpect(status().isOk());

        // Validate the ProductStorage in the database
        List<ProductStorage> productStorageList = productStorageRepository.findAll();
        assertThat(productStorageList).hasSize(databaseSizeBeforeUpdate);
        ProductStorage testProductStorage = productStorageList.get(productStorageList.size() - 1);
        assertThat(testProductStorage.getQuantity()).isEqualTo(UPDATED_QUANTITY);

        // Validate the ProductStorage in Elasticsearch
        ProductStorage productStorageEs = productStorageSearchRepository.findOne(testProductStorage.getId());
        assertThat(productStorageEs).isEqualToIgnoringGivenFields(testProductStorage);
    }

    @Test
    @Transactional
    public void updateNonExistingProductStorage() throws Exception {
        int databaseSizeBeforeUpdate = productStorageRepository.findAll().size();

        // Create the ProductStorage
        ProductStorageDTO productStorageDTO = productStorageMapper.toDto(productStorage);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restProductStorageMockMvc.perform(put("/api/product-storages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productStorageDTO)))
            .andExpect(status().isCreated());

        // Validate the ProductStorage in the database
        List<ProductStorage> productStorageList = productStorageRepository.findAll();
        assertThat(productStorageList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteProductStorage() throws Exception {
        // Initialize the database
        productStorageRepository.saveAndFlush(productStorage);
        productStorageSearchRepository.save(productStorage);
        int databaseSizeBeforeDelete = productStorageRepository.findAll().size();

        // Get the productStorage
        restProductStorageMockMvc.perform(delete("/api/product-storages/{id}", productStorage.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean productStorageExistsInEs = productStorageSearchRepository.exists(productStorage.getId());
        assertThat(productStorageExistsInEs).isFalse();

        // Validate the database is empty
        List<ProductStorage> productStorageList = productStorageRepository.findAll();
        assertThat(productStorageList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchProductStorage() throws Exception {
        // Initialize the database
        productStorageRepository.saveAndFlush(productStorage);
        productStorageSearchRepository.save(productStorage);

        // Search the productStorage
        restProductStorageMockMvc.perform(get("/api/_search/product-storages?query=id:" + productStorage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productStorage.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY.intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductStorage.class);
        ProductStorage productStorage1 = new ProductStorage();
        productStorage1.setId(1L);
        ProductStorage productStorage2 = new ProductStorage();
        productStorage2.setId(productStorage1.getId());
        assertThat(productStorage1).isEqualTo(productStorage2);
        productStorage2.setId(2L);
        assertThat(productStorage1).isNotEqualTo(productStorage2);
        productStorage1.setId(null);
        assertThat(productStorage1).isNotEqualTo(productStorage2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductStorageDTO.class);
        ProductStorageDTO productStorageDTO1 = new ProductStorageDTO();
        productStorageDTO1.setId(1L);
        ProductStorageDTO productStorageDTO2 = new ProductStorageDTO();
        assertThat(productStorageDTO1).isNotEqualTo(productStorageDTO2);
        productStorageDTO2.setId(productStorageDTO1.getId());
        assertThat(productStorageDTO1).isEqualTo(productStorageDTO2);
        productStorageDTO2.setId(2L);
        assertThat(productStorageDTO1).isNotEqualTo(productStorageDTO2);
        productStorageDTO1.setId(null);
        assertThat(productStorageDTO1).isNotEqualTo(productStorageDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(productStorageMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(productStorageMapper.fromId(null)).isNull();
    }
}
