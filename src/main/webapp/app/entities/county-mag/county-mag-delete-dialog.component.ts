import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CountyMag } from './county-mag.model';
import { CountyMagPopupService } from './county-mag-popup.service';
import { CountyMagService } from './county-mag.service';

@Component({
    selector: 'jhi-county-mag-delete-dialog',
    templateUrl: './county-mag-delete-dialog.component.html'
})
export class CountyMagDeleteDialogComponent {

    county: CountyMag;

    constructor(
        private countyService: CountyMagService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.countyService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'countyListModification',
                content: 'Deleted an county'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-county-mag-delete-popup',
    template: ''
})
export class CountyMagDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private countyPopupService: CountyMagPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.countyPopupService
                .open(CountyMagDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
