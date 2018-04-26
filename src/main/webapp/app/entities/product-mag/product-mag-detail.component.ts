import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ProductMag } from './product-mag.model';
import { ProductMagService } from './product-mag.service';

@Component({
    selector: 'jhi-product-mag-detail',
    templateUrl: './product-mag-detail.component.html'
})
export class ProductMagDetailComponent implements OnInit, OnDestroy {

    product: ProductMag;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private productService: ProductMagService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProducts();
    }

    load(id) {
        this.productService.find(id)
            .subscribe((productResponse: HttpResponse<ProductMag>) => {
                this.product = productResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProducts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'productListModification',
            (response) => this.load(this.product.id)
        );
    }
}
