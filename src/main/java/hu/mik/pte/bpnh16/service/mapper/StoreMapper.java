package hu.mik.pte.bpnh16.service.mapper;

import hu.mik.pte.bpnh16.domain.*;
import hu.mik.pte.bpnh16.service.dto.StoreDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Store and its DTO StoreDTO.
 */
@Mapper(componentModel = "spring", uses = {StorageMapper.class, CountyMapper.class})
public interface StoreMapper extends EntityMapper<StoreDTO, Store> {

    @Mapping(source = "storage.id", target = "storageId")
    @Mapping(source = "county.id", target = "countyId")
    StoreDTO toDto(Store store);

    @Mapping(source = "storageId", target = "storage")
    @Mapping(source = "countyId", target = "county")
    Store toEntity(StoreDTO storeDTO);

    default Store fromId(Long id) {
        if (id == null) {
            return null;
        }
        Store store = new Store();
        store.setId(id);
        return store;
    }
}
