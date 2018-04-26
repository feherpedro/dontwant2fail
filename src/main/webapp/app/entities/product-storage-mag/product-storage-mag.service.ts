import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ProductStorageMag } from './product-storage-mag.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ProductStorageMag>;

@Injectable()
export class ProductStorageMagService {

    private resourceUrl =  SERVER_API_URL + 'api/product-storages';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/product-storages';

    constructor(private http: HttpClient) { }

    create(productStorage: ProductStorageMag): Observable<EntityResponseType> {
        const copy = this.convert(productStorage);
        return this.http.post<ProductStorageMag>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(productStorage: ProductStorageMag): Observable<EntityResponseType> {
        const copy = this.convert(productStorage);
        return this.http.put<ProductStorageMag>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ProductStorageMag>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ProductStorageMag[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProductStorageMag[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ProductStorageMag[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ProductStorageMag[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProductStorageMag[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ProductStorageMag[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ProductStorageMag = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ProductStorageMag[]>): HttpResponse<ProductStorageMag[]> {
        const jsonResponse: ProductStorageMag[] = res.body;
        const body: ProductStorageMag[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ProductStorageMag.
     */
    private convertItemFromServer(productStorage: ProductStorageMag): ProductStorageMag {
        const copy: ProductStorageMag = Object.assign({}, productStorage);
        return copy;
    }

    /**
     * Convert a ProductStorageMag to a JSON which can be sent to the server.
     */
    private convert(productStorage: ProductStorageMag): ProductStorageMag {
        const copy: ProductStorageMag = Object.assign({}, productStorage);
        return copy;
    }
}
