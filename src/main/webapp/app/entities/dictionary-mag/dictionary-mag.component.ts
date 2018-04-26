import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DictionaryMag } from './dictionary-mag.model';
import { DictionaryMagService } from './dictionary-mag.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-dictionary-mag',
    templateUrl: './dictionary-mag.component.html'
})
export class DictionaryMagComponent implements OnInit, OnDestroy {
dictionaries: DictionaryMag[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private dictionaryService: DictionaryMagService,
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
            this.dictionaryService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<DictionaryMag[]>) => this.dictionaries = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.dictionaryService.query().subscribe(
            (res: HttpResponse<DictionaryMag[]>) => {
                this.dictionaries = res.body;
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
        this.registerChangeInDictionaries();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DictionaryMag) {
        return item.id;
    }
    registerChangeInDictionaries() {
        this.eventSubscriber = this.eventManager.subscribe('dictionaryListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
