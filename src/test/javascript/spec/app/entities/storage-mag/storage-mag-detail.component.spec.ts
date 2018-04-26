/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Dontwant2FailTestModule } from '../../../test.module';
import { StorageMagDetailComponent } from '../../../../../../main/webapp/app/entities/storage-mag/storage-mag-detail.component';
import { StorageMagService } from '../../../../../../main/webapp/app/entities/storage-mag/storage-mag.service';
import { StorageMag } from '../../../../../../main/webapp/app/entities/storage-mag/storage-mag.model';

describe('Component Tests', () => {

    describe('StorageMag Management Detail Component', () => {
        let comp: StorageMagDetailComponent;
        let fixture: ComponentFixture<StorageMagDetailComponent>;
        let service: StorageMagService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Dontwant2FailTestModule],
                declarations: [StorageMagDetailComponent],
                providers: [
                    StorageMagService
                ]
            })
            .overrideTemplate(StorageMagDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StorageMagDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StorageMagService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new StorageMag(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.storage).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
