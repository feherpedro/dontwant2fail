import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProductMag } from './product-mag.model';
import { ProductMagPopupService } from './product-mag-popup.service';
import { ProductMagService } from './product-mag.service';
import { ProductCategoryMag, ProductCategoryMagService } from '../product-category-mag';
import { PriceCategoryMag, PriceCategoryMagService } from '../price-category-mag';

@Component({
    selector: 'jhi-product-mag-dialog',
    templateUrl: './product-mag-dialog.component.html'
})
export class ProductMagDialogComponent implements OnInit {

    product: ProductMag;
    isSaving: boolean;

    productcategories: ProductCategoryMag[];

    pricecategories: PriceCategoryMag[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private productService: ProductMagService,
        private productCategoryService: ProductCategoryMagService,
        private priceCategoryService: PriceCategoryMagService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.productCategoryService.query()
            .subscribe((res: HttpResponse<ProductCategoryMag[]>) => { this.productcategories = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.priceCategoryService.query()
            .subscribe((res: HttpResponse<PriceCategoryMag[]>) => { this.pricecategories = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.product.id !== undefined) {
            this.subscribeToSaveResponse(
                this.productService.update(this.product));
        } else {
            this.subscribeToSaveResponse(
                this.productService.create(this.product));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ProductMag>>) {
        result.subscribe((res: HttpResponse<ProductMag>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ProductMag) {
        this.eventManager.broadcast({ name: 'productListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProductCategoryById(index: number, item: ProductCategoryMag) {
        return item.id;
    }

    trackPriceCategoryById(index: number, item: PriceCategoryMag) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-product-mag-popup',
    template: ''
})
export class ProductMagPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productPopupService: ProductMagPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.productPopupService
                    .open(ProductMagDialogComponent as Component, params['id']);
            } else {
                this.productPopupService
                    .open(ProductMagDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
