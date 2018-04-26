package hu.mik.pte.bpnh16.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A ProductStorage.
 */
@Entity
@Table(name = "product_storage")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "productstorage")
public class ProductStorage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "quantity")
    private Long quantity;

    @ManyToOne
    private Product product;

    @ManyToOne
    private Storage storage;

    @ManyToOne
    private Dictionary status;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getQuantity() {
        return quantity;
    }

    public ProductStorage quantity(Long quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public Product getProduct() {
        return product;
    }

    public ProductStorage product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Storage getStorage() {
        return storage;
    }

    public ProductStorage storage(Storage storage) {
        this.storage = storage;
        return this;
    }

    public void setStorage(Storage storage) {
        this.storage = storage;
    }

    public Dictionary getStatus() {
        return status;
    }

    public ProductStorage status(Dictionary dictionary) {
        this.status = dictionary;
        return this;
    }

    public void setStatus(Dictionary dictionary) {
        this.status = dictionary;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ProductStorage productStorage = (ProductStorage) o;
        if (productStorage.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productStorage.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductStorage{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            "}";
    }
}
