/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Dontwant2FailTestModule } from '../../../test.module';
import { PriceCategoryMagComponent } from '../../../../../../main/webapp/app/entities/price-category-mag/price-category-mag.component';
import { PriceCategoryMagService } from '../../../../../../main/webapp/app/entities/price-category-mag/price-category-mag.service';
import { PriceCategoryMag } from '../../../../../../main/webapp/app/entities/price-category-mag/price-category-mag.model';

describe('Component Tests', () => {

    describe('PriceCategoryMag Management Component', () => {
        let comp: PriceCategoryMagComponent;
        let fixture: ComponentFixture<PriceCategoryMagComponent>;
        let service: PriceCategoryMagService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Dontwant2FailTestModule],
                declarations: [PriceCategoryMagComponent],
                providers: [
                    PriceCategoryMagService
                ]
            })
            .overrideTemplate(PriceCategoryMagComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PriceCategoryMagComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PriceCategoryMagService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PriceCategoryMag(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.priceCategories[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
