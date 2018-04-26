import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DictionaryMag } from './dictionary-mag.model';
import { DictionaryMagPopupService } from './dictionary-mag-popup.service';
import { DictionaryMagService } from './dictionary-mag.service';

@Component({
    selector: 'jhi-dictionary-mag-dialog',
    templateUrl: './dictionary-mag-dialog.component.html'
})
export class DictionaryMagDialogComponent implements OnInit {

    dictionary: DictionaryMag;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dictionaryService: DictionaryMagService,
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
        if (this.dictionary.id !== undefined) {
            this.subscribeToSaveResponse(
                this.dictionaryService.update(this.dictionary));
        } else {
            this.subscribeToSaveResponse(
                this.dictionaryService.create(this.dictionary));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DictionaryMag>>) {
        result.subscribe((res: HttpResponse<DictionaryMag>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DictionaryMag) {
        this.eventManager.broadcast({ name: 'dictionaryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-dictionary-mag-popup',
    template: ''
})
export class DictionaryMagPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dictionaryPopupService: DictionaryMagPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.dictionaryPopupService
                    .open(DictionaryMagDialogComponent as Component, params['id']);
            } else {
                this.dictionaryPopupService
                    .open(DictionaryMagDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
