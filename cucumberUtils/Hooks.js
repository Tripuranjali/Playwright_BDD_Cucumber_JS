const { Before, After, AfterStep,Status } = require('@cucumber/cucumber');
const { pageObjectManager } = require('../pageObjects/pageObjectManager');
const playwright = require('@playwright/test');

Before({tags:"@Regression"},async function () {
    const browser = await playwright.chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new pageObjectManager(this.page);
})

AfterStep(async function ({result}) {
    if(result.status === Status.FAILED){
        await this.page.screenshot({path:'Screenshots/Screenshot1.png'});

    }
    
})