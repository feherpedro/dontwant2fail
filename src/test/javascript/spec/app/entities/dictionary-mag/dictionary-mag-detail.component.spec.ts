/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Dontwant2FailTestModule } from '../../../test.module';
import { DictionaryMagDetailComponent } from '../../../../../../main/webapp/app/entities/dictionary-mag/dictionary-mag-detail.component';
import { DictionaryMagService } from '../../../../../../main/webapp/app/entities/dictionary-mag/dictionary-mag.service';
import { DictionaryMag } from '../../../../../../main/webapp/app/entities/dictionary-mag/dictionary-mag.model';

describe('Component Tests', () => {

    describe('DictionaryMag Management Detail Component', () => {
        let comp: DictionaryMagDetailComponent;
        let fixture: ComponentFixture<DictionaryMagDetailComponent>;
        let service: DictionaryMagService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Dontwant2FailTestModule],
                declarations: [DictionaryMagDetailComponent],
                providers: [
                    DictionaryMagService
                ]
            })
            .overrideTemplate(DictionaryMagDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DictionaryMagDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DictionaryMagService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DictionaryMag(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.dictionary).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
