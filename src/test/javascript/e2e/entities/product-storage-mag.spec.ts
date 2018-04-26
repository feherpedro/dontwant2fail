import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ProductStorage e2e test', () => {

    let navBarPage: NavBarPage;
    let productStorageDialogPage: ProductStorageDialogPage;
    let productStorageComponentsPage: ProductStorageComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ProductStorages', () => {
        navBarPage.goToEntity('product-storage-mag');
        productStorageComponentsPage = new ProductStorageComponentsPage();
        expect(productStorageComponentsPage.getTitle())
            .toMatch(/dontwant2FailApp.productStorage.home.title/);

    });

    it('should load create ProductStorage dialog', () => {
        productStorageComponentsPage.clickOnCreateButton();
        productStorageDialogPage = new ProductStorageDialogPage();
        expect(productStorageDialogPage.getModalTitle())
            .toMatch(/dontwant2FailApp.productStorage.home.createOrEditLabel/);
        productStorageDialogPage.close();
    });

    it('should create and save ProductStorages', () => {
        productStorageComponentsPage.clickOnCreateButton();
        productStorageDialogPage.setQuantityInput('5');
        expect(productStorageDialogPage.getQuantityInput()).toMatch('5');
        productStorageDialogPage.productSelectLastOption();
        productStorageDialogPage.storageSelectLastOption();
        productStorageDialogPage.statusSelectLastOption();
        productStorageDialogPage.save();
        expect(productStorageDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProductStorageComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-product-storage-mag div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ProductStorageDialogPage {
    modalTitle = element(by.css('h4#myProductStorageLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    quantityInput = element(by.css('input#field_quantity'));
    productSelect = element(by.css('select#field_product'));
    storageSelect = element(by.css('select#field_storage'));
    statusSelect = element(by.css('select#field_status'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setQuantityInput = function(quantity) {
        this.quantityInput.sendKeys(quantity);
    };

    getQuantityInput = function() {
        return this.quantityInput.getAttribute('value');
    };

    productSelectLastOption = function() {
        this.productSelect.all(by.tagName('option')).last().click();
    };

    productSelectOption = function(option) {
        this.productSelect.sendKeys(option);
    };

    getProductSelect = function() {
        return this.productSelect;
    };

    getProductSelectedOption = function() {
        return this.productSelect.element(by.css('option:checked')).getText();
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

    statusSelectLastOption = function() {
        this.statusSelect.all(by.tagName('option')).last().click();
    };

    statusSelectOption = function(option) {
        this.statusSelect.sendKeys(option);
    };

    getStatusSelect = function() {
        return this.statusSelect;
    };

    getStatusSelectedOption = function() {
        return this.statusSelect.element(by.css('option:checked')).getText();
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
