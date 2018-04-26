/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Dontwant2FailTestModule } from '../../../test.module';
import { OrderItemMagComponent } from '../../../../../../main/webapp/app/entities/order-item-mag/order-item-mag.component';
import { OrderItemMagService } from '../../../../../../main/webapp/app/entities/order-item-mag/order-item-mag.service';
import { OrderItemMag } from '../../../../../../main/webapp/app/entities/order-item-mag/order-item-mag.model';

describe('Component Tests', () => {

    describe('OrderItemMag Management Component', () => {
        let comp: OrderItemMagComponent;
        let fixture: ComponentFixture<OrderItemMagComponent>;
        let service: OrderItemMagService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Dontwant2FailTestModule],
                declarations: [OrderItemMagComponent],
                providers: [
                    OrderItemMagService
                ]
            })
            .overrideTemplate(OrderItemMagComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrderItemMagComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderItemMagService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new OrderItemMag(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.orderItems[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
