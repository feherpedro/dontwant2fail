import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ProductCategoryMag } from './product-category-mag.model';
import { ProductCategoryMagService } from './product-category-mag.service';

@Component({
    selector: 'jhi-product-category-mag-detail',
    templateUrl: './product-category-mag-detail.component.html'
})
export class ProductCategoryMagDetailComponent implements OnInit, OnDestroy {

    productCategory: ProductCategoryMag;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private productCategoryService: ProductCategoryMagService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProductCategories();
    }

    load(id) {
        this.productCategoryService.find(id)
            .subscribe((productCategoryResponse: HttpResponse<ProductCategoryMag>) => {
                this.productCategory = productCategoryResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProductCategories() {
        this.eventSubscriber = this.eventManager.subscribe(
            'productCategoryListModification',
            (response) => this.load(this.productCategory.id)
        );
    }
}
