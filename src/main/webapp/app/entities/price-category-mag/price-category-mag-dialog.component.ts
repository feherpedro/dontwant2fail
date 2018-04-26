import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PriceCategoryMag } from './price-category-mag.model';
import { PriceCategoryMagPopupService } from './price-category-mag-popup.service';
import { PriceCategoryMagService } from './price-category-mag.service';

@Component({
    selector: 'jhi-price-category-mag-dialog',
    templateUrl: './price-category-mag-dialog.component.html'
})
export class PriceCategoryMagDialogComponent implements OnInit {

    priceCategory: PriceCategoryMag;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private priceCategoryService: PriceCategoryMagService,
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
        if (this.priceCategory.id !== undefined) {
            this.subscribeToSaveResponse(
                this.priceCategoryService.update(this.priceCategory));
        } else {
            this.subscribeToSaveResponse(
                this.priceCategoryService.create(this.priceCategory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PriceCategoryMag>>) {
        result.subscribe((res: HttpResponse<PriceCategoryMag>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PriceCategoryMag) {
        this.eventManager.broadcast({ name: 'priceCategoryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-price-category-mag-popup',
    template: ''
})
export class PriceCategoryMagPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private priceCategoryPopupService: PriceCategoryMagPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.priceCategoryPopupService
                    .open(PriceCategoryMagDialogComponent as Component, params['id']);
            } else {
                this.priceCategoryPopupService
                    .open(PriceCategoryMagDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
