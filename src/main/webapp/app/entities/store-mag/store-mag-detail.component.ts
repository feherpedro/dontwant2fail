import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { StoreMag } from './store-mag.model';
import { StoreMagService } from './store-mag.service';

@Component({
    selector: 'jhi-store-mag-detail',
    templateUrl: './store-mag-detail.component.html'
})
export class StoreMagDetailComponent implements OnInit, OnDestroy {

    store: StoreMag;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private storeService: StoreMagService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInStores();
    }

    load(id) {
        this.storeService.find(id)
            .subscribe((storeResponse: HttpResponse<StoreMag>) => {
                this.store = storeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStores() {
        this.eventSubscriber = this.eventManager.subscribe(
            'storeListModification',
            (response) => this.load(this.store.id)
        );
    }
}
