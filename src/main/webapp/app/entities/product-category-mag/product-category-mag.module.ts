import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Dontwant2FailSharedModule } from '../../shared';
import {
    ProductCategoryMagService,
    ProductCategoryMagPopupService,
    ProductCategoryMagComponent,
    ProductCategoryMagDetailComponent,
    ProductCategoryMagDialogComponent,
    ProductCategoryMagPopupComponent,
    ProductCategoryMagDeletePopupComponent,
    ProductCategoryMagDeleteDialogComponent,
    productCategoryRoute,
    productCategoryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...productCategoryRoute,
    ...productCategoryPopupRoute,
];

@NgModule({
    imports: [
        Dontwant2FailSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProductCategoryMagComponent,
        ProductCategoryMagDetailComponent,
        ProductCategoryMagDialogComponent,
        ProductCategoryMagDeleteDialogComponent,
        ProductCategoryMagPopupComponent,
        ProductCategoryMagDeletePopupComponent,
    ],
    entryComponents: [
        ProductCategoryMagComponent,
        ProductCategoryMagDialogComponent,
        ProductCategoryMagPopupComponent,
        ProductCategoryMagDeleteDialogComponent,
        ProductCategoryMagDeletePopupComponent,
    ],
    providers: [
        ProductCategoryMagService,
        ProductCategoryMagPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Dontwant2FailProductCategoryMagModule {}
