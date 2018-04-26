import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OrderItemMag } from './order-item-mag.model';
import { OrderItemMagPopupService } from './order-item-mag-popup.service';
import { OrderItemMagService } from './order-item-mag.service';
import { OrderEntityMag, OrderEntityMagService } from '../order-entity-mag';
import { StorageMag, StorageMagService } from '../storage-mag';
import { ProductMag, ProductMagService } from '../product-mag';
import { DictionaryMag, DictionaryMagService } from '../dictionary-mag';

@Component({
    selector: 'jhi-order-item-mag-dialog',
    templateUrl: './order-item-mag-dialog.component.html'
})
export class OrderItemMagDialogComponent implements OnInit {

    orderItem: OrderItemMag;
    isSaving: boolean;

    orderentities: OrderEntityMag[];

    storages: StorageMag[];

    products: ProductMag[];

    dictionaries: DictionaryMag[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private orderItemService: OrderItemMagService,
        private orderEntityService: OrderEntityMagService,
        private storageService: StorageMagService,
        private productService: ProductMagService,
        private dictionaryService: DictionaryMagService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.orderEntityService.query()
            .subscribe((res: HttpResponse<OrderEntityMag[]>) => { this.orderentities = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.storageService.query()
            .subscribe((res: HttpResponse<StorageMag[]>) => { this.storages = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.productService.query()
            .subscribe((res: HttpResponse<ProductMag[]>) => { this.products = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.dictionaryService.query()
            .subscribe((res: HttpResponse<DictionaryMag[]>) => { this.dictionaries = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.orderItem.id !== undefined) {
            this.subscribeToSaveResponse(
                this.orderItemService.update(this.orderItem));
        } else {
            this.subscribeToSaveResponse(
                this.orderItemService.create(this.orderItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OrderItemMag>>) {
        result.subscribe((res: HttpResponse<OrderItemMag>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OrderItemMag) {
        this.eventManager.broadcast({ name: 'orderItemListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackOrderEntityById(index: number, item: OrderEntityMag) {
        return item.id;
    }

    trackStorageById(index: number, item: StorageMag) {
        return item.id;
    }

    trackProductById(index: number, item: ProductMag) {
        return item.id;
    }

    trackDictionaryById(index: number, item: DictionaryMag) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-order-item-mag-popup',
    template: ''
})
export class OrderItemMagPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderItemPopupService: OrderItemMagPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.orderItemPopupService
                    .open(OrderItemMagDialogComponent as Component, params['id']);
            } else {
                this.orderItemPopupService
                    .open(OrderItemMagDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
