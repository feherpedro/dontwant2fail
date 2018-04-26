import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PriceCategoryMag } from './price-category-mag.model';
import { PriceCategoryMagPopupService } from './price-category-mag-popup.service';
import { PriceCategoryMagService } from './price-category-mag.service';

@Component({
    selector: 'jhi-price-category-mag-delete-dialog',
    templateUrl: './price-category-mag-delete-dialog.component.html'
})
export class PriceCategoryMagDeleteDialogComponent {

    priceCategory: PriceCategoryMag;

    constructor(
        private priceCategoryService: PriceCategoryMagService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.priceCategoryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'priceCategoryListModification',
                content: 'Deleted an priceCategory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-price-category-mag-delete-popup',
    template: ''
})
export class PriceCategoryMagDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private priceCategoryPopupService: PriceCategoryMagPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.priceCategoryPopupService
                .open(PriceCategoryMagDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
