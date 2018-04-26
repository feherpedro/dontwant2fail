import { BaseEntity } from './../../shared';

export class CountyMag implements BaseEntity {
    constructor(
        public id?: number,
        public countyName?: string,
    ) {
    }
}
