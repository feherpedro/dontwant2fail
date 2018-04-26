import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DictionaryMag } from './dictionary-mag.model';
import { DictionaryMagService } from './dictionary-mag.service';

@Component({
    selector: 'jhi-dictionary-mag-detail',
    templateUrl: './dictionary-mag-detail.component.html'
})
export class DictionaryMagDetailComponent implements OnInit, OnDestroy {

    dictionary: DictionaryMag;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dictionaryService: DictionaryMagService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDictionaries();
    }

    load(id) {
        this.dictionaryService.find(id)
            .subscribe((dictionaryResponse: HttpResponse<DictionaryMag>) => {
                this.dictionary = dictionaryResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDictionaries() {
        this.eventSubscriber = this.eventManager.subscribe(
            'dictionaryListModification',
            (response) => this.load(this.dictionary.id)
        );
    }
}
