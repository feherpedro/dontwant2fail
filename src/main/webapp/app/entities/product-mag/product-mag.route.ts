import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ProductMagComponent } from './product-mag.component';
import { ProductMagDetailComponent } from './product-mag-detail.component';
import { ProductMagPopupComponent } from './product-mag-dialog.component';
import { ProductMagDeletePopupComponent } from './product-mag-delete-dialog.component';

export const productRoute: Routes = [
    {
        path: 'product-mag',
        component: ProductMagComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.product.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'product-mag/:id',
        component: ProductMagDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.product.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productPopupRoute: Routes = [
    {
        path: 'product-mag-new',
        component: ProductMagPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.product.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-mag/:id/edit',
        component: ProductMagPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.product.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-mag/:id/delete',
        component: ProductMagDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.product.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
