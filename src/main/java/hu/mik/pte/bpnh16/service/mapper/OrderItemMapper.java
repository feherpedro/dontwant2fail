package hu.mik.pte.bpnh16.service.mapper;

import hu.mik.pte.bpnh16.domain.*;
import hu.mik.pte.bpnh16.service.dto.OrderItemDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity OrderItem and its DTO OrderItemDTO.
 */
@Mapper(componentModel = "spring", uses = {OrderEntityMapper.class, StorageMapper.class, ProductMapper.class, DictionaryMapper.class})
public interface OrderItemMapper extends EntityMapper<OrderItemDTO, OrderItem> {

    @Mapping(source = "order.id", target = "orderId")
    @Mapping(source = "storage.id", target = "storageId")
    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "status.id", target = "statusId")
    OrderItemDTO toDto(OrderItem orderItem);

    @Mapping(source = "orderId", target = "order")
    @Mapping(source = "storageId", target = "storage")
    @Mapping(source = "productId", target = "product")
    @Mapping(source = "statusId", target = "status")
    OrderItem toEntity(OrderItemDTO orderItemDTO);

    default OrderItem fromId(Long id) {
        if (id == null) {
            return null;
        }
        OrderItem orderItem = new OrderItem();
        orderItem.setId(id);
        return orderItem;
    }
}
