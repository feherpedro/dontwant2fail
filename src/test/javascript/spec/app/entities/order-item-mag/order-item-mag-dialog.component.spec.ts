/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Dontwant2FailTestModule } from '../../../test.module';
import { OrderItemMagDialogComponent } from '../../../../../../main/webapp/app/entities/order-item-mag/order-item-mag-dialog.component';
import { OrderItemMagService } from '../../../../../../main/webapp/app/entities/order-item-mag/order-item-mag.service';
import { OrderItemMag } from '../../../../../../main/webapp/app/entities/order-item-mag/order-item-mag.model';
import { OrderEntityMagService } from '../../../../../../main/webapp/app/entities/order-entity-mag';
import { StorageMagService } from '../../../../../../main/webapp/app/entities/storage-mag';
import { ProductMagService } from '../../../../../../main/webapp/app/entities/product-mag';
import { DictionaryMagService } from '../../../../../../main/webapp/app/entities/dictionary-mag';

describe('Component Tests', () => {

    describe('OrderItemMag Management Dialog Component', () => {
        let comp: OrderItemMagDialogComponent;
        let fixture: ComponentFixture<OrderItemMagDialogComponent>;
        let service: OrderItemMagService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Dontwant2FailTestModule],
                declarations: [OrderItemMagDialogComponent],
                providers: [
                    OrderEntityMagService,
                    StorageMagService,
                    ProductMagService,
                    DictionaryMagService,
                    OrderItemMagService
                ]
            })
            .overrideTemplate(OrderItemMagDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrderItemMagDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderItemMagService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OrderItemMag(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.orderItem = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'orderItemListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OrderItemMag();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.orderItem = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'orderItemListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
