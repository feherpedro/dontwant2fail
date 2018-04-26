import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DictionaryMag } from './dictionary-mag.model';
import { DictionaryMagService } from './dictionary-mag.service';

@Injectable()
export class DictionaryMagPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private dictionaryService: DictionaryMagService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.dictionaryService.find(id)
                    .subscribe((dictionaryResponse: HttpResponse<DictionaryMag>) => {
                        const dictionary: DictionaryMag = dictionaryResponse.body;
                        this.ngbModalRef = this.dictionaryModalRef(component, dictionary);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.dictionaryModalRef(component, new DictionaryMag());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    dictionaryModalRef(component: Component, dictionary: DictionaryMag): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.dictionary = dictionary;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
