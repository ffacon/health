import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HealthPointsModule } from './points/points.module';
import { HealthWeightModule } from './weight/weight.module';
import { HealthBloodpressureModule } from './bloodpressure/bloodpressure.module';
import { HealthPreferencesModule } from './preferences/preferences.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        HealthPointsModule,
        HealthWeightModule,
        HealthBloodpressureModule,
        HealthPreferencesModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HealthEntityModule {}
