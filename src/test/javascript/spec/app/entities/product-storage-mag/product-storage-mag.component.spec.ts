/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Dontwant2FailTestModule } from '../../../test.module';
import { ProductStorageMagComponent } from '../../../../../../main/webapp/app/entities/product-storage-mag/product-storage-mag.component';
import { ProductStorageMagService } from '../../../../../../main/webapp/app/entities/product-storage-mag/product-storage-mag.service';
import { ProductStorageMag } from '../../../../../../main/webapp/app/entities/product-storage-mag/product-storage-mag.model';

describe('Component Tests', () => {

    describe('ProductStorageMag Management Component', () => {
        let comp: ProductStorageMagComponent;
        let fixture: ComponentFixture<ProductStorageMagComponent>;
        let service: ProductStorageMagService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Dontwant2FailTestModule],
                declarations: [ProductStorageMagComponent],
                providers: [
                    ProductStorageMagService
                ]
            })
            .overrideTemplate(ProductStorageMagComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductStorageMagComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductStorageMagService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ProductStorageMag(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.productStorages[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
