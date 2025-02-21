// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',// whatever tests are present in testfolder will be executed
  retries:1,
  workers:10,
  timeout:40000, // timeout for components and each step by default its 30 but here its overriden to 40
  expect :{
    timeout:10000 // timeout for Assertion by default its 30 but here its overriden to 40
  },
  reporter: [["html"],["line"], ["allure-playwright"]],
  projects:[
    {
    name:'chromium',
    use: {
        browserName: 'chromium',
        headless: false,
        screenshot:'on',
        trace: 'on', // 'retain-on-failure' -recommended as it can save the memory
        video:'retain-on-failure',
        //ignoreHTTPSErrors:true,
        //permissions:['geolocation']
        //viewport:{width:720,height:820}
     
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        //npx playwright test --trace=on
    
      },
  },
  {
    name:'safari',
    use: {
        browserName: 'webkit',
        headless: true,
        screenshot:'off',
        trace: 'on', // 'retain-on-failure' -recommended as it can save the memory
        ...devices['iPhone 11 Pro'],
     
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        //npx playwright test --trace=on
    
      },
  }


]


});

