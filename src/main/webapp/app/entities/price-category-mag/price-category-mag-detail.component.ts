import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PriceCategoryMag } from './price-category-mag.model';
import { PriceCategoryMagService } from './price-category-mag.service';

@Component({
    selector: 'jhi-price-category-mag-detail',
    templateUrl: './price-category-mag-detail.component.html'
})
export class PriceCategoryMagDetailComponent implements OnInit, OnDestroy {

    priceCategory: PriceCategoryMag;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private priceCategoryService: PriceCategoryMagService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPriceCategories();
    }

    load(id) {
        this.priceCategoryService.find(id)
            .subscribe((priceCategoryResponse: HttpResponse<PriceCategoryMag>) => {
                this.priceCategory = priceCategoryResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPriceCategories() {
        this.eventSubscriber = this.eventManager.subscribe(
            'priceCategoryListModification',
            (response) => this.load(this.priceCategory.id)
        );
    }
}
