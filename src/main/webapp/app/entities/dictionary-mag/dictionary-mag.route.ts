import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DictionaryMagComponent } from './dictionary-mag.component';
import { DictionaryMagDetailComponent } from './dictionary-mag-detail.component';
import { DictionaryMagPopupComponent } from './dictionary-mag-dialog.component';
import { DictionaryMagDeletePopupComponent } from './dictionary-mag-delete-dialog.component';

export const dictionaryRoute: Routes = [
    {
        path: 'dictionary-mag',
        component: DictionaryMagComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.dictionary.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'dictionary-mag/:id',
        component: DictionaryMagDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.dictionary.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dictionaryPopupRoute: Routes = [
    {
        path: 'dictionary-mag-new',
        component: DictionaryMagPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.dictionary.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dictionary-mag/:id/edit',
        component: DictionaryMagPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.dictionary.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dictionary-mag/:id/delete',
        component: DictionaryMagDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dontwant2FailApp.dictionary.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
