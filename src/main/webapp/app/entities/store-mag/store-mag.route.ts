import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { StoreMagComponent } from './store-mag.component';
import { StoreMagDetailComponent } from './store-mag-detail.component';
import { StoreMagPopupComponent } from './store-mag-dialog.component';
import { StoreMagDeletePopupComponent } from './store-mag-delete-dialog.component';

export const storeRoute: Routes = [
    {
        path: 'store-mag',
        component: StoreMagComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.store.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'store-mag/:id',
        component: StoreMagDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.store.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const storePopupRoute: Routes = [
    {
        path: 'store-mag-new',
        component: StoreMagPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.store.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'store-mag/:id/edit',
        component: StoreMagPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.store.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'store-mag/:id/delete',
        component: StoreMagDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.store.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
