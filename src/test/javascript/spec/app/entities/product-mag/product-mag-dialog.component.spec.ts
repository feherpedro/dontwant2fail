/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Dontwant2FailTestModule } from '../../../test.module';
import { ProductMagDialogComponent } from '../../../../../../main/webapp/app/entities/product-mag/product-mag-dialog.component';
import { ProductMagService } from '../../../../../../main/webapp/app/entities/product-mag/product-mag.service';
import { ProductMag } from '../../../../../../main/webapp/app/entities/product-mag/product-mag.model';
import { ProductCategoryMagService } from '../../../../../../main/webapp/app/entities/product-category-mag';
import { PriceCategoryMagService } from '../../../../../../main/webapp/app/entities/price-category-mag';

describe('Component Tests', () => {

    describe('ProductMag Management Dialog Component', () => {
        let comp: ProductMagDialogComponent;
        let fixture: ComponentFixture<ProductMagDialogComponent>;
        let service: ProductMagService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Dontwant2FailTestModule],
                declarations: [ProductMagDialogComponent],
                providers: [
                    ProductCategoryMagService,
                    PriceCategoryMagService,
                    ProductMagService
                ]
            })
            .overrideTemplate(ProductMagDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductMagDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductMagService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ProductMag(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.product = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'productListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ProductMag();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.product = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'productListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
