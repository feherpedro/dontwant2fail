/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Dontwant2FailTestModule } from '../../../test.module';
import { ProductMagDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/product-mag/product-mag-delete-dialog.component';
import { ProductMagService } from '../../../../../../main/webapp/app/entities/product-mag/product-mag.service';

describe('Component Tests', () => {

    describe('ProductMag Management Delete Component', () => {
        let comp: ProductMagDeleteDialogComponent;
        let fixture: ComponentFixture<ProductMagDeleteDialogComponent>;
        let service: ProductMagService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Dontwant2FailTestModule],
                declarations: [ProductMagDeleteDialogComponent],
                providers: [
                    ProductMagService
                ]
            })
            .overrideTemplate(ProductMagDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductMagDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductMagService);
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
