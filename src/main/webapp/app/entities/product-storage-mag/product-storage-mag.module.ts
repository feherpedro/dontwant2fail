import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Dontwant2FailSharedModule } from '../../shared';
import {
    ProductStorageMagService,
    ProductStorageMagPopupService,
    ProductStorageMagComponent,
    ProductStorageMagDetailComponent,
    ProductStorageMagDialogComponent,
    ProductStorageMagPopupComponent,
    ProductStorageMagDeletePopupComponent,
    ProductStorageMagDeleteDialogComponent,
    productStorageRoute,
    productStoragePopupRoute,
} from './';

const ENTITY_STATES = [
    ...productStorageRoute,
    ...productStoragePopupRoute,
];

@NgModule({
    imports: [
        Dontwant2FailSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProductStorageMagComponent,
        ProductStorageMagDetailComponent,
        ProductStorageMagDialogComponent,
        ProductStorageMagDeleteDialogComponent,
        ProductStorageMagPopupComponent,
        ProductStorageMagDeletePopupComponent,
    ],
    entryComponents: [
        ProductStorageMagComponent,
        ProductStorageMagDialogComponent,
        ProductStorageMagPopupComponent,
        ProductStorageMagDeleteDialogComponent,
        ProductStorageMagDeletePopupComponent,
    ],
    providers: [
        ProductStorageMagService,
        ProductStorageMagPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Dontwant2FailProductStorageMagModule {}
