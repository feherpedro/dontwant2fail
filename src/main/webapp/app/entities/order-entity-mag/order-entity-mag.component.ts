import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OrderEntityMag } from './order-entity-mag.model';
import { OrderEntityMagService } from './order-entity-mag.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-order-entity-mag',
    templateUrl: './order-entity-mag.component.html'
})
export class OrderEntityMagComponent implements OnInit, OnDestroy {
orderEntities: OrderEntityMag[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private orderEntityService: OrderEntityMagService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.orderEntityService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<OrderEntityMag[]>) => this.orderEntities = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.orderEntityService.query().subscribe(
            (res: HttpResponse<OrderEntityMag[]>) => {
                this.orderEntities = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInOrderEntities();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: OrderEntityMag) {
        return item.id;
    }
    registerChangeInOrderEntities() {
        this.eventSubscriber = this.eventManager.subscribe('orderEntityListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
