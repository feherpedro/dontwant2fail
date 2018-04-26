import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CountyMag } from './county-mag.model';
import { CountyMagPopupService } from './county-mag-popup.service';
import { CountyMagService } from './county-mag.service';

@Component({
    selector: 'jhi-county-mag-dialog',
    templateUrl: './county-mag-dialog.component.html'
})
export class CountyMagDialogComponent implements OnInit {

    county: CountyMag;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private countyService: CountyMagService,
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
        if (this.county.id !== undefined) {
            this.subscribeToSaveResponse(
                this.countyService.update(this.county));
        } else {
            this.subscribeToSaveResponse(
                this.countyService.create(this.county));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CountyMag>>) {
        result.subscribe((res: HttpResponse<CountyMag>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CountyMag) {
        this.eventManager.broadcast({ name: 'countyListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-county-mag-popup',
    template: ''
})
export class CountyMagPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private countyPopupService: CountyMagPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.countyPopupService
                    .open(CountyMagDialogComponent as Component, params['id']);
            } else {
                this.countyPopupService
                    .open(CountyMagDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
