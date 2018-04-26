/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Dontwant2FailTestModule } from '../../../test.module';
import { ProductMagDetailComponent } from '../../../../../../main/webapp/app/entities/product-mag/product-mag-detail.component';
import { ProductMagService } from '../../../../../../main/webapp/app/entities/product-mag/product-mag.service';
import { ProductMag } from '../../../../../../main/webapp/app/entities/product-mag/product-mag.model';

describe('Component Tests', () => {

    describe('ProductMag Management Detail Component', () => {
        let comp: ProductMagDetailComponent;
        let fixture: ComponentFixture<ProductMagDetailComponent>;
        let service: ProductMagService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Dontwant2FailTestModule],
                declarations: [ProductMagDetailComponent],
                providers: [
                    ProductMagService
                ]
            })
            .overrideTemplate(ProductMagDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductMagDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductMagService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ProductMag(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.product).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
