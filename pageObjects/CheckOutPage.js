const {expect} = require('@playwright/test');
class CheckOutPage {

    constructor(page) {
        this.page = page;
        this.checkoutbutton = page.locator("text=Checkout");
        this.cvvtext = page.locator('input[type="text"]');
        this.country = page.locator("[placeholder*='Country']");
        this.drpdownresults = page.locator(".ta-results");
        this.emailtext=page.locator(".user__name [type='text']").first();
        this.placeorderbtn=page.locator(".action__submit");


    }

    async fillCheckOutPage(cvvcode, halfcountry, country, mess) {
        await this.checkoutbutton.click();
        await this.cvvtext.nth(1).fill(cvvcode);
        await this.country.pressSequentially(halfcountry);
        const dropdown = await this.drpdownresults;
        await dropdown.waitFor();
        const optcount = await dropdown.locator("button").count();
        for (let i = 0; i < optcount; i++) {
            if (await dropdown.locator("button").nth(i).textContent() === country) {
                await dropdown.locator("button").nth(i).click();
                break;
            }

        }

        await expect(this.emailtext).toHaveText(mess); 



    }


    async placeorder(){
        await this.placeorderbtn.click();
    }
}
module.exports = { CheckOutPage };