import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ProductCategoryMag } from './product-category-mag.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ProductCategoryMag>;

@Injectable()
export class ProductCategoryMagService {

    private resourceUrl =  SERVER_API_URL + 'api/product-categories';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/product-categories';

    constructor(private http: HttpClient) { }

    create(productCategory: ProductCategoryMag): Observable<EntityResponseType> {
        const copy = this.convert(productCategory);
        return this.http.post<ProductCategoryMag>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(productCategory: ProductCategoryMag): Observable<EntityResponseType> {
        const copy = this.convert(productCategory);
        return this.http.put<ProductCategoryMag>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ProductCategoryMag>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ProductCategoryMag[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProductCategoryMag[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ProductCategoryMag[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ProductCategoryMag[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProductCategoryMag[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ProductCategoryMag[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ProductCategoryMag = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ProductCategoryMag[]>): HttpResponse<ProductCategoryMag[]> {
        const jsonResponse: ProductCategoryMag[] = res.body;
        const body: ProductCategoryMag[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ProductCategoryMag.
     */
    private convertItemFromServer(productCategory: ProductCategoryMag): ProductCategoryMag {
        const copy: ProductCategoryMag = Object.assign({}, productCategory);
        return copy;
    }

    /**
     * Convert a ProductCategoryMag to a JSON which can be sent to the server.
     */
    private convert(productCategory: ProductCategoryMag): ProductCategoryMag {
        const copy: ProductCategoryMag = Object.assign({}, productCategory);
        return copy;
    }
}
