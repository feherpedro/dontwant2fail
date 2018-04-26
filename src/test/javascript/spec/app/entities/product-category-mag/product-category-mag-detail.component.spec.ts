/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Dontwant2FailTestModule } from '../../../test.module';
import { ProductCategoryMagDetailComponent } from '../../../../../../main/webapp/app/entities/product-category-mag/product-category-mag-detail.component';
import { ProductCategoryMagService } from '../../../../../../main/webapp/app/entities/product-category-mag/product-category-mag.service';
import { ProductCategoryMag } from '../../../../../../main/webapp/app/entities/product-category-mag/product-category-mag.model';

describe('Component Tests', () => {

    describe('ProductCategoryMag Management Detail Component', () => {
        let comp: ProductCategoryMagDetailComponent;
        let fixture: ComponentFixture<ProductCategoryMagDetailComponent>;
        let service: ProductCategoryMagService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Dontwant2FailTestModule],
                declarations: [ProductCategoryMagDetailComponent],
                providers: [
                    ProductCategoryMagService
                ]
            })
            .overrideTemplate(ProductCategoryMagDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductCategoryMagDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductCategoryMagService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ProductCategoryMag(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.productCategory).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
