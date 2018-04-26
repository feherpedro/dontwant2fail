import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { OrderItemMag } from './order-item-mag.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<OrderItemMag>;

@Injectable()
export class OrderItemMagService {

    private resourceUrl =  SERVER_API_URL + 'api/order-items';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/order-items';

    constructor(private http: HttpClient) { }

    create(orderItem: OrderItemMag): Observable<EntityResponseType> {
        const copy = this.convert(orderItem);
        return this.http.post<OrderItemMag>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(orderItem: OrderItemMag): Observable<EntityResponseType> {
        const copy = this.convert(orderItem);
        return this.http.put<OrderItemMag>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<OrderItemMag>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<OrderItemMag[]>> {
        const options = createRequestOption(req);
        return this.http.get<OrderItemMag[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OrderItemMag[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<OrderItemMag[]>> {
        const options = createRequestOption(req);
        return this.http.get<OrderItemMag[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OrderItemMag[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: OrderItemMag = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<OrderItemMag[]>): HttpResponse<OrderItemMag[]> {
        const jsonResponse: OrderItemMag[] = res.body;
        const body: OrderItemMag[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to OrderItemMag.
     */
    private convertItemFromServer(orderItem: OrderItemMag): OrderItemMag {
        const copy: OrderItemMag = Object.assign({}, orderItem);
        return copy;
    }

    /**
     * Convert a OrderItemMag to a JSON which can be sent to the server.
     */
    private convert(orderItem: OrderItemMag): OrderItemMag {
        const copy: OrderItemMag = Object.assign({}, orderItem);
        return copy;
    }
}
