import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProductStorageMag } from './product-storage-mag.model';
import { ProductStorageMagPopupService } from './product-storage-mag-popup.service';
import { ProductStorageMagService } from './product-storage-mag.service';
import { ProductMag, ProductMagService } from '../product-mag';
import { StorageMag, StorageMagService } from '../storage-mag';
import { DictionaryMag, DictionaryMagService } from '../dictionary-mag';

@Component({
    selector: 'jhi-product-storage-mag-dialog',
    templateUrl: './product-storage-mag-dialog.component.html'
})
export class ProductStorageMagDialogComponent implements OnInit {

    productStorage: ProductStorageMag;
    isSaving: boolean;

    products: ProductMag[];

    storages: StorageMag[];

    dictionaries: DictionaryMag[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private productStorageService: ProductStorageMagService,
        private productService: ProductMagService,
        private storageService: StorageMagService,
        private dictionaryService: DictionaryMagService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.productService.query()
            .subscribe((res: HttpResponse<ProductMag[]>) => { this.products = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.storageService.query()
            .subscribe((res: HttpResponse<StorageMag[]>) => { this.storages = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.dictionaryService.query()
            .subscribe((res: HttpResponse<DictionaryMag[]>) => { this.dictionaries = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.productStorage.id !== undefined) {
            this.subscribeToSaveResponse(
                this.productStorageService.update(this.productStorage));
        } else {
            this.subscribeToSaveResponse(
                this.productStorageService.create(this.productStorage));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ProductStorageMag>>) {
        result.subscribe((res: HttpResponse<ProductStorageMag>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ProductStorageMag) {
        this.eventManager.broadcast({ name: 'productStorageListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProductById(index: number, item: ProductMag) {
        return item.id;
    }

    trackStorageById(index: number, item: StorageMag) {
        return item.id;
    }

    trackDictionaryById(index: number, item: DictionaryMag) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-product-storage-mag-popup',
    template: ''
})
export class ProductStorageMagPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productStoragePopupService: ProductStorageMagPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.productStoragePopupService
                    .open(ProductStorageMagDialogComponent as Component, params['id']);
            } else {
                this.productStoragePopupService
                    .open(ProductStorageMagDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
