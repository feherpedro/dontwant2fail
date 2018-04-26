import { BaseEntity } from './../../shared';

export class OrderItemMag implements BaseEntity {
    constructor(
        public id?: number,
        public quantity?: number,
        public orderId?: number,
        public storageId?: number,
        public productId?: number,
        public statusId?: number,
    ) {
    }
}
