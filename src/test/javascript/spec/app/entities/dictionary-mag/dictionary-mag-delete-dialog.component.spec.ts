/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Dontwant2FailTestModule } from '../../../test.module';
import { DictionaryMagDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/dictionary-mag/dictionary-mag-delete-dialog.component';
import { DictionaryMagService } from '../../../../../../main/webapp/app/entities/dictionary-mag/dictionary-mag.service';

describe('Component Tests', () => {

    describe('DictionaryMag Management Delete Component', () => {
        let comp: DictionaryMagDeleteDialogComponent;
        let fixture: ComponentFixture<DictionaryMagDeleteDialogComponent>;
        let service: DictionaryMagService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Dontwant2FailTestModule],
                declarations: [DictionaryMagDeleteDialogComponent],
                providers: [
                    DictionaryMagService
                ]
            })
            .overrideTemplate(DictionaryMagDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DictionaryMagDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DictionaryMagService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
