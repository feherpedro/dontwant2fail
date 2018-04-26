import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('OrderItem e2e test', () => {

    let navBarPage: NavBarPage;
    let orderItemDialogPage: OrderItemDialogPage;
    let orderItemComponentsPage: OrderItemComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load OrderItems', () => {
        navBarPage.goToEntity('order-item-mag');
        orderItemComponentsPage = new OrderItemComponentsPage();
        expect(orderItemComponentsPage.getTitle())
            .toMatch(/dontwant2FailApp.orderItem.home.title/);

    });

    it('should load create OrderItem dialog', () => {
        orderItemComponentsPage.clickOnCreateButton();
        orderItemDialogPage = new OrderItemDialogPage();
        expect(orderItemDialogPage.getModalTitle())
            .toMatch(/dontwant2FailApp.orderItem.home.createOrEditLabel/);
        orderItemDialogPage.close();
    });

    it('should create and save OrderItems', () => {
        orderItemComponentsPage.clickOnCreateButton();
        orderItemDialogPage.setQuantityInput('5');
        expect(orderItemDialogPage.getQuantityInput()).toMatch('5');
        orderItemDialogPage.orderSelectLastOption();
        orderItemDialogPage.storageSelectLastOption();
        orderItemDialogPage.productSelectLastOption();
        orderItemDialogPage.statusSelectLastOption();
        orderItemDialogPage.save();
        expect(orderItemDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class OrderItemComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-order-item-mag div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class OrderItemDialogPage {
    modalTitle = element(by.css('h4#myOrderItemLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    quantityInput = element(by.css('input#field_quantity'));
    orderSelect = element(by.css('select#field_order'));
    storageSelect = element(by.css('select#field_storage'));
    productSelect = element(by.css('select#field_product'));
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

    orderSelectLastOption = function() {
        this.orderSelect.all(by.tagName('option')).last().click();
    };

    orderSelectOption = function(option) {
        this.orderSelect.sendKeys(option);
    };

    getOrderSelect = function() {
        return this.orderSelect;
    };

    getOrderSelectedOption = function() {
        return this.orderSelect.element(by.css('option:checked')).getText();
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
