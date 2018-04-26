/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Dontwant2FailTestModule } from '../../../test.module';
import { OrderItemMagDetailComponent } from '../../../../../../main/webapp/app/entities/order-item-mag/order-item-mag-detail.component';
import { OrderItemMagService } from '../../../../../../main/webapp/app/entities/order-item-mag/order-item-mag.service';
import { OrderItemMag } from '../../../../../../main/webapp/app/entities/order-item-mag/order-item-mag.model';

describe('Component Tests', () => {

    describe('OrderItemMag Management Detail Component', () => {
        let comp: OrderItemMagDetailComponent;
        let fixture: ComponentFixture<OrderItemMagDetailComponent>;
        let service: OrderItemMagService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Dontwant2FailTestModule],
                declarations: [OrderItemMagDetailComponent],
                providers: [
                    OrderItemMagService
                ]
            })
            .overrideTemplate(OrderItemMagDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrderItemMagDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderItemMagService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new OrderItemMag(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.orderItem).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
