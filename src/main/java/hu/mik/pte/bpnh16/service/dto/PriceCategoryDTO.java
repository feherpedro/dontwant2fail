package hu.mik.pte.bpnh16.service.dto;


import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the PriceCategory entity.
 */
public class PriceCategoryDTO implements Serializable {

    private Long id;

    private String name;

    private Long price;

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

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PriceCategoryDTO priceCategoryDTO = (PriceCategoryDTO) o;
        if(priceCategoryDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), priceCategoryDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PriceCategoryDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", price=" + getPrice() +
            "}";
    }
}
