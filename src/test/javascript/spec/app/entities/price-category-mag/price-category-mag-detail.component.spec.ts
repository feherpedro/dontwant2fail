/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Dontwant2FailTestModule } from '../../../test.module';
import { PriceCategoryMagDetailComponent } from '../../../../../../main/webapp/app/entities/price-category-mag/price-category-mag-detail.component';
import { PriceCategoryMagService } from '../../../../../../main/webapp/app/entities/price-category-mag/price-category-mag.service';
import { PriceCategoryMag } from '../../../../../../main/webapp/app/entities/price-category-mag/price-category-mag.model';

describe('Component Tests', () => {

    describe('PriceCategoryMag Management Detail Component', () => {
        let comp: PriceCategoryMagDetailComponent;
        let fixture: ComponentFixture<PriceCategoryMagDetailComponent>;
        let service: PriceCategoryMagService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Dontwant2FailTestModule],
                declarations: [PriceCategoryMagDetailComponent],
                providers: [
                    PriceCategoryMagService
                ]
            })
            .overrideTemplate(PriceCategoryMagDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PriceCategoryMagDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PriceCategoryMagService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PriceCategoryMag(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.priceCategory).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
