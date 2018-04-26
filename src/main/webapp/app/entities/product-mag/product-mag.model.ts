import { BaseEntity } from './../../shared';

export class ProductMag implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public price?: number,
        public netPrice?: number,
        public vtsz?: string,
        public productCategoryId?: number,
        public priceCategoryId?: number,
    ) {
    }
}
