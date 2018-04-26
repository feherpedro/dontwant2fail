import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Dontwant2FailSharedModule } from '../../shared';
import {
    OrderItemMagService,
    OrderItemMagPopupService,
    OrderItemMagComponent,
    OrderItemMagDetailComponent,
    OrderItemMagDialogComponent,
    OrderItemMagPopupComponent,
    OrderItemMagDeletePopupComponent,
    OrderItemMagDeleteDialogComponent,
    orderItemRoute,
    orderItemPopupRoute,
} from './';

const ENTITY_STATES = [
    ...orderItemRoute,
    ...orderItemPopupRoute,
];

@NgModule({
    imports: [
        Dontwant2FailSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OrderItemMagComponent,
        OrderItemMagDetailComponent,
        OrderItemMagDialogComponent,
        OrderItemMagDeleteDialogComponent,
        OrderItemMagPopupComponent,
        OrderItemMagDeletePopupComponent,
    ],
    entryComponents: [
        OrderItemMagComponent,
        OrderItemMagDialogComponent,
        OrderItemMagPopupComponent,
        OrderItemMagDeleteDialogComponent,
        OrderItemMagDeletePopupComponent,
    ],
    providers: [
        OrderItemMagService,
        OrderItemMagPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Dontwant2FailOrderItemMagModule {}
