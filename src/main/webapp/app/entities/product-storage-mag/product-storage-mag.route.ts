import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ProductStorageMagComponent } from './product-storage-mag.component';
import { ProductStorageMagDetailComponent } from './product-storage-mag-detail.component';
import { ProductStorageMagPopupComponent } from './product-storage-mag-dialog.component';
import { ProductStorageMagDeletePopupComponent } from './product-storage-mag-delete-dialog.component';

export const productStorageRoute: Routes = [
    {
        path: 'product-storage-mag',
        component: ProductStorageMagComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.productStorage.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'product-storage-mag/:id',
        component: ProductStorageMagDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.productStorage.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productStoragePopupRoute: Routes = [
    {
        path: 'product-storage-mag-new',
        component: ProductStorageMagPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.productStorage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-storage-mag/:id/edit',
        component: ProductStorageMagPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.productStorage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-storage-mag/:id/delete',
        component: ProductStorageMagDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.productStorage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
