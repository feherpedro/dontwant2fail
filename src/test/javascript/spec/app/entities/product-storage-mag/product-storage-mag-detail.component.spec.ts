/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Dontwant2FailTestModule } from '../../../test.module';
import { ProductStorageMagDetailComponent } from '../../../../../../main/webapp/app/entities/product-storage-mag/product-storage-mag-detail.component';
import { ProductStorageMagService } from '../../../../../../main/webapp/app/entities/product-storage-mag/product-storage-mag.service';
import { ProductStorageMag } from '../../../../../../main/webapp/app/entities/product-storage-mag/product-storage-mag.model';

describe('Component Tests', () => {

    describe('ProductStorageMag Management Detail Component', () => {
        let comp: ProductStorageMagDetailComponent;
        let fixture: ComponentFixture<ProductStorageMagDetailComponent>;
        let service: ProductStorageMagService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Dontwant2FailTestModule],
                declarations: [ProductStorageMagDetailComponent],
                providers: [
                    ProductStorageMagService
                ]
            })
            .overrideTemplate(ProductStorageMagDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductStorageMagDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductStorageMagService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ProductStorageMag(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.productStorage).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
