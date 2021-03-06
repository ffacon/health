import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Preferences } from './preferences.model';
import { PreferencesService } from './preferences.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-preferences',
    templateUrl: './preferences.component.html'
})
export class PreferencesComponent implements OnInit, OnDestroy {
preferences: Preferences[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private preferencesService: PreferencesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.preferencesService.query().subscribe(
            (res: ResponseWrapper) => {
                this.preferences = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPreferences();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Preferences) {
        return item.id;
    }
    registerChangeInPreferences() {
        this.eventSubscriber = this.eventManager.subscribe('preferencesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
