import { BaseEntity } from './../../shared';

export class ProductCategoryMag implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
    ) {
    }
}
