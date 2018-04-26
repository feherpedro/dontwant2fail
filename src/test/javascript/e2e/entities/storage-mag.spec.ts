import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Storage e2e test', () => {

    let navBarPage: NavBarPage;
    let storageDialogPage: StorageDialogPage;
    let storageComponentsPage: StorageComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Storages', () => {
        navBarPage.goToEntity('storage-mag');
        storageComponentsPage = new StorageComponentsPage();
        expect(storageComponentsPage.getTitle())
            .toMatch(/dontwant2FailApp.storage.home.title/);

    });

    it('should load create Storage dialog', () => {
        storageComponentsPage.clickOnCreateButton();
        storageDialogPage = new StorageDialogPage();
        expect(storageDialogPage.getModalTitle())
            .toMatch(/dontwant2FailApp.storage.home.createOrEditLabel/);
        storageDialogPage.close();
    });

    it('should create and save Storages', () => {
        storageComponentsPage.clickOnCreateButton();
        storageDialogPage.setNameInput('name');
        expect(storageDialogPage.getNameInput()).toMatch('name');
        storageDialogPage.getOwnInput().isSelected().then((selected) => {
            if (selected) {
                storageDialogPage.getOwnInput().click();
                expect(storageDialogPage.getOwnInput().isSelected()).toBeFalsy();
            } else {
                storageDialogPage.getOwnInput().click();
                expect(storageDialogPage.getOwnInput().isSelected()).toBeTruthy();
            }
        });
        storageDialogPage.getPrimaryInput().isSelected().then((selected) => {
            if (selected) {
                storageDialogPage.getPrimaryInput().click();
                expect(storageDialogPage.getPrimaryInput().isSelected()).toBeFalsy();
            } else {
                storageDialogPage.getPrimaryInput().click();
                expect(storageDialogPage.getPrimaryInput().isSelected()).toBeTruthy();
            }
        });
        storageDialogPage.save();
        expect(storageDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class StorageComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-storage-mag div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class StorageDialogPage {
    modalTitle = element(by.css('h4#myStorageLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    ownInput = element(by.css('input#field_own'));
    primaryInput = element(by.css('input#field_primary'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    getOwnInput = function() {
        return this.ownInput;
    };
    getPrimaryInput = function() {
        return this.primaryInput;
    };
    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
