const { Builder, By, Key, until } = require("selenium-webdriver");
let driver = new Builder().forBrowser("chrome").build();

const harryPotterId = "c9515606",
  bookDostoevskij = "//div[@id='c2263984']//img[@alt='Преступление и наказание Азбука']",
  promoImage = "j-big-sale-icon-card-wrapper i-spec-action-v1",
  instagramButton = "//*[@id='footer']//div[@class='col social']//*[@class='inst']",
  pageName = "Wildberries.by - модный интернет магазин",
  loginButton = "//a[@class='offline open user-menu-login j-main-login']",
  addressesButton = "//div[@id='head-pick-point-address']//a[@href='https://www.wildberries.by/services/besplatnaya-dostavka#pickupPoints']",
  basketButtonLink = "div#basketContent a.my-basket",
  instructionButtonLink = "div#footer a[href*='/services/kak-sdelat-zakaz']",
  usualTitle = "Wildberries.by - модный интернет магазин",
  inputText = "adidas",
  searchField = "tbSrch",
  zooItemsLink = "//a[@href='https://www.wildberries.by/catalog/tovary-dlya-zhivotnyh']",
  harryPotterTitle = "книга гарри поттер и кубок огня",
  bookTitle = "достоевский",
  listOfAddresses = "//li[@id='1']",
  listOfCitiesIsDisplay = "//li[@id='1' and @class='display_types-list active']",
  listOfCities = "//div[@id='cityList']",
  phoneInput = "//input[@id='phoneMobile']",
  phoneNumber = "29111111",
  submitLoginForm = "button.c-btn-main-lg-v1.btn-submit.jq-request-code",
  zooItems = "a[href*='/catalog/tovary-dlya-zhivotnyh']",
  expectedZooTitle = "Купить товары для животных в интернет магазине WildBerries.by",
  catsButton = "li[data-menu-id^='16347'] a[href*='/catalog/tovary-dlya-zhivotnyh/dlya-koshek']",
  expectedCatTitle = "Купить товары для кошек в интернет магазине WildBerries.by",
  catsFoodButton = "div#catalog a[href*='/catalog/tovary-dlya-zhivotnyh/dlya-koshek/korm-i-lakomstva']",
  catsFoodCatalog = "div#catalog-content",
  toysButton = "div#top-menu a[href$='catalog/igrushki']",
  latestItemsBanner = "div#novelties",
  howToBuy = "div#howTo",
  imageAttribute = "data-imgsize";

async function getPageTitle() {
  try {
    await driver.findElement(By.id(searchField )).sendKeys(inputText, Key.RETURN);
    return await driver.getTitle();
  } catch (error) {
    console.log(new Error(error.message));
  }
}

async function getTitleAfterRefresh() {
  try {
    await driver.navigate().refresh();
    await driver.findElement(By.xpath(zooItemsLink)).click();
    return await driver.getTitle();
  } catch (error) {
    console.log(new Error(error.message));
  }
}

async function scrollDownAndPushInstagramButton() {
  try {
    await driver.executeScript("window.scrollTo(0, document.body.scrollHeight)"); // см. ссылку в Teams
    return (await driver.findElement(By.xpath(instagramButton)).isDisplayed());
  } catch (error) {
    console.log(new Error(error.message));
  }
}

async function findPromoImage() {
  try {
    await driver.findElement(By.id(searchField )).sendKeys(harryPotterTitle, Key.RETURN);
    await driver.findElement(By.id(harryPotterId)).click();
    return (await driver.findElement(By.className(promoImage)).isDisplayed());
  } catch (error) {
    console.log(new Error(error.message));
  }
}

async function verifyCatalogImageSize() {
  try {
    await driver.findElement(By.id(searchField )).sendKeys(bookTitle, Key.RETURN);
    return await driver.findElement(By.xpath(bookDostoevskij)).getAttribute(imageAttribute);
  } catch (error) {
    console.log(new Error(error.message));
  }
}

async function getInfoAboutPickUpPoints() {
  try {
    await driver.findElement(By.xpath(addressesButton)).click();
    await driver.wait(until.titleIs(pageName));
    await driver.findElement(By.xpath(listOfAddresses)).click();
    await driver.findElement(By.xpath(listOfCitiesIsDisplay));
    return (await driver.findElement(By.xpath(listOfCities)).isDisplayed());
  } catch (error) {
    console.log(new Error(error.message));
  }
}

async function loginFormByPhoneIsVisible() {
  try {
    await driver.findElement(By.xpath(loginButton)).click();
    await driver.findElement(By.xpath(phoneInput)).sendKeys(phoneNumber, Key.NULL);
    return (await driver.findElement(By.css(submitLoginForm)).isDisplayed());
  } catch (error) {
    console.log(new Error(error.message));
  }
}

async function foodForCatIsDisplay() {
  try {
    await driver.findElement(By.css(zooItems)).click();
    await driver.wait(until.titleIs(expectedZooTitle), 1000);
    await driver.findElement(By.css(catsButton)).click();
    await driver.wait(until.titleIs(expectedCatTitle), 1000);
    await driver.findElement(By.css(catsFoodButton)).click();
    return (await driver.findElement(By.css(catsFoodCatalog)).isDisplayed());
  } catch (error) {
    console.log(new Error(error.message));
  }
}

async function toysLatestItemsIsDisplay() {
  try {
    await driver.findElement(By.css(toysButton)).click();
    await driver.executeScript("window.scrollBy(0, 500)", "");
    return (await driver.findElement(By.css(latestItemsBanner)).isDisplayed());
  } catch (error) {
    console.log(new Error(error.message));
  }
}

async function instructionForBuyIsDisplay() {
  try {
    await driver.findElement(By.css(basketButtonLink)).click();
    await driver.wait(until.titleIs(usualTitle));
    await driver.executeScript("window.scrollBy(0, 600)", "");
    await driver.findElement(By.css(instructionButtonLink)).click();
    return (await driver.findElement(By.css(howToBuy)).isDisplayed());
  } catch (error) {
    console.log(new Error(error.message));
  }
}

async function driverExit() {
  await driver.quit();
}

module.exports = {
  getPageTitle, // id
  getTitleAfterRefresh, // Xpath
  scrollDownAndPushInstagramButton, // Xpath
  findPromoImage, // id & className
  verifyCatalogImageSize, // id & Xpath
  getInfoAboutPickUpPoints, // Xpath
  loginFormByPhoneIsVisible, // Xpath & CSS
  foodForCatIsDisplay, // CSS selector
  toysLatestItemsIsDisplay, // CSS selector
  instructionForBuyIsDisplay, // CSS selector
  driverExit,
  driver
};