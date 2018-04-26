/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Dontwant2FailTestModule } from '../../../test.module';
import { DictionaryMagComponent } from '../../../../../../main/webapp/app/entities/dictionary-mag/dictionary-mag.component';
import { DictionaryMagService } from '../../../../../../main/webapp/app/entities/dictionary-mag/dictionary-mag.service';
import { DictionaryMag } from '../../../../../../main/webapp/app/entities/dictionary-mag/dictionary-mag.model';

describe('Component Tests', () => {

    describe('DictionaryMag Management Component', () => {
        let comp: DictionaryMagComponent;
        let fixture: ComponentFixture<DictionaryMagComponent>;
        let service: DictionaryMagService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Dontwant2FailTestModule],
                declarations: [DictionaryMagComponent],
                providers: [
                    DictionaryMagService
                ]
            })
            .overrideTemplate(DictionaryMagComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DictionaryMagComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DictionaryMagService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DictionaryMag(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.dictionaries[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
