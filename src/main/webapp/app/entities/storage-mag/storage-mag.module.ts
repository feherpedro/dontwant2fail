import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Dontwant2FailSharedModule } from '../../shared';
import {
    StorageMagService,
    StorageMagPopupService,
    StorageMagComponent,
    StorageMagDetailComponent,
    StorageMagDialogComponent,
    StorageMagPopupComponent,
    StorageMagDeletePopupComponent,
    StorageMagDeleteDialogComponent,
    storageRoute,
    storagePopupRoute,
} from './';

const ENTITY_STATES = [
    ...storageRoute,
    ...storagePopupRoute,
];

@NgModule({
    imports: [
        Dontwant2FailSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        StorageMagComponent,
        StorageMagDetailComponent,
        StorageMagDialogComponent,
        StorageMagDeleteDialogComponent,
        StorageMagPopupComponent,
        StorageMagDeletePopupComponent,
    ],
    entryComponents: [
        StorageMagComponent,
        StorageMagDialogComponent,
        StorageMagPopupComponent,
        StorageMagDeleteDialogComponent,
        StorageMagDeletePopupComponent,
    ],
    providers: [
        StorageMagService,
        StorageMagPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Dontwant2FailStorageMagModule {}
