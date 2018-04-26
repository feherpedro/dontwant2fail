import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Dontwant2FailSharedModule } from '../../shared';
import {
    OrderEntityMagService,
    OrderEntityMagPopupService,
    OrderEntityMagComponent,
    OrderEntityMagDetailComponent,
    OrderEntityMagDialogComponent,
    OrderEntityMagPopupComponent,
    OrderEntityMagDeletePopupComponent,
    OrderEntityMagDeleteDialogComponent,
    orderEntityRoute,
    orderEntityPopupRoute,
} from './';

const ENTITY_STATES = [
    ...orderEntityRoute,
    ...orderEntityPopupRoute,
];

@NgModule({
    imports: [
        Dontwant2FailSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OrderEntityMagComponent,
        OrderEntityMagDetailComponent,
        OrderEntityMagDialogComponent,
        OrderEntityMagDeleteDialogComponent,
        OrderEntityMagPopupComponent,
        OrderEntityMagDeletePopupComponent,
    ],
    entryComponents: [
        OrderEntityMagComponent,
        OrderEntityMagDialogComponent,
        OrderEntityMagPopupComponent,
        OrderEntityMagDeleteDialogComponent,
        OrderEntityMagDeletePopupComponent,
    ],
    providers: [
        OrderEntityMagService,
        OrderEntityMagPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Dontwant2FailOrderEntityMagModule {}
