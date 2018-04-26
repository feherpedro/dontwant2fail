/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Dontwant2FailTestModule } from '../../../test.module';
import { OrderEntityMagDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/order-entity-mag/order-entity-mag-delete-dialog.component';
import { OrderEntityMagService } from '../../../../../../main/webapp/app/entities/order-entity-mag/order-entity-mag.service';

describe('Component Tests', () => {

    describe('OrderEntityMag Management Delete Component', () => {
        let comp: OrderEntityMagDeleteDialogComponent;
        let fixture: ComponentFixture<OrderEntityMagDeleteDialogComponent>;
        let service: OrderEntityMagService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Dontwant2FailTestModule],
                declarations: [OrderEntityMagDeleteDialogComponent],
                providers: [
                    OrderEntityMagService
                ]
            })
            .overrideTemplate(OrderEntityMagDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrderEntityMagDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderEntityMagService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
