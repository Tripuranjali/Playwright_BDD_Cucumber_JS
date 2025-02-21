const  base  = require('@playwright/test');

exports.customtest=base.test.extend({
    TestDataForOrder: {
        username: "abtripuranjali@gmail.com",
        password: "Anjali@270199#",
        productname: "IPHONE 13 PRO",
        cvvcode: "799",
        halfcountry: "ind",
        Country: " India"
    }
})

//