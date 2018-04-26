import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { StorageMag } from './storage-mag.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<StorageMag>;

@Injectable()
export class StorageMagService {

    private resourceUrl =  SERVER_API_URL + 'api/storages';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/storages';

    constructor(private http: HttpClient) { }

    create(storage: StorageMag): Observable<EntityResponseType> {
        const copy = this.convert(storage);
        return this.http.post<StorageMag>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(storage: StorageMag): Observable<EntityResponseType> {
        const copy = this.convert(storage);
        return this.http.put<StorageMag>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<StorageMag>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<StorageMag[]>> {
        const options = createRequestOption(req);
        return this.http.get<StorageMag[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StorageMag[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<StorageMag[]>> {
        const options = createRequestOption(req);
        return this.http.get<StorageMag[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StorageMag[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: StorageMag = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<StorageMag[]>): HttpResponse<StorageMag[]> {
        const jsonResponse: StorageMag[] = res.body;
        const body: StorageMag[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to StorageMag.
     */
    private convertItemFromServer(storage: StorageMag): StorageMag {
        const copy: StorageMag = Object.assign({}, storage);
        return copy;
    }

    /**
     * Convert a StorageMag to a JSON which can be sent to the server.
     */
    private convert(storage: StorageMag): StorageMag {
        const copy: StorageMag = Object.assign({}, storage);
        return copy;
    }
}
