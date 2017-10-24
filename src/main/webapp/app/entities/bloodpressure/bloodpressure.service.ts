import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Bloodpressure } from './bloodpressure.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class BloodpressureService {

    private resourceUrl = SERVER_API_URL + 'api/bloodpressures';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(bloodpressure: Bloodpressure): Observable<Bloodpressure> {
        const copy = this.convert(bloodpressure);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(bloodpressure: Bloodpressure): Observable<Bloodpressure> {
        const copy = this.convert(bloodpressure);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Bloodpressure> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Bloodpressure.
     */
    private convertItemFromServer(json: any): Bloodpressure {
        const entity: Bloodpressure = Object.assign(new Bloodpressure(), json);
        entity.date = this.dateUtils
            .convertLocalDateFromServer(json.date);
        return entity;
    }

    /**
     * Convert a Bloodpressure to a JSON which can be sent to the server.
     */
    private convert(bloodpressure: Bloodpressure): Bloodpressure {
        const copy: Bloodpressure = Object.assign({}, bloodpressure);
        copy.date = this.dateUtils
            .convertLocalDateToServer(bloodpressure.date);
        return copy;
    }
}
