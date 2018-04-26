import { BaseEntity } from './../../shared';

export class OrderEntityMag implements BaseEntity {
    constructor(
        public id?: number,
        public createDate?: any,
        public paymentDate?: any,
        public dueDate?: any,
        public storeId?: number,
        public statusId?: number,
    ) {
    }
}
