/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Dontwant2FailTestModule } from '../../../test.module';
import { ProductMagComponent } from '../../../../../../main/webapp/app/entities/product-mag/product-mag.component';
import { ProductMagService } from '../../../../../../main/webapp/app/entities/product-mag/product-mag.service';
import { ProductMag } from '../../../../../../main/webapp/app/entities/product-mag/product-mag.model';

describe('Component Tests', () => {

    describe('ProductMag Management Component', () => {
        let comp: ProductMagComponent;
        let fixture: ComponentFixture<ProductMagComponent>;
        let service: ProductMagService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Dontwant2FailTestModule],
                declarations: [ProductMagComponent],
                providers: [
                    ProductMagService
                ]
            })
            .overrideTemplate(ProductMagComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductMagComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductMagService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ProductMag(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.products[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
