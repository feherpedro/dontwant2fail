package hu.mik.pte.bpnh16.service.mapper;

import hu.mik.pte.bpnh16.domain.*;
import hu.mik.pte.bpnh16.service.dto.StorageDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Storage and its DTO StorageDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface StorageMapper extends EntityMapper<StorageDTO, Storage> {



    default Storage fromId(Long id) {
        if (id == null) {
            return null;
        }
        Storage storage = new Storage();
        storage.setId(id);
        return storage;
    }
}
