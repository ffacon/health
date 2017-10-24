import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Bloodpressure } from './bloodpressure.model';
import { BloodpressureService } from './bloodpressure.service';

@Injectable()
export class BloodpressurePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private bloodpressureService: BloodpressureService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.bloodpressureService.find(id).subscribe((bloodpressure) => {
                    if (bloodpressure.date) {
                        bloodpressure.date = {
                            year: bloodpressure.date.getFullYear(),
                            month: bloodpressure.date.getMonth() + 1,
                            day: bloodpressure.date.getDate()
                        };
                    }
                    this.ngbModalRef = this.bloodpressureModalRef(component, bloodpressure);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.bloodpressureModalRef(component, new Bloodpressure());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    bloodpressureModalRef(component: Component, bloodpressure: Bloodpressure): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.bloodpressure = bloodpressure;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
