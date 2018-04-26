/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Dontwant2FailTestModule } from '../../../test.module';
import { ProductStorageMagDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/product-storage-mag/product-storage-mag-delete-dialog.component';
import { ProductStorageMagService } from '../../../../../../main/webapp/app/entities/product-storage-mag/product-storage-mag.service';

describe('Component Tests', () => {

    describe('ProductStorageMag Management Delete Component', () => {
        let comp: ProductStorageMagDeleteDialogComponent;
        let fixture: ComponentFixture<ProductStorageMagDeleteDialogComponent>;
        let service: ProductStorageMagService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Dontwant2FailTestModule],
                declarations: [ProductStorageMagDeleteDialogComponent],
                providers: [
                    ProductStorageMagService
                ]
            })
            .overrideTemplate(ProductStorageMagDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductStorageMagDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductStorageMagService);
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
