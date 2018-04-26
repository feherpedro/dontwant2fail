import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProductCategoryMag } from './product-category-mag.model';
import { ProductCategoryMagPopupService } from './product-category-mag-popup.service';
import { ProductCategoryMagService } from './product-category-mag.service';

@Component({
    selector: 'jhi-product-category-mag-delete-dialog',
    templateUrl: './product-category-mag-delete-dialog.component.html'
})
export class ProductCategoryMagDeleteDialogComponent {

    productCategory: ProductCategoryMag;

    constructor(
        private productCategoryService: ProductCategoryMagService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productCategoryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'productCategoryListModification',
                content: 'Deleted an productCategory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-product-category-mag-delete-popup',
    template: ''
})
export class ProductCategoryMagDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productCategoryPopupService: ProductCategoryMagPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.productCategoryPopupService
                .open(ProductCategoryMagDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
