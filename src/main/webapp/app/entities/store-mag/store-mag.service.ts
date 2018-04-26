import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { StoreMag } from './store-mag.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<StoreMag>;

@Injectable()
export class StoreMagService {

    private resourceUrl =  SERVER_API_URL + 'api/stores';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/stores';

    constructor(private http: HttpClient) { }

    create(store: StoreMag): Observable<EntityResponseType> {
        const copy = this.convert(store);
        return this.http.post<StoreMag>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(store: StoreMag): Observable<EntityResponseType> {
        const copy = this.convert(store);
        return this.http.put<StoreMag>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<StoreMag>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<StoreMag[]>> {
        const options = createRequestOption(req);
        return this.http.get<StoreMag[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StoreMag[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<StoreMag[]>> {
        const options = createRequestOption(req);
        return this.http.get<StoreMag[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StoreMag[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: StoreMag = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<StoreMag[]>): HttpResponse<StoreMag[]> {
        const jsonResponse: StoreMag[] = res.body;
        const body: StoreMag[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to StoreMag.
     */
    private convertItemFromServer(store: StoreMag): StoreMag {
        const copy: StoreMag = Object.assign({}, store);
        return copy;
    }

    /**
     * Convert a StoreMag to a JSON which can be sent to the server.
     */
    private convert(store: StoreMag): StoreMag {
        const copy: StoreMag = Object.assign({}, store);
        return copy;
    }
}
