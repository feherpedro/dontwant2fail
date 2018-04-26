import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProductStorageMag } from './product-storage-mag.model';
import { ProductStorageMagService } from './product-storage-mag.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-product-storage-mag',
    templateUrl: './product-storage-mag.component.html'
})
export class ProductStorageMagComponent implements OnInit, OnDestroy {
productStorages: ProductStorageMag[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private productStorageService: ProductStorageMagService,
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
            this.productStorageService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<ProductStorageMag[]>) => this.productStorages = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.productStorageService.query().subscribe(
            (res: HttpResponse<ProductStorageMag[]>) => {
                this.productStorages = res.body;
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
        this.registerChangeInProductStorages();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ProductStorageMag) {
        return item.id;
    }
    registerChangeInProductStorages() {
        this.eventSubscriber = this.eventManager.subscribe('productStorageListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
