import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StorageMag } from './storage-mag.model';
import { StorageMagPopupService } from './storage-mag-popup.service';
import { StorageMagService } from './storage-mag.service';

@Component({
    selector: 'jhi-storage-mag-delete-dialog',
    templateUrl: './storage-mag-delete-dialog.component.html'
})
export class StorageMagDeleteDialogComponent {

    storage: StorageMag;

    constructor(
        private storageService: StorageMagService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.storageService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'storageListModification',
                content: 'Deleted an storage'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-storage-mag-delete-popup',
    template: ''
})
export class StorageMagDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private storagePopupService: StorageMagPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.storagePopupService
                .open(StorageMagDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
