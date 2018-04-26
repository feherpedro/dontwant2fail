package hu.mik.pte.bpnh16.service.dto;


import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Storage entity.
 */
public class StorageDTO implements Serializable {

    private Long id;

    private String name;

    private Boolean own;

    private Boolean primary;

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

    public Boolean isOwn() {
        return own;
    }

    public void setOwn(Boolean own) {
        this.own = own;
    }

    public Boolean isPrimary() {
        return primary;
    }

    public void setPrimary(Boolean primary) {
        this.primary = primary;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        StorageDTO storageDTO = (StorageDTO) o;
        if(storageDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), storageDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StorageDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", own='" + isOwn() + "'" +
            ", primary='" + isPrimary() + "'" +
            "}";
    }
}
