import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OrderItemMag } from './order-item-mag.model';
import { OrderItemMagPopupService } from './order-item-mag-popup.service';
import { OrderItemMagService } from './order-item-mag.service';

@Component({
    selector: 'jhi-order-item-mag-delete-dialog',
    templateUrl: './order-item-mag-delete-dialog.component.html'
})
export class OrderItemMagDeleteDialogComponent {

    orderItem: OrderItemMag;

    constructor(
        private orderItemService: OrderItemMagService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.orderItemService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'orderItemListModification',
                content: 'Deleted an orderItem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-order-item-mag-delete-popup',
    template: ''
})
export class OrderItemMagDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderItemPopupService: OrderItemMagPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.orderItemPopupService
                .open(OrderItemMagDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
