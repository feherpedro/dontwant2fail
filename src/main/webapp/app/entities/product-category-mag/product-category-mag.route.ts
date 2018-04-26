import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ProductCategoryMagComponent } from './product-category-mag.component';
import { ProductCategoryMagDetailComponent } from './product-category-mag-detail.component';
import { ProductCategoryMagPopupComponent } from './product-category-mag-dialog.component';
import { ProductCategoryMagDeletePopupComponent } from './product-category-mag-delete-dialog.component';

export const productCategoryRoute: Routes = [
    {
        path: 'product-category-mag',
        component: ProductCategoryMagComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.productCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'product-category-mag/:id',
        component: ProductCategoryMagDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.productCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productCategoryPopupRoute: Routes = [
    {
        path: 'product-category-mag-new',
        component: ProductCategoryMagPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.productCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-category-mag/:id/edit',
        component: ProductCategoryMagPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.productCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-category-mag/:id/delete',
        component: ProductCategoryMagDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.productCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
