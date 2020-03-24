const chai = require("chai"),
  expect = chai.expect,
  chaiAsPromised = require("chai-as-promised"),
  { describe, it } = require("mocha"),
  testing = require("../functions/testing.js"),
  driver = testing.driver;

let expectedTitle = "adidas - каталог 2020-2021 в интернет магазине WildBerries.by",
  expectedTitleAfterRefresh = "Купить товары для животных в интернет магазине WildBerries.by",
  expectedResult = true,
  mainPage = "https://www.wildberries.by/";

chai.use(chaiAsPromised);

describe("Testing WildBerries.by", async function () {
  this.beforeEach(async function () { // без THIS не работает
    await driver.manage().window().maximize();
    await driver.get(mainPage);
  });

  this.afterAll(async function () { // без THIS не работает
    testing.driverExit();
  });

  it("should download correct page", async function () {
    let title = await testing.getPageTitle();
    expect(title).to.equal(expectedTitle);
  });

  it("should push button and download page after refresh", async function () {
    let title = await testing.getTitleAfterRefresh();
    expect(title).to.equal(expectedTitleAfterRefresh);
  });

  it("Instagram button testing", async function () {
    let actualResult = await testing.scrollDownAndPushInstagramButton();
    expect(actualResult).to.equal(expectedResult);
  });

  it("Promo image testing", async function () {
    let actualResult = await testing.findPromoImage();
    expect(actualResult).to.equal(expectedResult);
  });

  it("Verify catalog product image size", async function () {
    let actualResult = await testing.verifyCatalogImageSize();
    let expectedResult = "c246x328";
    expect(actualResult).to.equal(expectedResult);
  });

  it("Verify display on screen list of pick-up points", async function () {
    let actualResult = await testing.getInfoAboutPickUpPoints();
    expect(actualResult).to.equal(expectedResult);
  });

  it("Check appears of window for enter phone and submit button", async function () {
    let actualResult = await testing.loginFormByPhoneIsVisible();
    expect(actualResult).to.equal(expectedResult);
  });

  it("Catalog with food for cats is display", async function () {
    let actualResult = await testing.foodForCatIsDisplay();
    expect(actualResult).to.equal(expectedResult);
  });

  it("Toys latest items is display", async function () {
    let actualResult = await testing.toysLatestItemsIsDisplay();
    expect(actualResult).to.equal(expectedResult);
  });

  it("Instruction for buy is fully visible after run from basket", async function () {
    let actualResult = await testing.instructionForBuyIsDisplay();
    expect(actualResult).to.equal(expectedResult);
  });
});
