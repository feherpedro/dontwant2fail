import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Dontwant2FailProductMagModule } from './product-mag/product-mag.module';
import { Dontwant2FailStoreMagModule } from './store-mag/store-mag.module';
import { Dontwant2FailStorageMagModule } from './storage-mag/storage-mag.module';
import { Dontwant2FailProductCategoryMagModule } from './product-category-mag/product-category-mag.module';
import { Dontwant2FailPriceCategoryMagModule } from './price-category-mag/price-category-mag.module';
import { Dontwant2FailDictionaryMagModule } from './dictionary-mag/dictionary-mag.module';
import { Dontwant2FailCountyMagModule } from './county-mag/county-mag.module';
import { Dontwant2FailProductStorageMagModule } from './product-storage-mag/product-storage-mag.module';
import { Dontwant2FailOrderEntityMagModule } from './order-entity-mag/order-entity-mag.module';
import { Dontwant2FailOrderItemMagModule } from './order-item-mag/order-item-mag.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        Dontwant2FailProductMagModule,
        Dontwant2FailStoreMagModule,
        Dontwant2FailStorageMagModule,
        Dontwant2FailProductCategoryMagModule,
        Dontwant2FailPriceCategoryMagModule,
        Dontwant2FailDictionaryMagModule,
        Dontwant2FailCountyMagModule,
        Dontwant2FailProductStorageMagModule,
        Dontwant2FailOrderEntityMagModule,
        Dontwant2FailOrderItemMagModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Dontwant2FailEntityModule {}
