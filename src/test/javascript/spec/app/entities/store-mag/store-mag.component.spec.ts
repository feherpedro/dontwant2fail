/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Dontwant2FailTestModule } from '../../../test.module';
import { StoreMagComponent } from '../../../../../../main/webapp/app/entities/store-mag/store-mag.component';
import { StoreMagService } from '../../../../../../main/webapp/app/entities/store-mag/store-mag.service';
import { StoreMag } from '../../../../../../main/webapp/app/entities/store-mag/store-mag.model';

describe('Component Tests', () => {

    describe('StoreMag Management Component', () => {
        let comp: StoreMagComponent;
        let fixture: ComponentFixture<StoreMagComponent>;
        let service: StoreMagService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Dontwant2FailTestModule],
                declarations: [StoreMagComponent],
                providers: [
                    StoreMagService
                ]
            })
            .overrideTemplate(StoreMagComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StoreMagComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StoreMagService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new StoreMag(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.stores[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
