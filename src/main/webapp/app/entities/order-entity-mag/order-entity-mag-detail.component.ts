import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { OrderEntityMag } from './order-entity-mag.model';
import { OrderEntityMagService } from './order-entity-mag.service';

@Component({
    selector: 'jhi-order-entity-mag-detail',
    templateUrl: './order-entity-mag-detail.component.html'
})
export class OrderEntityMagDetailComponent implements OnInit, OnDestroy {

    orderEntity: OrderEntityMag;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private orderEntityService: OrderEntityMagService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOrderEntities();
    }

    load(id) {
        this.orderEntityService.find(id)
            .subscribe((orderEntityResponse: HttpResponse<OrderEntityMag>) => {
                this.orderEntity = orderEntityResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOrderEntities() {
        this.eventSubscriber = this.eventManager.subscribe(
            'orderEntityListModification',
            (response) => this.load(this.orderEntity.id)
        );
    }
}
