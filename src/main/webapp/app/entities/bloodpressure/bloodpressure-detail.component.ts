import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Bloodpressure } from './bloodpressure.model';
import { BloodpressureService } from './bloodpressure.service';

@Component({
    selector: 'jhi-bloodpressure-detail',
    templateUrl: './bloodpressure-detail.component.html'
})
export class BloodpressureDetailComponent implements OnInit, OnDestroy {

    bloodpressure: Bloodpressure;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private bloodpressureService: BloodpressureService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBloodpressures();
    }

    load(id) {
        this.bloodpressureService.find(id).subscribe((bloodpressure) => {
            this.bloodpressure = bloodpressure;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBloodpressures() {
        this.eventSubscriber = this.eventManager.subscribe(
            'bloodpressureListModification',
            (response) => this.load(this.bloodpressure.id)
        );
    }
}
