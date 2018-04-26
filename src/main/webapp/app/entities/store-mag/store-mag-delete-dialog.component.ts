import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StoreMag } from './store-mag.model';
import { StoreMagPopupService } from './store-mag-popup.service';
import { StoreMagService } from './store-mag.service';

@Component({
    selector: 'jhi-store-mag-delete-dialog',
    templateUrl: './store-mag-delete-dialog.component.html'
})
export class StoreMagDeleteDialogComponent {

    store: StoreMag;

    constructor(
        private storeService: StoreMagService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.storeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'storeListModification',
                content: 'Deleted an store'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-store-mag-delete-popup',
    template: ''
})
export class StoreMagDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private storePopupService: StoreMagPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.storePopupService
                .open(StoreMagDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
