const { test, expect } = require('@playwright/test');


test('Browser Context Playwright test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    page.route('**/*.css', route => route.abort());
    const username = page.locator('#username');
    const password = page.locator('#password');
    const signinbtn = page.locator('#signInBtn');
    const carttitles = page.locator(".card-body a");
    page.on('request',request=>console.log(request.url()));
    page.on('response',response=>console.log(response.url(), response.status()));
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await username.fill("rahulshetty");
    await password.fill("learning");
    await signinbtn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    await username.fill("");
    await username.fill("rahulshettyacademy");
    await password.fill("");
    await password.fill("learning");
    await signinbtn.click();
    //console.log(await carttitles.first().textContent());
    //console.log(await carttitles.nth(1).textContent());
    //console.log(await carttitles.last().textContent());
    await page.waitForLoadState('networkidle');
    console.log(await carttitles.allTextContents());

});




//UIBasicsAbortNetworkCall.spec.js

