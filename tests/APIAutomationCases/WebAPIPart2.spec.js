const {test, expect, request} = require('@playwright/test');

let webcontext;


test.beforeAll(async ({browser})=>{    
    const context=await browser.newContext();
    const page=await context.newPage();    
    const email="abtripuranjali@gmail.com"    
    const username=page.locator('#userEmail');
    const password=page.locator('#userPassword');
    const Loginbtn=page.locator("[value='Login']");  
    await page.goto("https://rahulshettyacademy.com/client");
    await username.fill(email);
    await password.fill("Anjali@270199#");
    await Loginbtn.click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path:'state.json'});
    webcontext=await browser.newContext({storageState:'state.json'})

})


test('@API Test Case 1', async ({})=>{    
    const page= await webcontext.newPage();
    const productName='ZARA COAT 3';
    const email="abtripuranjali@gmail.com"
    const products=page.locator(".card-body");
    const username=page.locator('#userEmail');
    const password=page.locator('#userPassword');
    const Loginbtn=page.locator("[value='Login']");  
    await page.goto("https://rahulshettyacademy.com/client");
    //console.log(await page.locator(".card-body b").allTextContents());
    const count = await products.count();
    for (let i=0;i<count;count++){
        if(await products.nth(i).locator("b").textContent()===productName){
            await products.nth(i).locator("text= Add To Cart").click();
            break;

        }

    }
    await page.locator("[routerlink*='cart']").click();
    //await page.waitForLoadState('networkidle');
    await page.locator("div li").last().waitFor()
    const bool=await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator('input[type="text"]').nth(1).fill("799");
    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    const dropdown=page.locator(".ta-results");
    await dropdown.waitFor();
    const optcount=await dropdown.locator("button").count();
    for(let i=0;i<optcount;i++){
        if(await dropdown.locator("button").nth(i).textContent()===" India"){
            await dropdown.locator("button").nth(i).click(); 
            break;
        }

    }
    await expect (page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderidString=await page.locator("tr label.ng-star-inserted").textContent();
    const orderid=orderidString.split("|")[1].trim();
    console.log(orderid);
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.locator("tbody tr th").last().waitFor();
    console.log(await page.locator("tbody tr th").allTextContents());
    console.log(await page.locator("tbody tr th").count());
    const orderlistcount=await page.locator("tbody tr th").count();
    for(let i=0;i<orderlistcount;orderlistcount++){
        if(await page.locator("tbody tr th").nth(i).textContent()===orderid){
            console.log(await page.locator("tbody tr th").nth(i).textContent());
            await page.locator("button:has-text('View')").nth(i).click();
            break;
           // h3:has-text('ZARA COAT 3')
           //.all. td button -View
        }
    }
    const orderidconfirmation=await page.locator("div.col-text").textContent();
    expect(orderidconfirmation.includes(orderid)).toBeTruthy();
// | 67b0b39cc019fb1ad6fa8e40 | 

    
        
 });
 test('@API Test Case 2', async ({})=>{
    const page= await webcontext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    console.log(await page.locator(".card-body b").allTextContents());

    
        
 });
 
