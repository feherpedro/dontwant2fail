package hu.mik.pte.bpnh16.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Store.
 */
@Entity
@Table(name = "store")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "store")
public class Store implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "zip")
    private Integer zip;

    @Column(name = "city")
    private String city;

    @Column(name = "address")
    private String address;

    @Column(name = "open_hours")
    private String openHours;

    @Column(name = "contact_name")
    private String contactName;

    @Column(name = "phone")
    private String phone;

    @Column(name = "phone_2")
    private String phone2;

    @OneToOne
    @JoinColumn(unique = true)
    private Storage storage;

    @ManyToOne
    private County county;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Store name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getZip() {
        return zip;
    }

    public Store zip(Integer zip) {
        this.zip = zip;
        return this;
    }

    public void setZip(Integer zip) {
        this.zip = zip;
    }

    public String getCity() {
        return city;
    }

    public Store city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public Store address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getOpenHours() {
        return openHours;
    }

    public Store openHours(String openHours) {
        this.openHours = openHours;
        return this;
    }

    public void setOpenHours(String openHours) {
        this.openHours = openHours;
    }

    public String getContactName() {
        return contactName;
    }

    public Store contactName(String contactName) {
        this.contactName = contactName;
        return this;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public String getPhone() {
        return phone;
    }

    public Store phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPhone2() {
        return phone2;
    }

    public Store phone2(String phone2) {
        this.phone2 = phone2;
        return this;
    }

    public void setPhone2(String phone2) {
        this.phone2 = phone2;
    }

    public Storage getStorage() {
        return storage;
    }

    public Store storage(Storage storage) {
        this.storage = storage;
        return this;
    }

    public void setStorage(Storage storage) {
        this.storage = storage;
    }

    public County getCounty() {
        return county;
    }

    public Store county(County county) {
        this.county = county;
        return this;
    }

    public void setCounty(County county) {
        this.county = county;
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
        Store store = (Store) o;
        if (store.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), store.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Store{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", zip=" + getZip() +
            ", city='" + getCity() + "'" +
            ", address='" + getAddress() + "'" +
            ", openHours='" + getOpenHours() + "'" +
            ", contactName='" + getContactName() + "'" +
            ", phone='" + getPhone() + "'" +
            ", phone2='" + getPhone2() + "'" +
            "}";
    }
}
