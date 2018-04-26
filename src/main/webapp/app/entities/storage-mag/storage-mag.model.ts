import { BaseEntity } from './../../shared';

export class StorageMag implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public own?: boolean,
        public primary?: boolean,
    ) {
        this.own = false;
        this.primary = false;
    }
}
