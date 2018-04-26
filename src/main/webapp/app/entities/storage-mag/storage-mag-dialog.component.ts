import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StorageMag } from './storage-mag.model';
import { StorageMagPopupService } from './storage-mag-popup.service';
import { StorageMagService } from './storage-mag.service';

@Component({
    selector: 'jhi-storage-mag-dialog',
    templateUrl: './storage-mag-dialog.component.html'
})
export class StorageMagDialogComponent implements OnInit {

    storage: StorageMag;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private storageService: StorageMagService,
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
        if (this.storage.id !== undefined) {
            this.subscribeToSaveResponse(
                this.storageService.update(this.storage));
        } else {
            this.subscribeToSaveResponse(
                this.storageService.create(this.storage));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<StorageMag>>) {
        result.subscribe((res: HttpResponse<StorageMag>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: StorageMag) {
        this.eventManager.broadcast({ name: 'storageListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-storage-mag-popup',
    template: ''
})
export class StorageMagPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private storagePopupService: StorageMagPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.storagePopupService
                    .open(StorageMagDialogComponent as Component, params['id']);
            } else {
                this.storagePopupService
                    .open(StorageMagDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
