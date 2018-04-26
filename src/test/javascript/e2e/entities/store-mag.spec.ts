import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Store e2e test', () => {

    let navBarPage: NavBarPage;
    let storeDialogPage: StoreDialogPage;
    let storeComponentsPage: StoreComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Stores', () => {
        navBarPage.goToEntity('store-mag');
        storeComponentsPage = new StoreComponentsPage();
        expect(storeComponentsPage.getTitle())
            .toMatch(/dontwant2FailApp.store.home.title/);

    });

    it('should load create Store dialog', () => {
        storeComponentsPage.clickOnCreateButton();
        storeDialogPage = new StoreDialogPage();
        expect(storeDialogPage.getModalTitle())
            .toMatch(/dontwant2FailApp.store.home.createOrEditLabel/);
        storeDialogPage.close();
    });

    it('should create and save Stores', () => {
        storeComponentsPage.clickOnCreateButton();
        storeDialogPage.setNameInput('name');
        expect(storeDialogPage.getNameInput()).toMatch('name');
        storeDialogPage.setZipInput('5');
        expect(storeDialogPage.getZipInput()).toMatch('5');
        storeDialogPage.setCityInput('city');
        expect(storeDialogPage.getCityInput()).toMatch('city');
        storeDialogPage.setAddressInput('address');
        expect(storeDialogPage.getAddressInput()).toMatch('address');
        storeDialogPage.setOpenHoursInput('openHours');
        expect(storeDialogPage.getOpenHoursInput()).toMatch('openHours');
        storeDialogPage.setContactNameInput('contactName');
        expect(storeDialogPage.getContactNameInput()).toMatch('contactName');
        storeDialogPage.setPhoneInput('phone');
        expect(storeDialogPage.getPhoneInput()).toMatch('phone');
        storeDialogPage.setPhone2Input('phone2');
        expect(storeDialogPage.getPhone2Input()).toMatch('phone2');
        storeDialogPage.storageSelectLastOption();
        storeDialogPage.countySelectLastOption();
        storeDialogPage.save();
        expect(storeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class StoreComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-store-mag div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class StoreDialogPage {
    modalTitle = element(by.css('h4#myStoreLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    zipInput = element(by.css('input#field_zip'));
    cityInput = element(by.css('input#field_city'));
    addressInput = element(by.css('input#field_address'));
    openHoursInput = element(by.css('input#field_openHours'));
    contactNameInput = element(by.css('input#field_contactName'));
    phoneInput = element(by.css('input#field_phone'));
    phone2Input = element(by.css('input#field_phone2'));
    storageSelect = element(by.css('select#field_storage'));
    countySelect = element(by.css('select#field_county'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setZipInput = function(zip) {
        this.zipInput.sendKeys(zip);
    };

    getZipInput = function() {
        return this.zipInput.getAttribute('value');
    };

    setCityInput = function(city) {
        this.cityInput.sendKeys(city);
    };

    getCityInput = function() {
        return this.cityInput.getAttribute('value');
    };

    setAddressInput = function(address) {
        this.addressInput.sendKeys(address);
    };

    getAddressInput = function() {
        return this.addressInput.getAttribute('value');
    };

    setOpenHoursInput = function(openHours) {
        this.openHoursInput.sendKeys(openHours);
    };

    getOpenHoursInput = function() {
        return this.openHoursInput.getAttribute('value');
    };

    setContactNameInput = function(contactName) {
        this.contactNameInput.sendKeys(contactName);
    };

    getContactNameInput = function() {
        return this.contactNameInput.getAttribute('value');
    };

    setPhoneInput = function(phone) {
        this.phoneInput.sendKeys(phone);
    };

    getPhoneInput = function() {
        return this.phoneInput.getAttribute('value');
    };

    setPhone2Input = function(phone2) {
        this.phone2Input.sendKeys(phone2);
    };

    getPhone2Input = function() {
        return this.phone2Input.getAttribute('value');
    };

    storageSelectLastOption = function() {
        this.storageSelect.all(by.tagName('option')).last().click();
    };

    storageSelectOption = function(option) {
        this.storageSelect.sendKeys(option);
    };

    getStorageSelect = function() {
        return this.storageSelect;
    };

    getStorageSelectedOption = function() {
        return this.storageSelect.element(by.css('option:checked')).getText();
    };

    countySelectLastOption = function() {
        this.countySelect.all(by.tagName('option')).last().click();
    };

    countySelectOption = function(option) {
        this.countySelect.sendKeys(option);
    };

    getCountySelect = function() {
        return this.countySelect;
    };

    getCountySelectedOption = function() {
        return this.countySelect.element(by.css('option:checked')).getText();
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
