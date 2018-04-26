import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Dontwant2FailSharedModule } from '../../shared';
import {
    StoreMagService,
    StoreMagPopupService,
    StoreMagComponent,
    StoreMagDetailComponent,
    StoreMagDialogComponent,
    StoreMagPopupComponent,
    StoreMagDeletePopupComponent,
    StoreMagDeleteDialogComponent,
    storeRoute,
    storePopupRoute,
} from './';

const ENTITY_STATES = [
    ...storeRoute,
    ...storePopupRoute,
];

@NgModule({
    imports: [
        Dontwant2FailSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        StoreMagComponent,
        StoreMagDetailComponent,
        StoreMagDialogComponent,
        StoreMagDeleteDialogComponent,
        StoreMagPopupComponent,
        StoreMagDeletePopupComponent,
    ],
    entryComponents: [
        StoreMagComponent,
        StoreMagDialogComponent,
        StoreMagPopupComponent,
        StoreMagDeleteDialogComponent,
        StoreMagDeletePopupComponent,
    ],
    providers: [
        StoreMagService,
        StoreMagPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Dontwant2FailStoreMagModule {}
