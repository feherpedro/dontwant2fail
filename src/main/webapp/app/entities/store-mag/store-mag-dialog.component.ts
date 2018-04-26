import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { StoreMag } from './store-mag.model';
import { StoreMagPopupService } from './store-mag-popup.service';
import { StoreMagService } from './store-mag.service';
import { StorageMag, StorageMagService } from '../storage-mag';
import { CountyMag, CountyMagService } from '../county-mag';

@Component({
    selector: 'jhi-store-mag-dialog',
    templateUrl: './store-mag-dialog.component.html'
})
export class StoreMagDialogComponent implements OnInit {

    store: StoreMag;
    isSaving: boolean;

    storages: StorageMag[];

    counties: CountyMag[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private storeService: StoreMagService,
        private storageService: StorageMagService,
        private countyService: CountyMagService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.storageService
            .query({filter: 'store-is-null'})
            .subscribe((res: HttpResponse<StorageMag[]>) => {
                if (!this.store.storageId) {
                    this.storages = res.body;
                } else {
                    this.storageService
                        .find(this.store.storageId)
                        .subscribe((subRes: HttpResponse<StorageMag>) => {
                            this.storages = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.countyService.query()
            .subscribe((res: HttpResponse<CountyMag[]>) => { this.counties = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.store.id !== undefined) {
            this.subscribeToSaveResponse(
                this.storeService.update(this.store));
        } else {
            this.subscribeToSaveResponse(
                this.storeService.create(this.store));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<StoreMag>>) {
        result.subscribe((res: HttpResponse<StoreMag>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: StoreMag) {
        this.eventManager.broadcast({ name: 'storeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackStorageById(index: number, item: StorageMag) {
        return item.id;
    }

    trackCountyById(index: number, item: CountyMag) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-store-mag-popup',
    template: ''
})
export class StoreMagPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private storePopupService: StoreMagPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.storePopupService
                    .open(StoreMagDialogComponent as Component, params['id']);
            } else {
                this.storePopupService
                    .open(StoreMagDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
