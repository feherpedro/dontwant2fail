import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { DictionaryMag } from './dictionary-mag.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DictionaryMag>;

@Injectable()
export class DictionaryMagService {

    private resourceUrl =  SERVER_API_URL + 'api/dictionaries';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/dictionaries';

    constructor(private http: HttpClient) { }

    create(dictionary: DictionaryMag): Observable<EntityResponseType> {
        const copy = this.convert(dictionary);
        return this.http.post<DictionaryMag>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(dictionary: DictionaryMag): Observable<EntityResponseType> {
        const copy = this.convert(dictionary);
        return this.http.put<DictionaryMag>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DictionaryMag>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DictionaryMag[]>> {
        const options = createRequestOption(req);
        return this.http.get<DictionaryMag[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DictionaryMag[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<DictionaryMag[]>> {
        const options = createRequestOption(req);
        return this.http.get<DictionaryMag[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DictionaryMag[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DictionaryMag = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DictionaryMag[]>): HttpResponse<DictionaryMag[]> {
        const jsonResponse: DictionaryMag[] = res.body;
        const body: DictionaryMag[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DictionaryMag.
     */
    private convertItemFromServer(dictionary: DictionaryMag): DictionaryMag {
        const copy: DictionaryMag = Object.assign({}, dictionary);
        return copy;
    }

    /**
     * Convert a DictionaryMag to a JSON which can be sent to the server.
     */
    private convert(dictionary: DictionaryMag): DictionaryMag {
        const copy: DictionaryMag = Object.assign({}, dictionary);
        return copy;
    }
}
