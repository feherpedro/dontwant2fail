import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { StorageMagComponent } from './storage-mag.component';
import { StorageMagDetailComponent } from './storage-mag-detail.component';
import { StorageMagPopupComponent } from './storage-mag-dialog.component';
import { StorageMagDeletePopupComponent } from './storage-mag-delete-dialog.component';

export const storageRoute: Routes = [
    {
        path: 'storage-mag',
        component: StorageMagComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.storage.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'storage-mag/:id',
        component: StorageMagDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.storage.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const storagePopupRoute: Routes = [
    {
        path: 'storage-mag-new',
        component: StorageMagPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.storage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'storage-mag/:id/edit',
        component: StorageMagPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.storage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'storage-mag/:id/delete',
        component: StorageMagDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.storage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
