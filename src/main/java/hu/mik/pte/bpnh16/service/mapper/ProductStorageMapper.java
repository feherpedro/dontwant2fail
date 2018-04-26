package hu.mik.pte.bpnh16.service.mapper;

import hu.mik.pte.bpnh16.domain.*;
import hu.mik.pte.bpnh16.service.dto.ProductStorageDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ProductStorage and its DTO ProductStorageDTO.
 */
@Mapper(componentModel = "spring", uses = {ProductMapper.class, StorageMapper.class, DictionaryMapper.class})
public interface ProductStorageMapper extends EntityMapper<ProductStorageDTO, ProductStorage> {

    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "storage.id", target = "storageId")
    @Mapping(source = "status.id", target = "statusId")
    ProductStorageDTO toDto(ProductStorage productStorage);

    @Mapping(source = "productId", target = "product")
    @Mapping(source = "storageId", target = "storage")
    @Mapping(source = "statusId", target = "status")
    ProductStorage toEntity(ProductStorageDTO productStorageDTO);

    default ProductStorage fromId(Long id) {
        if (id == null) {
            return null;
        }
        ProductStorage productStorage = new ProductStorage();
        productStorage.setId(id);
        return productStorage;
    }
}
