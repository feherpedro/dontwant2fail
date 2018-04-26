/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Dontwant2FailTestModule } from '../../../test.module';
import { StorageMagComponent } from '../../../../../../main/webapp/app/entities/storage-mag/storage-mag.component';
import { StorageMagService } from '../../../../../../main/webapp/app/entities/storage-mag/storage-mag.service';
import { StorageMag } from '../../../../../../main/webapp/app/entities/storage-mag/storage-mag.model';

describe('Component Tests', () => {

    describe('StorageMag Management Component', () => {
        let comp: StorageMagComponent;
        let fixture: ComponentFixture<StorageMagComponent>;
        let service: StorageMagService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Dontwant2FailTestModule],
                declarations: [StorageMagComponent],
                providers: [
                    StorageMagService
                ]
            })
            .overrideTemplate(StorageMagComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StorageMagComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StorageMagService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new StorageMag(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.storages[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
