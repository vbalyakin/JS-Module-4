exports.config = {
  framework: "jasmine",
  seleniumAddress: 'http://localhost:8090/wd/hub',
  seleniumPort: 8090,
  capabilities: {
    "browserName": "chrome"
  },
  specs: ['todo-spec.js'],
  jasmineNodeOpts: {
    showColors: true
  },
  onPrepare: () => {
    browser.manage().window().maximize();
  }
};