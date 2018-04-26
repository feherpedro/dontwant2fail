import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CountyMag } from './county-mag.model';
import { CountyMagService } from './county-mag.service';

@Component({
    selector: 'jhi-county-mag-detail',
    templateUrl: './county-mag-detail.component.html'
})
export class CountyMagDetailComponent implements OnInit, OnDestroy {

    county: CountyMag;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private countyService: CountyMagService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCounties();
    }

    load(id) {
        this.countyService.find(id)
            .subscribe((countyResponse: HttpResponse<CountyMag>) => {
                this.county = countyResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCounties() {
        this.eventSubscriber = this.eventManager.subscribe(
            'countyListModification',
            (response) => this.load(this.county.id)
        );
    }
}
