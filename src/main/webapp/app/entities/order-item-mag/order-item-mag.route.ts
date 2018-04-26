import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { OrderItemMagComponent } from './order-item-mag.component';
import { OrderItemMagDetailComponent } from './order-item-mag-detail.component';
import { OrderItemMagPopupComponent } from './order-item-mag-dialog.component';
import { OrderItemMagDeletePopupComponent } from './order-item-mag-delete-dialog.component';

export const orderItemRoute: Routes = [
    {
        path: 'order-item-mag',
        component: OrderItemMagComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.orderItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'order-item-mag/:id',
        component: OrderItemMagDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.orderItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderItemPopupRoute: Routes = [
    {
        path: 'order-item-mag-new',
        component: OrderItemMagPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.orderItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'order-item-mag/:id/edit',
        component: OrderItemMagPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.orderItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'order-item-mag/:id/delete',
        component: OrderItemMagDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.orderItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
