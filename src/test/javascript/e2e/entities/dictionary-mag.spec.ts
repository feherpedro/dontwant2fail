import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Dictionary e2e test', () => {

    let navBarPage: NavBarPage;
    let dictionaryDialogPage: DictionaryDialogPage;
    let dictionaryComponentsPage: DictionaryComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Dictionaries', () => {
        navBarPage.goToEntity('dictionary-mag');
        dictionaryComponentsPage = new DictionaryComponentsPage();
        expect(dictionaryComponentsPage.getTitle())
            .toMatch(/dontwant2FailApp.dictionary.home.title/);

    });

    it('should load create Dictionary dialog', () => {
        dictionaryComponentsPage.clickOnCreateButton();
        dictionaryDialogPage = new DictionaryDialogPage();
        expect(dictionaryDialogPage.getModalTitle())
            .toMatch(/dontwant2FailApp.dictionary.home.createOrEditLabel/);
        dictionaryDialogPage.close();
    });

    it('should create and save Dictionaries', () => {
        dictionaryComponentsPage.clickOnCreateButton();
        dictionaryDialogPage.setNameInput('name');
        expect(dictionaryDialogPage.getNameInput()).toMatch('name');
        dictionaryDialogPage.setCodeInput('code');
        expect(dictionaryDialogPage.getCodeInput()).toMatch('code');
        dictionaryDialogPage.save();
        expect(dictionaryDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class DictionaryComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-dictionary-mag div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class DictionaryDialogPage {
    modalTitle = element(by.css('h4#myDictionaryLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    codeInput = element(by.css('input#field_code'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setCodeInput = function(code) {
        this.codeInput.sendKeys(code);
    };

    getCodeInput = function() {
        return this.codeInput.getAttribute('value');
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
