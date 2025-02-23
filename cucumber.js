module.exports = {
  default: {
    require: ["stepDefinitions/*.js","cucumberUtils/*.js"],  // Ensure this path matches your step definitions
    format: ["progress","json:reports/cucumber_report.json"],  // Change this to an array
    paths: ["features/*.feature"],  // Ensure this matches your feature file location
    
  }
};
