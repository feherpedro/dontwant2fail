import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DictionaryMag } from './dictionary-mag.model';
import { DictionaryMagPopupService } from './dictionary-mag-popup.service';
import { DictionaryMagService } from './dictionary-mag.service';

@Component({
    selector: 'jhi-dictionary-mag-delete-dialog',
    templateUrl: './dictionary-mag-delete-dialog.component.html'
})
export class DictionaryMagDeleteDialogComponent {

    dictionary: DictionaryMag;

    constructor(
        private dictionaryService: DictionaryMagService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dictionaryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'dictionaryListModification',
                content: 'Deleted an dictionary'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-dictionary-mag-delete-popup',
    template: ''
})
export class DictionaryMagDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dictionaryPopupService: DictionaryMagPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.dictionaryPopupService
                .open(DictionaryMagDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
