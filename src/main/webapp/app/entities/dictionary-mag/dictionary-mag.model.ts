import { BaseEntity } from './../../shared';

export class DictionaryMag implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
    ) {
    }
}
