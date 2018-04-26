/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Dontwant2FailTestModule } from '../../../test.module';
import { OrderEntityMagComponent } from '../../../../../../main/webapp/app/entities/order-entity-mag/order-entity-mag.component';
import { OrderEntityMagService } from '../../../../../../main/webapp/app/entities/order-entity-mag/order-entity-mag.service';
import { OrderEntityMag } from '../../../../../../main/webapp/app/entities/order-entity-mag/order-entity-mag.model';

describe('Component Tests', () => {

    describe('OrderEntityMag Management Component', () => {
        let comp: OrderEntityMagComponent;
        let fixture: ComponentFixture<OrderEntityMagComponent>;
        let service: OrderEntityMagService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Dontwant2FailTestModule],
                declarations: [OrderEntityMagComponent],
                providers: [
                    OrderEntityMagService
                ]
            })
            .overrideTemplate(OrderEntityMagComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrderEntityMagComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderEntityMagService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new OrderEntityMag(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.orderEntities[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
