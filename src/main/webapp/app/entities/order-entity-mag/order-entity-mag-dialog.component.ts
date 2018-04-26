import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OrderEntityMag } from './order-entity-mag.model';
import { OrderEntityMagPopupService } from './order-entity-mag-popup.service';
import { OrderEntityMagService } from './order-entity-mag.service';
import { StoreMag, StoreMagService } from '../store-mag';
import { DictionaryMag, DictionaryMagService } from '../dictionary-mag';

@Component({
    selector: 'jhi-order-entity-mag-dialog',
    templateUrl: './order-entity-mag-dialog.component.html'
})
export class OrderEntityMagDialogComponent implements OnInit {

    orderEntity: OrderEntityMag;
    isSaving: boolean;

    stores: StoreMag[];

    dictionaries: DictionaryMag[];
    createDateDp: any;
    paymentDateDp: any;
    dueDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private orderEntityService: OrderEntityMagService,
        private storeService: StoreMagService,
        private dictionaryService: DictionaryMagService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.storeService.query()
            .subscribe((res: HttpResponse<StoreMag[]>) => { this.stores = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.dictionaryService.query()
            .subscribe((res: HttpResponse<DictionaryMag[]>) => { this.dictionaries = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.orderEntity.id !== undefined) {
            this.subscribeToSaveResponse(
                this.orderEntityService.update(this.orderEntity));
        } else {
            this.subscribeToSaveResponse(
                this.orderEntityService.create(this.orderEntity));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OrderEntityMag>>) {
        result.subscribe((res: HttpResponse<OrderEntityMag>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OrderEntityMag) {
        this.eventManager.broadcast({ name: 'orderEntityListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackStoreById(index: number, item: StoreMag) {
        return item.id;
    }

    trackDictionaryById(index: number, item: DictionaryMag) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-order-entity-mag-popup',
    template: ''
})
export class OrderEntityMagPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderEntityPopupService: OrderEntityMagPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.orderEntityPopupService
                    .open(OrderEntityMagDialogComponent as Component, params['id']);
            } else {
                this.orderEntityPopupService
                    .open(OrderEntityMagDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
