import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HealthSharedModule } from '../../shared';
import { HealthAdminModule } from '../../admin/admin.module';
import {
    WeightService,
    WeightPopupService,
    WeightComponent,
    WeightDetailComponent,
    WeightDialogComponent,
    WeightPopupComponent,
    WeightDeletePopupComponent,
    WeightDeleteDialogComponent,
    weightRoute,
    weightPopupRoute,
    WeightResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...weightRoute,
    ...weightPopupRoute,
];

@NgModule({
    imports: [
        HealthSharedModule,
        HealthAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        WeightComponent,
        WeightDetailComponent,
        WeightDialogComponent,
        WeightDeleteDialogComponent,
        WeightPopupComponent,
        WeightDeletePopupComponent,
    ],
    entryComponents: [
        WeightComponent,
        WeightDialogComponent,
        WeightPopupComponent,
        WeightDeleteDialogComponent,
        WeightDeletePopupComponent,
    ],
    providers: [
        WeightService,
        WeightPopupService,
        WeightResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HealthWeightModule {}
