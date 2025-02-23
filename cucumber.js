const path = require("path");

module.exports = {
  default: {
    require: [path.join(__dirname, "stepDefinitions/*.js"), path.join(__dirname, "cucumberUtils/*.js")],  
    format: ["progress", "json:reports/cucumber_report.json"],  
    paths: [path.join(__dirname, "features/*.feature")]  
  }
};
