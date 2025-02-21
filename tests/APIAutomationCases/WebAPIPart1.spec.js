const {test, expect, request} = require('@playwright/test');
const { APIUtils } = require('../../utilities/APIUtils');

const loginapipayload={userEmail: "abtripuranjali@gmail.com", userPassword: "Anjali@270199#"};
const placeorderapipayload={orders: [{country: "Cuba", productOrderedId: "67a8dde5c0d3e6622a297cc8"}]}
let Response;


test.beforeAll(async ()=>{    
    const apiContext=await request.newContext();
    
    const apiutils=new APIUtils(apiContext,loginapipayload);
    Response=await apiutils.createOrder(placeorderapipayload);
    
})


test('@API Place Order API', async ({page})=>{
    page.addInitScript(value=>
        {window.localStorage.setItem('token',value)},Response.tokenproperty);    
        await page.goto("https://rahulshettyacademy.com/client");
        await page.locator("button[routerlink='/dashboard/myorders']").click();
        await page.locator("tbody tr th").last().waitFor();
        console.log(await page.locator("tbody tr th").allTextContents());
        console.log(await page.locator("tbody tr th").count());
        const orderlistcount=await page.locator("tbody tr th").count();
        for(let i=0;i<orderlistcount;i++){
            if(await page.locator("tbody tr th").nth(i).textContent()===Response.orderidproperty){
                console.log(await page.locator("tbody tr th").nth(i).textContent());
                await page.locator("button:has-text('View')").nth(i).click();
                break;
               // h3:has-text('ZARA COAT 3')
               //.all. td button -View
            }
        }
        const orderidconfirmation=await page.locator("div.col-text").textContent();
        expect(orderidconfirmation.includes(Response.orderidproperty)).toBeTruthy();

 });
 //npx playwright test tests/WebAPIPart1.spec.js --headed