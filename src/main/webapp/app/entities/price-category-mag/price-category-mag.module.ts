import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Dontwant2FailSharedModule } from '../../shared';
import {
    PriceCategoryMagService,
    PriceCategoryMagPopupService,
    PriceCategoryMagComponent,
    PriceCategoryMagDetailComponent,
    PriceCategoryMagDialogComponent,
    PriceCategoryMagPopupComponent,
    PriceCategoryMagDeletePopupComponent,
    PriceCategoryMagDeleteDialogComponent,
    priceCategoryRoute,
    priceCategoryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...priceCategoryRoute,
    ...priceCategoryPopupRoute,
];

@NgModule({
    imports: [
        Dontwant2FailSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PriceCategoryMagComponent,
        PriceCategoryMagDetailComponent,
        PriceCategoryMagDialogComponent,
        PriceCategoryMagDeleteDialogComponent,
        PriceCategoryMagPopupComponent,
        PriceCategoryMagDeletePopupComponent,
    ],
    entryComponents: [
        PriceCategoryMagComponent,
        PriceCategoryMagDialogComponent,
        PriceCategoryMagPopupComponent,
        PriceCategoryMagDeleteDialogComponent,
        PriceCategoryMagDeletePopupComponent,
    ],
    providers: [
        PriceCategoryMagService,
        PriceCategoryMagPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Dontwant2FailPriceCategoryMagModule {}
