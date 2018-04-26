import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CountyMagComponent } from './county-mag.component';
import { CountyMagDetailComponent } from './county-mag-detail.component';
import { CountyMagPopupComponent } from './county-mag-dialog.component';
import { CountyMagDeletePopupComponent } from './county-mag-delete-dialog.component';

export const countyRoute: Routes = [
    {
        path: 'county-mag',
        component: CountyMagComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.county.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'county-mag/:id',
        component: CountyMagDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.county.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const countyPopupRoute: Routes = [
    {
        path: 'county-mag-new',
        component: CountyMagPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.county.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'county-mag/:id/edit',
        component: CountyMagPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.county.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'county-mag/:id/delete',
        component: CountyMagDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.county.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
