const {expect} = require('@playwright/test');
class DashboardPage{

    constructor(page){
        this.page=page;        
        this.products=page.locator(".card-body");
        this.productslist=page.locator(".card-body b");
        this.cart=page.locator("[routerlink*='cart']");
        this.waitingele=page.locator("div li");
        
    }

    async addTheProductToCart(productName){
        console.log(await this.productslist.allTextContents());
        const count = await this.products.count();
        for (let i=0;i<count;i++){
            if(await this.products.nth(i).locator("b").textContent()===productName){
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
    
            }
    
        }

        await this.cart.click();
        await  this.waitingele.last().waitFor();
        const bool=await this.page.locator(`h3:has-text("${productName}")`).isVisible();
        expect(bool).toBeTruthy();
        
        
    }


}
module.exports={DashboardPage};