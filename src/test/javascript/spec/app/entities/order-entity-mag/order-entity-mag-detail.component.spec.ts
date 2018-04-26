/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Dontwant2FailTestModule } from '../../../test.module';
import { OrderEntityMagDetailComponent } from '../../../../../../main/webapp/app/entities/order-entity-mag/order-entity-mag-detail.component';
import { OrderEntityMagService } from '../../../../../../main/webapp/app/entities/order-entity-mag/order-entity-mag.service';
import { OrderEntityMag } from '../../../../../../main/webapp/app/entities/order-entity-mag/order-entity-mag.model';

describe('Component Tests', () => {

    describe('OrderEntityMag Management Detail Component', () => {
        let comp: OrderEntityMagDetailComponent;
        let fixture: ComponentFixture<OrderEntityMagDetailComponent>;
        let service: OrderEntityMagService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Dontwant2FailTestModule],
                declarations: [OrderEntityMagDetailComponent],
                providers: [
                    OrderEntityMagService
                ]
            })
            .overrideTemplate(OrderEntityMagDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrderEntityMagDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderEntityMagService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new OrderEntityMag(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.orderEntity).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
