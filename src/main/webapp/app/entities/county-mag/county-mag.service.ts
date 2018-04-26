import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CountyMag } from './county-mag.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CountyMag>;

@Injectable()
export class CountyMagService {

    private resourceUrl =  SERVER_API_URL + 'api/counties';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/counties';

    constructor(private http: HttpClient) { }

    create(county: CountyMag): Observable<EntityResponseType> {
        const copy = this.convert(county);
        return this.http.post<CountyMag>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(county: CountyMag): Observable<EntityResponseType> {
        const copy = this.convert(county);
        return this.http.put<CountyMag>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CountyMag>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CountyMag[]>> {
        const options = createRequestOption(req);
        return this.http.get<CountyMag[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CountyMag[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<CountyMag[]>> {
        const options = createRequestOption(req);
        return this.http.get<CountyMag[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CountyMag[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CountyMag = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CountyMag[]>): HttpResponse<CountyMag[]> {
        const jsonResponse: CountyMag[] = res.body;
        const body: CountyMag[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CountyMag.
     */
    private convertItemFromServer(county: CountyMag): CountyMag {
        const copy: CountyMag = Object.assign({}, county);
        return copy;
    }

    /**
     * Convert a CountyMag to a JSON which can be sent to the server.
     */
    private convert(county: CountyMag): CountyMag {
        const copy: CountyMag = Object.assign({}, county);
        return copy;
    }
}
