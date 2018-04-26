import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PriceCategoryMagComponent } from './price-category-mag.component';
import { PriceCategoryMagDetailComponent } from './price-category-mag-detail.component';
import { PriceCategoryMagPopupComponent } from './price-category-mag-dialog.component';
import { PriceCategoryMagDeletePopupComponent } from './price-category-mag-delete-dialog.component';

export const priceCategoryRoute: Routes = [
    {
        path: 'price-category-mag',
        component: PriceCategoryMagComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.priceCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'price-category-mag/:id',
        component: PriceCategoryMagDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.priceCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const priceCategoryPopupRoute: Routes = [
    {
        path: 'price-category-mag-new',
        component: PriceCategoryMagPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.priceCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'price-category-mag/:id/edit',
        component: PriceCategoryMagPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.priceCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'price-category-mag/:id/delete',
        component: PriceCategoryMagDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.priceCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
