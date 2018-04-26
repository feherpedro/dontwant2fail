import { BaseEntity } from './../../shared';

export class StoreMag implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public zip?: number,
        public city?: string,
        public address?: string,
        public openHours?: string,
        public contactName?: string,
        public phone?: string,
        public phone2?: string,
        public storageId?: number,
        public countyId?: number,
    ) {
    }
}
