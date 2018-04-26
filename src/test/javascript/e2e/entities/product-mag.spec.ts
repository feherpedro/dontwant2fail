import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Product e2e test', () => {

    let navBarPage: NavBarPage;
    let productDialogPage: ProductDialogPage;
    let productComponentsPage: ProductComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Products', () => {
        navBarPage.goToEntity('product-mag');
        productComponentsPage = new ProductComponentsPage();
        expect(productComponentsPage.getTitle())
            .toMatch(/dontwant2FailApp.product.home.title/);

    });

    it('should load create Product dialog', () => {
        productComponentsPage.clickOnCreateButton();
        productDialogPage = new ProductDialogPage();
        expect(productDialogPage.getModalTitle())
            .toMatch(/dontwant2FailApp.product.home.createOrEditLabel/);
        productDialogPage.close();
    });

    it('should create and save Products', () => {
        productComponentsPage.clickOnCreateButton();
        productDialogPage.setNameInput('name');
        expect(productDialogPage.getNameInput()).toMatch('name');
        productDialogPage.setPriceInput('5');
        expect(productDialogPage.getPriceInput()).toMatch('5');
        productDialogPage.setNetPriceInput('5');
        expect(productDialogPage.getNetPriceInput()).toMatch('5');
        productDialogPage.setVtszInput('vtsz');
        expect(productDialogPage.getVtszInput()).toMatch('vtsz');
        productDialogPage.productCategorySelectLastOption();
        productDialogPage.priceCategorySelectLastOption();
        productDialogPage.save();
        expect(productDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProductComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-product-mag div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ProductDialogPage {
    modalTitle = element(by.css('h4#myProductLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    priceInput = element(by.css('input#field_price'));
    netPriceInput = element(by.css('input#field_netPrice'));
    vtszInput = element(by.css('input#field_vtsz'));
    productCategorySelect = element(by.css('select#field_productCategory'));
    priceCategorySelect = element(by.css('select#field_priceCategory'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setPriceInput = function(price) {
        this.priceInput.sendKeys(price);
    };

    getPriceInput = function() {
        return this.priceInput.getAttribute('value');
    };

    setNetPriceInput = function(netPrice) {
        this.netPriceInput.sendKeys(netPrice);
    };

    getNetPriceInput = function() {
        return this.netPriceInput.getAttribute('value');
    };

    setVtszInput = function(vtsz) {
        this.vtszInput.sendKeys(vtsz);
    };

    getVtszInput = function() {
        return this.vtszInput.getAttribute('value');
    };

    productCategorySelectLastOption = function() {
        this.productCategorySelect.all(by.tagName('option')).last().click();
    };

    productCategorySelectOption = function(option) {
        this.productCategorySelect.sendKeys(option);
    };

    getProductCategorySelect = function() {
        return this.productCategorySelect;
    };

    getProductCategorySelectedOption = function() {
        return this.productCategorySelect.element(by.css('option:checked')).getText();
    };

    priceCategorySelectLastOption = function() {
        this.priceCategorySelect.all(by.tagName('option')).last().click();
    };

    priceCategorySelectOption = function(option) {
        this.priceCategorySelect.sendKeys(option);
    };

    getPriceCategorySelect = function() {
        return this.priceCategorySelect;
    };

    getPriceCategorySelectedOption = function() {
        return this.priceCategorySelect.element(by.css('option:checked')).getText();
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
