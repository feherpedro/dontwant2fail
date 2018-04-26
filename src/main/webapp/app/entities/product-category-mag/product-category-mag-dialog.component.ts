import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProductCategoryMag } from './product-category-mag.model';
import { ProductCategoryMagPopupService } from './product-category-mag-popup.service';
import { ProductCategoryMagService } from './product-category-mag.service';

@Component({
    selector: 'jhi-product-category-mag-dialog',
    templateUrl: './product-category-mag-dialog.component.html'
})
export class ProductCategoryMagDialogComponent implements OnInit {

    productCategory: ProductCategoryMag;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private productCategoryService: ProductCategoryMagService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.productCategory.id !== undefined) {
            this.subscribeToSaveResponse(
                this.productCategoryService.update(this.productCategory));
        } else {
            this.subscribeToSaveResponse(
                this.productCategoryService.create(this.productCategory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ProductCategoryMag>>) {
        result.subscribe((res: HttpResponse<ProductCategoryMag>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ProductCategoryMag) {
        this.eventManager.broadcast({ name: 'productCategoryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-product-category-mag-popup',
    template: ''
})
export class ProductCategoryMagPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productCategoryPopupService: ProductCategoryMagPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.productCategoryPopupService
                    .open(ProductCategoryMagDialogComponent as Component, params['id']);
            } else {
                this.productCategoryPopupService
                    .open(ProductCategoryMagDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
