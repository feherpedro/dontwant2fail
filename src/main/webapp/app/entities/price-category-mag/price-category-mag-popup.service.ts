import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { PriceCategoryMag } from './price-category-mag.model';
import { PriceCategoryMagService } from './price-category-mag.service';

@Injectable()
export class PriceCategoryMagPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private priceCategoryService: PriceCategoryMagService

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
                this.priceCategoryService.find(id)
                    .subscribe((priceCategoryResponse: HttpResponse<PriceCategoryMag>) => {
                        const priceCategory: PriceCategoryMag = priceCategoryResponse.body;
                        this.ngbModalRef = this.priceCategoryModalRef(component, priceCategory);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.priceCategoryModalRef(component, new PriceCategoryMag());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    priceCategoryModalRef(component: Component, priceCategory: PriceCategoryMag): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.priceCategory = priceCategory;
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
