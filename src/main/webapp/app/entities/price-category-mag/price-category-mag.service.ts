import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { PriceCategoryMag } from './price-category-mag.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PriceCategoryMag>;

@Injectable()
export class PriceCategoryMagService {

    private resourceUrl =  SERVER_API_URL + 'api/price-categories';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/price-categories';

    constructor(private http: HttpClient) { }

    create(priceCategory: PriceCategoryMag): Observable<EntityResponseType> {
        const copy = this.convert(priceCategory);
        return this.http.post<PriceCategoryMag>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(priceCategory: PriceCategoryMag): Observable<EntityResponseType> {
        const copy = this.convert(priceCategory);
        return this.http.put<PriceCategoryMag>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PriceCategoryMag>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PriceCategoryMag[]>> {
        const options = createRequestOption(req);
        return this.http.get<PriceCategoryMag[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PriceCategoryMag[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<PriceCategoryMag[]>> {
        const options = createRequestOption(req);
        return this.http.get<PriceCategoryMag[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PriceCategoryMag[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PriceCategoryMag = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PriceCategoryMag[]>): HttpResponse<PriceCategoryMag[]> {
        const jsonResponse: PriceCategoryMag[] = res.body;
        const body: PriceCategoryMag[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PriceCategoryMag.
     */
    private convertItemFromServer(priceCategory: PriceCategoryMag): PriceCategoryMag {
        const copy: PriceCategoryMag = Object.assign({}, priceCategory);
        return copy;
    }

    /**
     * Convert a PriceCategoryMag to a JSON which can be sent to the server.
     */
    private convert(priceCategory: PriceCategoryMag): PriceCategoryMag {
        const copy: PriceCategoryMag = Object.assign({}, priceCategory);
        return copy;
    }
}
