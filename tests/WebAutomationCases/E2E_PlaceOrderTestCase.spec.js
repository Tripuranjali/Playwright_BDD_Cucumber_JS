const { test } = require('@playwright/test');
const { pageObjectManager } = require('../../pageObjects/pageObjectManager');
const dataset = JSON.parse(JSON.stringify(require('../../testData/ClientAppPOdata.json')));
const { customtest } = require('../../customFixtures/fixturetestdata');



//test.describe.configure({mode:'parallel'});
//test.describe.configure({mode:'serial'});- if the  tests is failed then it will skip the dependent tests
for (const data of dataset) {
    test(`Client App PO Login Test for ${data.productname}`, async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const poManager = new pageObjectManager(page);
        const url = "https://rahulshettyacademy.com/client";
        const Lp = poManager.getLoginPage();
        await Lp.goToUrl(url);
        await Lp.validLogin(data.username, data.password);
        const dp = poManager.getDashboardPage();
        await dp.addTheProductToCart(data.productname);
        const cp = poManager.getCheckOutPage();
        await cp.fillCheckOutPage(data.cvvcode, data.halfcountry, data.Country, data.username);
        await cp.placeorder();
        const fp = poManager.getConfirmationPage();
        await fp.verifythankmessage(" Thankyou for the order. ")
        await fp.orderdetailsconfirmation();

    });

}

customtest('Client App PO Login Test', async ({ page,TestDataForOrder }) => {
    const poManager = new pageObjectManager(page);
    const url = "https://rahulshettyacademy.com/client";
    const Lp = poManager.getLoginPage();
    await Lp.goToUrl(url);
    await Lp.validLogin(TestDataForOrder.username, TestDataForOrder.password);
    const dp = poManager.getDashboardPage();
    await dp.addTheProductToCart(TestDataForOrder.productname);
    const cp = poManager.getCheckOutPage();
    await cp.fillCheckOutPage(TestDataForOrder.cvvcode, TestDataForOrder.halfcountry, TestDataForOrder.Country, TestDataForOrder.username);
    await cp.placeorder();
    const fp = poManager.getConfirmationPage();
    await fp.verifythankmessage(" Thankyou for the order. ")
    await fp.orderdetailsconfirmation();

});





//npx playwright test tests/E2E_PlaceOrderTestCase.spec.js

