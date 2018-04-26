/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Dontwant2FailTestModule } from '../../../test.module';
import { ProductCategoryMagComponent } from '../../../../../../main/webapp/app/entities/product-category-mag/product-category-mag.component';
import { ProductCategoryMagService } from '../../../../../../main/webapp/app/entities/product-category-mag/product-category-mag.service';
import { ProductCategoryMag } from '../../../../../../main/webapp/app/entities/product-category-mag/product-category-mag.model';

describe('Component Tests', () => {

    describe('ProductCategoryMag Management Component', () => {
        let comp: ProductCategoryMagComponent;
        let fixture: ComponentFixture<ProductCategoryMagComponent>;
        let service: ProductCategoryMagService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Dontwant2FailTestModule],
                declarations: [ProductCategoryMagComponent],
                providers: [
                    ProductCategoryMagService
                ]
            })
            .overrideTemplate(ProductCategoryMagComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductCategoryMagComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductCategoryMagService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ProductCategoryMag(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.productCategories[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
