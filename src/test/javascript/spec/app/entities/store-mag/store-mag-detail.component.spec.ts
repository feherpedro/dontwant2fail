/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Dontwant2FailTestModule } from '../../../test.module';
import { StoreMagDetailComponent } from '../../../../../../main/webapp/app/entities/store-mag/store-mag-detail.component';
import { StoreMagService } from '../../../../../../main/webapp/app/entities/store-mag/store-mag.service';
import { StoreMag } from '../../../../../../main/webapp/app/entities/store-mag/store-mag.model';

describe('Component Tests', () => {

    describe('StoreMag Management Detail Component', () => {
        let comp: StoreMagDetailComponent;
        let fixture: ComponentFixture<StoreMagDetailComponent>;
        let service: StoreMagService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Dontwant2FailTestModule],
                declarations: [StoreMagDetailComponent],
                providers: [
                    StoreMagService
                ]
            })
            .overrideTemplate(StoreMagDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StoreMagDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StoreMagService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new StoreMag(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.store).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
