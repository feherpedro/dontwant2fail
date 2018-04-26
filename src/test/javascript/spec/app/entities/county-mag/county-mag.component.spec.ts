/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Dontwant2FailTestModule } from '../../../test.module';
import { CountyMagComponent } from '../../../../../../main/webapp/app/entities/county-mag/county-mag.component';
import { CountyMagService } from '../../../../../../main/webapp/app/entities/county-mag/county-mag.service';
import { CountyMag } from '../../../../../../main/webapp/app/entities/county-mag/county-mag.model';

describe('Component Tests', () => {

    describe('CountyMag Management Component', () => {
        let comp: CountyMagComponent;
        let fixture: ComponentFixture<CountyMagComponent>;
        let service: CountyMagService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Dontwant2FailTestModule],
                declarations: [CountyMagComponent],
                providers: [
                    CountyMagService
                ]
            })
            .overrideTemplate(CountyMagComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CountyMagComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CountyMagService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CountyMag(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.counties[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
