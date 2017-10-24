import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HealthSharedModule } from '../../shared';
import { HealthAdminModule } from '../../admin/admin.module';
import {
    BloodpressureService,
    BloodpressurePopupService,
    BloodpressureComponent,
    BloodpressureDetailComponent,
    BloodpressureDialogComponent,
    BloodpressurePopupComponent,
    BloodpressureDeletePopupComponent,
    BloodpressureDeleteDialogComponent,
    bloodpressureRoute,
    bloodpressurePopupRoute,
    BloodpressureResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...bloodpressureRoute,
    ...bloodpressurePopupRoute,
];

@NgModule({
    imports: [
        HealthSharedModule,
        HealthAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        BloodpressureComponent,
        BloodpressureDetailComponent,
        BloodpressureDialogComponent,
        BloodpressureDeleteDialogComponent,
        BloodpressurePopupComponent,
        BloodpressureDeletePopupComponent,
    ],
    entryComponents: [
        BloodpressureComponent,
        BloodpressureDialogComponent,
        BloodpressurePopupComponent,
        BloodpressureDeleteDialogComponent,
        BloodpressureDeletePopupComponent,
    ],
    providers: [
        BloodpressureService,
        BloodpressurePopupService,
        BloodpressureResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HealthBloodpressureModule {}
