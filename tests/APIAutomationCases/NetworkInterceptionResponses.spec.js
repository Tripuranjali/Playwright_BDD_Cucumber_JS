const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../../utilities/APIUtils');

const loginapipayload = { userEmail: "abtripuranjali@gmail.com", userPassword: "Anjali@270199#" };
const placeorderapipayload = { orders: [{ country: "Cuba", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] };
const fakePayLoadOrders = { data: [], message: "No Orders" };



test.beforeAll(async () => {
  const apiContext = await request.newContext();

  const apiutils = new APIUtils(apiContext, loginapipayload);
  Response = await apiutils.createOrder(placeorderapipayload);

})


test('Place Order API-Network Interception', async ({ page }) => {
  page.addInitScript(value => { window.localStorage.setItem('token', value) }, Response.tokenproperty);
  await page.goto("https://rahulshettyacademy.com/client");

  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayLoadOrders);
      route.fulfill(
        {
          response,
          body,

        });
      //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
    });

  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")

  console.log(await page.locator(".mt-4").textContent());


});
//npx playwright test tests/NetworkInterceptionRequests.spec.js
//npx playwright test tests/WebAPIPart1.spec.js --headed