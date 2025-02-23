const { When, Then,Given } = require('@cucumber/cucumber');
const { pageObjectManager } = require('../pageObjects/pageObjectManager');
const  playwright  = require('@playwright/test');


Given('user login to Ecommerce application with {string} and {string}',{timeout:10*1000} ,async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
   
    const Lp = this.poManager.getLoginPage();
    await Lp.goToUrl("https://rahulshettyacademy.com/client");
    await Lp.validLogin(username, password);
  });

  When('user adds {string} to the cart and verify item is displayed in the cart', async function (productname) {
    // Write code here that turns the phrase above into concrete actions
    const dp = this.poManager.getDashboardPage();
    await dp.addTheProductToCart(productname);
  });


  When('user enters valid details like cvv code, Country {string},{string},{string}, {string} in the checkout page and place an order', async function (cvvcode,halfcountry,Country,username) {
    // Write code here that turns the phrase above into concrete actions
    const cp = this.poManager.getCheckOutPage();
    await cp.fillCheckOutPage(cvvcode, halfcountry, Country,username);
    await cp.placeorder();
  });

  Then('verify if the order is present in the order history page', async function () {
    // Write code here that turns the phrase above into concrete actions
    const fp = this.poManager.getConfirmationPage();
    await fp.verifythankmessage(" Thankyou for the order. ")
    await fp.orderdetailsconfirmation();

  });

