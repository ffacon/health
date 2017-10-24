/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { HealthTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { BloodpressureDetailComponent } from '../../../../../../main/webapp/app/entities/bloodpressure/bloodpressure-detail.component';
import { BloodpressureService } from '../../../../../../main/webapp/app/entities/bloodpressure/bloodpressure.service';
import { Bloodpressure } from '../../../../../../main/webapp/app/entities/bloodpressure/bloodpressure.model';

describe('Component Tests', () => {

    describe('Bloodpressure Management Detail Component', () => {
        let comp: BloodpressureDetailComponent;
        let fixture: ComponentFixture<BloodpressureDetailComponent>;
        let service: BloodpressureService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HealthTestModule],
                declarations: [BloodpressureDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    BloodpressureService,
                    JhiEventManager
                ]
            }).overrideTemplate(BloodpressureDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BloodpressureDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BloodpressureService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Bloodpressure(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.bloodpressure).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
