/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Dontwant2FailTestModule } from '../../../test.module';
import { ProductStorageMagDialogComponent } from '../../../../../../main/webapp/app/entities/product-storage-mag/product-storage-mag-dialog.component';
import { ProductStorageMagService } from '../../../../../../main/webapp/app/entities/product-storage-mag/product-storage-mag.service';
import { ProductStorageMag } from '../../../../../../main/webapp/app/entities/product-storage-mag/product-storage-mag.model';
import { ProductMagService } from '../../../../../../main/webapp/app/entities/product-mag';
import { StorageMagService } from '../../../../../../main/webapp/app/entities/storage-mag';
import { DictionaryMagService } from '../../../../../../main/webapp/app/entities/dictionary-mag';

describe('Component Tests', () => {

    describe('ProductStorageMag Management Dialog Component', () => {
        let comp: ProductStorageMagDialogComponent;
        let fixture: ComponentFixture<ProductStorageMagDialogComponent>;
        let service: ProductStorageMagService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Dontwant2FailTestModule],
                declarations: [ProductStorageMagDialogComponent],
                providers: [
                    ProductMagService,
                    StorageMagService,
                    DictionaryMagService,
                    ProductStorageMagService
                ]
            })
            .overrideTemplate(ProductStorageMagDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductStorageMagDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductStorageMagService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ProductStorageMag(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.productStorage = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'productStorageListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ProductStorageMag();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.productStorage = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'productStorageListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
