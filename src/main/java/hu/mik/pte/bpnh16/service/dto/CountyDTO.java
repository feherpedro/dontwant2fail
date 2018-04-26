package hu.mik.pte.bpnh16.service.dto;


import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the County entity.
 */
public class CountyDTO implements Serializable {

    private Long id;

    private String countyName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCountyName() {
        return countyName;
    }

    public void setCountyName(String countyName) {
        this.countyName = countyName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CountyDTO countyDTO = (CountyDTO) o;
        if(countyDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), countyDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CountyDTO{" +
            "id=" + getId() +
            ", countyName='" + getCountyName() + "'" +
            "}";
    }
}
