import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { StorageMag } from './storage-mag.model';
import { StorageMagService } from './storage-mag.service';

@Component({
    selector: 'jhi-storage-mag-detail',
    templateUrl: './storage-mag-detail.component.html'
})
export class StorageMagDetailComponent implements OnInit, OnDestroy {

    storage: StorageMag;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private storageService: StorageMagService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInStorages();
    }

    load(id) {
        this.storageService.find(id)
            .subscribe((storageResponse: HttpResponse<StorageMag>) => {
                this.storage = storageResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStorages() {
        this.eventSubscriber = this.eventManager.subscribe(
            'storageListModification',
            (response) => this.load(this.storage.id)
        );
    }
}
