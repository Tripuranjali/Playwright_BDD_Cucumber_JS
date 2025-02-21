const{LoginPage}=require('../pageObjects/LoginPage');
const{DashboardPage}=require('../pageObjects/DashboardPage');
const{CheckOutPage}=require('../pageObjects/CheckOutPage');
const{ConfirmationPage}=require('../pageObjects/ConfirmationPage');

class pageObjectManager{
    constructor(page){
        this.page=page;
        this.Lp=new LoginPage(this.page);
        this.dp=new DashboardPage(this.page);
        this.cp=new CheckOutPage(this.page)
        this.fp=new ConfirmationPage(this.page)

    }

    getLoginPage(){
        return  this.Lp;
    }

    getDashboardPage(){
        return this.dp;

    }

    getCheckOutPage(){
        return this.cp;
    }

    getConfirmationPage(){
        return this.fp
    }

}
module.exports={pageObjectManager};