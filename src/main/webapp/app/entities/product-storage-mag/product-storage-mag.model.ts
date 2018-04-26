import { BaseEntity } from './../../shared';

export class ProductStorageMag implements BaseEntity {
    constructor(
        public id?: number,
        public quantity?: number,
        public productId?: number,
        public storageId?: number,
        public statusId?: number,
    ) {
    }
}
