const { expect } = require("@playwright/test");

class ConfirmationPage {
    constructor(page) {
        this.message = page.locator(".hero-primary");
        this.orderid = page.locator("tr label.ng-star-inserted");
        this.orderpage = page.locator("button[routerlink='/dashboard/myorders']");
        this.orderitems = page.locator("tbody tr th");
        this.view = page.locator("button:has-text('View')");
        this.orderidconfirmation = page.locator("div.col-text");
    }

    async verifythankmessage(mess){
        await expect(this.message).toHaveText(mess);
    }


    async orderdetailsconfirmation() {
        const orderidString = await this.orderid.textContent();
        const Orderid = orderidString.split("|")[1].trim();
        console.log(Orderid);
        await this.orderpage.click();
        await this.orderitems.last().waitFor();
        console.log(await this.orderitems.allTextContents());
        console.log(await this.orderitems.count());

        const orderlistcount = await this.orderitems.count();
        //  Await the function call once

        for (let i = 0; i < orderlistcount; i++) {
            const currentOrderId = (await this.orderitems.nth(i).textContent()).trim(); // Trim text content

            if (currentOrderId === Orderid) {
                console.log(currentOrderId);
                await this.view.nth(i).click();
                break;
            }
        }

        const orderidconfirmation = await this.orderidconfirmation.textContent();
        expect(orderidconfirmation.includes(Orderid)).toBeTruthy();
        

    }
    //npx playwright test tests/ClientAppPO.spec.js
    
}
module.exports={ConfirmationPage};
