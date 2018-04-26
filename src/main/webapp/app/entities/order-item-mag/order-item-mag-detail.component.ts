import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { OrderItemMag } from './order-item-mag.model';
import { OrderItemMagService } from './order-item-mag.service';

@Component({
    selector: 'jhi-order-item-mag-detail',
    templateUrl: './order-item-mag-detail.component.html'
})
export class OrderItemMagDetailComponent implements OnInit, OnDestroy {

    orderItem: OrderItemMag;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private orderItemService: OrderItemMagService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOrderItems();
    }

    load(id) {
        this.orderItemService.find(id)
            .subscribe((orderItemResponse: HttpResponse<OrderItemMag>) => {
                this.orderItem = orderItemResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOrderItems() {
        this.eventSubscriber = this.eventManager.subscribe(
            'orderItemListModification',
            (response) => this.load(this.orderItem.id)
        );
    }
}
