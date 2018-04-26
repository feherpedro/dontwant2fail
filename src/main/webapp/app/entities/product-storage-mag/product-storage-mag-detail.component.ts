import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ProductStorageMag } from './product-storage-mag.model';
import { ProductStorageMagService } from './product-storage-mag.service';

@Component({
    selector: 'jhi-product-storage-mag-detail',
    templateUrl: './product-storage-mag-detail.component.html'
})
export class ProductStorageMagDetailComponent implements OnInit, OnDestroy {

    productStorage: ProductStorageMag;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private productStorageService: ProductStorageMagService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProductStorages();
    }

    load(id) {
        this.productStorageService.find(id)
            .subscribe((productStorageResponse: HttpResponse<ProductStorageMag>) => {
                this.productStorage = productStorageResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProductStorages() {
        this.eventSubscriber = this.eventManager.subscribe(
            'productStorageListModification',
            (response) => this.load(this.productStorage.id)
        );
    }
}
