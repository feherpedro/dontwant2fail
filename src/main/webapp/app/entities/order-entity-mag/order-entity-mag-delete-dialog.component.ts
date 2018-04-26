import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OrderEntityMag } from './order-entity-mag.model';
import { OrderEntityMagPopupService } from './order-entity-mag-popup.service';
import { OrderEntityMagService } from './order-entity-mag.service';

@Component({
    selector: 'jhi-order-entity-mag-delete-dialog',
    templateUrl: './order-entity-mag-delete-dialog.component.html'
})
export class OrderEntityMagDeleteDialogComponent {

    orderEntity: OrderEntityMag;

    constructor(
        private orderEntityService: OrderEntityMagService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.orderEntityService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'orderEntityListModification',
                content: 'Deleted an orderEntity'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-order-entity-mag-delete-popup',
    template: ''
})
export class OrderEntityMagDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderEntityPopupService: OrderEntityMagPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.orderEntityPopupService
                .open(OrderEntityMagDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
