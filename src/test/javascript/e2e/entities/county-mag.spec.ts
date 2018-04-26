import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('County e2e test', () => {

    let navBarPage: NavBarPage;
    let countyDialogPage: CountyDialogPage;
    let countyComponentsPage: CountyComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Counties', () => {
        navBarPage.goToEntity('county-mag');
        countyComponentsPage = new CountyComponentsPage();
        expect(countyComponentsPage.getTitle())
            .toMatch(/dontwant2FailApp.county.home.title/);

    });

    it('should load create County dialog', () => {
        countyComponentsPage.clickOnCreateButton();
        countyDialogPage = new CountyDialogPage();
        expect(countyDialogPage.getModalTitle())
            .toMatch(/dontwant2FailApp.county.home.createOrEditLabel/);
        countyDialogPage.close();
    });

    it('should create and save Counties', () => {
        countyComponentsPage.clickOnCreateButton();
        countyDialogPage.setCountyNameInput('countyName');
        expect(countyDialogPage.getCountyNameInput()).toMatch('countyName');
        countyDialogPage.save();
        expect(countyDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CountyComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-county-mag div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CountyDialogPage {
    modalTitle = element(by.css('h4#myCountyLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    countyNameInput = element(by.css('input#field_countyName'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setCountyNameInput = function(countyName) {
        this.countyNameInput.sendKeys(countyName);
    };

    getCountyNameInput = function() {
        return this.countyNameInput.getAttribute('value');
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
