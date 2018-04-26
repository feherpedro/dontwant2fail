/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Dontwant2FailTestModule } from '../../../test.module';
import { CountyMagDetailComponent } from '../../../../../../main/webapp/app/entities/county-mag/county-mag-detail.component';
import { CountyMagService } from '../../../../../../main/webapp/app/entities/county-mag/county-mag.service';
import { CountyMag } from '../../../../../../main/webapp/app/entities/county-mag/county-mag.model';

describe('Component Tests', () => {

    describe('CountyMag Management Detail Component', () => {
        let comp: CountyMagDetailComponent;
        let fixture: ComponentFixture<CountyMagDetailComponent>;
        let service: CountyMagService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Dontwant2FailTestModule],
                declarations: [CountyMagDetailComponent],
                providers: [
                    CountyMagService
                ]
            })
            .overrideTemplate(CountyMagDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CountyMagDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CountyMagService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CountyMag(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.county).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
