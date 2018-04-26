import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProductMag } from './product-mag.model';
import { ProductMagService } from './product-mag.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-product-mag',
    templateUrl: './product-mag.component.html'
})
export class ProductMagComponent implements OnInit, OnDestroy {
products: ProductMag[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private productService: ProductMagService,
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
            this.productService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<ProductMag[]>) => this.products = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.productService.query().subscribe(
            (res: HttpResponse<ProductMag[]>) => {
                this.products = res.body;
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
        this.registerChangeInProducts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ProductMag) {
        return item.id;
    }
    registerChangeInProducts() {
        this.eventSubscriber = this.eventManager.subscribe('productListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
