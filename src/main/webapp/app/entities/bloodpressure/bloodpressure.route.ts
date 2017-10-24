import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { BloodpressureComponent } from './bloodpressure.component';
import { BloodpressureDetailComponent } from './bloodpressure-detail.component';
import { BloodpressurePopupComponent } from './bloodpressure-dialog.component';
import { BloodpressureDeletePopupComponent } from './bloodpressure-delete-dialog.component';

@Injectable()
export class BloodpressureResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const bloodpressureRoute: Routes = [
    {
        path: 'bloodpressure',
        component: BloodpressureComponent,
        resolve: {
            'pagingParams': BloodpressureResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'healthApp.bloodpressure.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bloodpressure/:id',
        component: BloodpressureDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'healthApp.bloodpressure.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bloodpressurePopupRoute: Routes = [
    {
        path: 'bloodpressure-new',
        component: BloodpressurePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'healthApp.bloodpressure.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bloodpressure/:id/edit',
        component: BloodpressurePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'healthApp.bloodpressure.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bloodpressure/:id/delete',
        component: BloodpressureDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'healthApp.bloodpressure.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
