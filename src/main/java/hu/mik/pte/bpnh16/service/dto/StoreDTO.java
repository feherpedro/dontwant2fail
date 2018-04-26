package hu.mik.pte.bpnh16.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Store entity.
 */
public class StoreDTO implements Serializable {

    private Long id;

    private String name;

    private Integer zip;

    private String city;

    private String address;

    private String openHours;

    private String contactName;

    private String phone;

    private String phone2;

    private Long storageId;

    private Long countyId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getZip() {
        return zip;
    }

    public void setZip(Integer zip) {
        this.zip = zip;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getOpenHours() {
        return openHours;
    }

    public void setOpenHours(String openHours) {
        this.openHours = openHours;
    }

    public String getContactName() {
        return contactName;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPhone2() {
        return phone2;
    }

    public void setPhone2(String phone2) {
        this.phone2 = phone2;
    }

    public Long getStorageId() {
        return storageId;
    }

    public void setStorageId(Long storageId) {
        this.storageId = storageId;
    }

    public Long getCountyId() {
        return countyId;
    }

    public void setCountyId(Long countyId) {
        this.countyId = countyId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        StoreDTO storeDTO = (StoreDTO) o;
        if(storeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), storeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StoreDTO{" +
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
