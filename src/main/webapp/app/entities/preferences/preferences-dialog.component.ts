import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Preferences } from './preferences.model';
import { PreferencesPopupService } from './preferences-popup.service';
import { PreferencesService } from './preferences.service';

@Component({
    selector: 'jhi-preferences-dialog',
    templateUrl: './preferences-dialog.component.html'
})
export class PreferencesDialogComponent implements OnInit {

    preferences: Preferences;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private preferencesService: PreferencesService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.preferences.id !== undefined) {
            this.subscribeToSaveResponse(
                this.preferencesService.update(this.preferences));
        } else {
            this.subscribeToSaveResponse(
                this.preferencesService.create(this.preferences));
        }
    }

    private subscribeToSaveResponse(result: Observable<Preferences>) {
        result.subscribe((res: Preferences) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Preferences) {
        this.eventManager.broadcast({ name: 'preferencesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-preferences-popup',
    template: ''
})
export class PreferencesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private preferencesPopupService: PreferencesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.preferencesPopupService
                    .open(PreferencesDialogComponent as Component, params['id']);
            } else {
                this.preferencesPopupService
                    .open(PreferencesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
