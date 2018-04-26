import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Dontwant2FailSharedModule } from '../../shared';
import {
    ProductMagService,
    ProductMagPopupService,
    ProductMagComponent,
    ProductMagDetailComponent,
    ProductMagDialogComponent,
    ProductMagPopupComponent,
    ProductMagDeletePopupComponent,
    ProductMagDeleteDialogComponent,
    productRoute,
    productPopupRoute,
} from './';

const ENTITY_STATES = [
    ...productRoute,
    ...productPopupRoute,
];

@NgModule({
    imports: [
        Dontwant2FailSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProductMagComponent,
        ProductMagDetailComponent,
        ProductMagDialogComponent,
        ProductMagDeleteDialogComponent,
        ProductMagPopupComponent,
        ProductMagDeletePopupComponent,
    ],
    entryComponents: [
        ProductMagComponent,
        ProductMagDialogComponent,
        ProductMagPopupComponent,
        ProductMagDeleteDialogComponent,
        ProductMagDeletePopupComponent,
    ],
    providers: [
        ProductMagService,
        ProductMagPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Dontwant2FailProductMagModule {}
