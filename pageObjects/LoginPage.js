class LoginPage{

    constructor(page){
       
        this.page=page;
        this.username=page.locator('#userEmail');
        this.password=page.locator('#userPassword');
        this.signin=page.locator("[value='Login']");
    }

    async goToUrl(urlparam){
        await this.page.goto(urlparam);
        

    }

   async validLogin(usernameparam,passwordparam){
        await this.username.fill(usernameparam);
        await this.password.fill(passwordparam);
        await this.signin.click();
        await this.page.waitForLoadState('networkidle');  // waiting for all network to be in ideal state - microservice architecture

    }
}
module.exports={LoginPage};