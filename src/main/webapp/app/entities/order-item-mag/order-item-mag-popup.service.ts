import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { OrderItemMag } from './order-item-mag.model';
import { OrderItemMagService } from './order-item-mag.service';

@Injectable()
export class OrderItemMagPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private orderItemService: OrderItemMagService

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
                this.orderItemService.find(id)
                    .subscribe((orderItemResponse: HttpResponse<OrderItemMag>) => {
                        const orderItem: OrderItemMag = orderItemResponse.body;
                        this.ngbModalRef = this.orderItemModalRef(component, orderItem);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.orderItemModalRef(component, new OrderItemMag());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    orderItemModalRef(component: Component, orderItem: OrderItemMag): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.orderItem = orderItem;
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
