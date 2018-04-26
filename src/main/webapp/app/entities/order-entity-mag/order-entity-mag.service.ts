import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { OrderEntityMag } from './order-entity-mag.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<OrderEntityMag>;

@Injectable()
export class OrderEntityMagService {

    private resourceUrl =  SERVER_API_URL + 'api/order-entities';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/order-entities';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(orderEntity: OrderEntityMag): Observable<EntityResponseType> {
        const copy = this.convert(orderEntity);
        return this.http.post<OrderEntityMag>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(orderEntity: OrderEntityMag): Observable<EntityResponseType> {
        const copy = this.convert(orderEntity);
        return this.http.put<OrderEntityMag>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<OrderEntityMag>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<OrderEntityMag[]>> {
        const options = createRequestOption(req);
        return this.http.get<OrderEntityMag[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OrderEntityMag[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<OrderEntityMag[]>> {
        const options = createRequestOption(req);
        return this.http.get<OrderEntityMag[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OrderEntityMag[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: OrderEntityMag = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<OrderEntityMag[]>): HttpResponse<OrderEntityMag[]> {
        const jsonResponse: OrderEntityMag[] = res.body;
        const body: OrderEntityMag[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to OrderEntityMag.
     */
    private convertItemFromServer(orderEntity: OrderEntityMag): OrderEntityMag {
        const copy: OrderEntityMag = Object.assign({}, orderEntity);
        copy.createDate = this.dateUtils
            .convertLocalDateFromServer(orderEntity.createDate);
        copy.paymentDate = this.dateUtils
            .convertLocalDateFromServer(orderEntity.paymentDate);
        copy.dueDate = this.dateUtils
            .convertLocalDateFromServer(orderEntity.dueDate);
        return copy;
    }

    /**
     * Convert a OrderEntityMag to a JSON which can be sent to the server.
     */
    private convert(orderEntity: OrderEntityMag): OrderEntityMag {
        const copy: OrderEntityMag = Object.assign({}, orderEntity);
        copy.createDate = this.dateUtils
            .convertLocalDateToServer(orderEntity.createDate);
        copy.paymentDate = this.dateUtils
            .convertLocalDateToServer(orderEntity.paymentDate);
        copy.dueDate = this.dateUtils
            .convertLocalDateToServer(orderEntity.dueDate);
        return copy;
    }
}
