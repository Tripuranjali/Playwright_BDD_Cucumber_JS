Feature: E2E_EcommerceValidations
    @Regression
    Scenario Outline: Placing the Order for different products

        Given user login to Ecommerce application with "<username>" and "<password>"
        When user adds "<productname>" to the cart and verify item is displayed in the cart
        And user enters valid details like cvv code, Country "<cvv>","<halfcountry>"," India", "<username>" in the checkout page and place an order
        Then verify if the order is present in the order history page

        Examples:
            | username                 | password       | productname     | cvv | halfcountry |
            | abtripuranjali@gmail.com | Anjali@270199# | ZARA COAT 3     | 900 | ind         |
            | abtripuranjali@gmail.com | Anjali@270199# | ADIDAS ORIGINAL | 800 | ind         |
            | abtripuranjali@gmail.com | Anjali@270199# | IPHONE 13 PRO   | 700 | ind         |



