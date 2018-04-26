import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProductMag } from './product-mag.model';
import { ProductMagPopupService } from './product-mag-popup.service';
import { ProductMagService } from './product-mag.service';

@Component({
    selector: 'jhi-product-mag-delete-dialog',
    templateUrl: './product-mag-delete-dialog.component.html'
})
export class ProductMagDeleteDialogComponent {

    product: ProductMag;

    constructor(
        private productService: ProductMagService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'productListModification',
                content: 'Deleted an product'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-product-mag-delete-popup',
    template: ''
})
export class ProductMagDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productPopupService: ProductMagPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.productPopupService
                .open(ProductMagDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
