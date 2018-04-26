import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { OrderEntityMagComponent } from './order-entity-mag.component';
import { OrderEntityMagDetailComponent } from './order-entity-mag-detail.component';
import { OrderEntityMagPopupComponent } from './order-entity-mag-dialog.component';
import { OrderEntityMagDeletePopupComponent } from './order-entity-mag-delete-dialog.component';

export const orderEntityRoute: Routes = [
    {
        path: 'order-entity-mag',
        component: OrderEntityMagComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.orderEntity.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'order-entity-mag/:id',
        component: OrderEntityMagDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.orderEntity.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderEntityPopupRoute: Routes = [
    {
        path: 'order-entity-mag-new',
        component: OrderEntityMagPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.orderEntity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'order-entity-mag/:id/edit',
        component: OrderEntityMagPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.orderEntity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'order-entity-mag/:id/delete',
        component: OrderEntityMagDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.orderEntity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
