import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PriceCategoryMag } from './price-category-mag.model';
import { PriceCategoryMagService } from './price-category-mag.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-price-category-mag',
    templateUrl: './price-category-mag.component.html'
})
export class PriceCategoryMagComponent implements OnInit, OnDestroy {
priceCategories: PriceCategoryMag[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private priceCategoryService: PriceCategoryMagService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.priceCategoryService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<PriceCategoryMag[]>) => this.priceCategories = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.priceCategoryService.query().subscribe(
            (res: HttpResponse<PriceCategoryMag[]>) => {
                this.priceCategories = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPriceCategories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PriceCategoryMag) {
        return item.id;
    }
    registerChangeInPriceCategories() {
        this.eventSubscriber = this.eventManager.subscribe('priceCategoryListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
