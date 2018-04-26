import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Dontwant2FailSharedModule } from '../../shared';
import {
    DictionaryMagService,
    DictionaryMagPopupService,
    DictionaryMagComponent,
    DictionaryMagDetailComponent,
    DictionaryMagDialogComponent,
    DictionaryMagPopupComponent,
    DictionaryMagDeletePopupComponent,
    DictionaryMagDeleteDialogComponent,
    dictionaryRoute,
    dictionaryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...dictionaryRoute,
    ...dictionaryPopupRoute,
];

@NgModule({
    imports: [
        Dontwant2FailSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DictionaryMagComponent,
        DictionaryMagDetailComponent,
        DictionaryMagDialogComponent,
        DictionaryMagDeleteDialogComponent,
        DictionaryMagPopupComponent,
        DictionaryMagDeletePopupComponent,
    ],
    entryComponents: [
        DictionaryMagComponent,
        DictionaryMagDialogComponent,
        DictionaryMagPopupComponent,
        DictionaryMagDeleteDialogComponent,
        DictionaryMagDeletePopupComponent,
    ],
    providers: [
        DictionaryMagService,
        DictionaryMagPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Dontwant2FailDictionaryMagModule {}
