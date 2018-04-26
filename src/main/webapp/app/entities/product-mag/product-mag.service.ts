import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ProductMag } from './product-mag.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ProductMag>;

@Injectable()
export class ProductMagService {

    private resourceUrl =  SERVER_API_URL + 'api/products';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/products';

    constructor(private http: HttpClient) { }

    create(product: ProductMag): Observable<EntityResponseType> {
        const copy = this.convert(product);
        return this.http.post<ProductMag>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(product: ProductMag): Observable<EntityResponseType> {
        const copy = this.convert(product);
        return this.http.put<ProductMag>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ProductMag>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ProductMag[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProductMag[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ProductMag[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ProductMag[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProductMag[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ProductMag[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ProductMag = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ProductMag[]>): HttpResponse<ProductMag[]> {
        const jsonResponse: ProductMag[] = res.body;
        const body: ProductMag[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ProductMag.
     */
    private convertItemFromServer(product: ProductMag): ProductMag {
        const copy: ProductMag = Object.assign({}, product);
        return copy;
    }

    /**
     * Convert a ProductMag to a JSON which can be sent to the server.
     */
    private convert(product: ProductMag): ProductMag {
        const copy: ProductMag = Object.assign({}, product);
        return copy;
    }
}
