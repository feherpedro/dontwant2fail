import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProductStorageMag } from './product-storage-mag.model';
import { ProductStorageMagPopupService } from './product-storage-mag-popup.service';
import { ProductStorageMagService } from './product-storage-mag.service';

@Component({
    selector: 'jhi-product-storage-mag-delete-dialog',
    templateUrl: './product-storage-mag-delete-dialog.component.html'
})
export class ProductStorageMagDeleteDialogComponent {

    productStorage: ProductStorageMag;

    constructor(
        private productStorageService: ProductStorageMagService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productStorageService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'productStorageListModification',
                content: 'Deleted an productStorage'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-product-storage-mag-delete-popup',
    template: ''
})
export class ProductStorageMagDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productStoragePopupService: ProductStorageMagPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.productStoragePopupService
                .open(ProductStorageMagDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
