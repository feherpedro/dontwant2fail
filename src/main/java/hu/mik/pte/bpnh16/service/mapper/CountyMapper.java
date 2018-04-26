package hu.mik.pte.bpnh16.service.mapper;

import hu.mik.pte.bpnh16.domain.*;
import hu.mik.pte.bpnh16.service.dto.CountyDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity County and its DTO CountyDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CountyMapper extends EntityMapper<CountyDTO, County> {



    default County fromId(Long id) {
        if (id == null) {
            return null;
        }
        County county = new County();
        county.setId(id);
        return county;
    }
}
