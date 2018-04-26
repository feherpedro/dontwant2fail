import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Dontwant2FailSharedModule } from '../../shared';
import {
    CountyMagService,
    CountyMagPopupService,
    CountyMagComponent,
    CountyMagDetailComponent,
    CountyMagDialogComponent,
    CountyMagPopupComponent,
    CountyMagDeletePopupComponent,
    CountyMagDeleteDialogComponent,
    countyRoute,
    countyPopupRoute,
} from './';

const ENTITY_STATES = [
    ...countyRoute,
    ...countyPopupRoute,
];

@NgModule({
    imports: [
        Dontwant2FailSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CountyMagComponent,
        CountyMagDetailComponent,
        CountyMagDialogComponent,
        CountyMagDeleteDialogComponent,
        CountyMagPopupComponent,
        CountyMagDeletePopupComponent,
    ],
    entryComponents: [
        CountyMagComponent,
        CountyMagDialogComponent,
        CountyMagPopupComponent,
        CountyMagDeleteDialogComponent,
        CountyMagDeletePopupComponent,
    ],
    providers: [
        CountyMagService,
        CountyMagPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Dontwant2FailCountyMagModule {}
