/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Dontwant2FailTestModule } from '../../../test.module';
import { OrderEntityMagDialogComponent } from '../../../../../../main/webapp/app/entities/order-entity-mag/order-entity-mag-dialog.component';
import { OrderEntityMagService } from '../../../../../../main/webapp/app/entities/order-entity-mag/order-entity-mag.service';
import { OrderEntityMag } from '../../../../../../main/webapp/app/entities/order-entity-mag/order-entity-mag.model';
import { StoreMagService } from '../../../../../../main/webapp/app/entities/store-mag';
import { DictionaryMagService } from '../../../../../../main/webapp/app/entities/dictionary-mag';

describe('Component Tests', () => {

    describe('OrderEntityMag Management Dialog Component', () => {
        let comp: OrderEntityMagDialogComponent;
        let fixture: ComponentFixture<OrderEntityMagDialogComponent>;
        let service: OrderEntityMagService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Dontwant2FailTestModule],
                declarations: [OrderEntityMagDialogComponent],
                providers: [
                    StoreMagService,
                    DictionaryMagService,
                    OrderEntityMagService
                ]
            })
            .overrideTemplate(OrderEntityMagDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrderEntityMagDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderEntityMagService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OrderEntityMag(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.orderEntity = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'orderEntityListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OrderEntityMag();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.orderEntity = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'orderEntityListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
