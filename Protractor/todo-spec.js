const { browser, by, element } = require("C:/Users/User/AppData/Roaming/npm/node_modules/protractor"),
  mainPage = "https://rooms.ryanair.com/ie/en",
  myBookingsButton = "button.user-controls__btn.user-controls__my-bookings-link",
  singUpPopUp = "div.dialog.signup-dialog",
  switchLanguageButton = "span.ico-flag.ico-flag--active.ie",
  allLanguagesPanel = "div.market-list",
  cookiesPopUp = "icon.cookies-policy__icon",
  newSearchFilterButton = "span.new-search__refine-button-text",
  newSearchFilterPanel = "div.new-search__filters.new-search__filters--desktop",
  creditBalanceBanner = "div.flight-credits__balance",
  customersReviewsPanel = "section.testimonials__container",
  contactUsButton = "a[href*='https://www.ryanair.com/ie/en/useful-info/contact-us']",
  contactUsLinkPage = "https://www.ryanair.com/ie/en/useful-info/contact-us",
  discount = "img.aem-banner__image",
  travelCreditButton = "a[href*='https://www.ryanair.com/gb/en/plan-trip/travel-extras/travel-credit']",
  travelCreditLink = "https://www.ryanair.com/gb/en/plan-trip/travel-extras/travel-credit",
  carriageConditionsButton = "a[href*='/faq-overview/conditions-of-carriage/conditions-of-carriage']",
  carriageConditionsLink = "https://www.ryanair.com/ie/en/useful-info/help-centre/faq-overview/conditions-of-carriage/conditions-of-carriage",
  partnersLogoBanner = "div.home__vendor-logos";

describe("'Ryanair rooms' website testing", function () {

  it("View my bookings on Ryanair Rooms website", function () {
    browser.get(mainPage);
    $(myBookingsButton).click();
    let loginForm = $(singUpPopUp);
    expect(loginForm.isDisplayed()).toBe(true);
  });


  it("Go to main page Ryanair Rooms website and switch language", function () {
    browser.get(mainPage);
    $(switchLanguageButton).click();
    let languagePanel = $(allLanguagesPanel);
    expect(languagePanel.isDisplayed()).toBe(true);
  });

  it("Download available rooms in select destination", function () {
    browser.get(mainPage);
    $(cookiesPopUp).click();
    $(newSearchFilterButton).click();
    let coveredPanel = $(newSearchFilterPanel);
    expect(coveredPanel.isDisplayed()).toBe(true);
  });

  it("Covered panel with filter items", function () {
    $(newSearchFilterButton).click();
    let creditTravelPanel = $(creditBalanceBanner);
    expect(creditTravelPanel.isDisplayed()).toBe(true);
  });

  it("Scroll to bottom and find customers reviews", function () {
    scrollingButton = $("div.grecaptcha-logo");
    browser.executeScript('arguments[0].scrollIntoView({inline:"end", block:"end"})', scrollingButton.getWebElement());
    let customersReviews = $(customersReviewsPanel);
    expect(customersReviews.isDisplayed()).toBe(true);
  });

  it("Download contact info after click button on the bottom of main page", function () {
    $(contactUsButton).click();
    browser.manage().timeouts(20000);
    let contactsPage = browser.getCurrentUrl();
    expect(contactsPage).toBe(contactUsLinkPage);
  });

  it("Back to ROOM's page and see 5% discount", function () {
    browser.navigate().back();
    let discountBanner = $(discount);
    expect(discountBanner.isDisplayed()).toBe(true);
  });

  it("Follow link 'How do I build my balance?'", function () {
    scrollingButton = $("div.grecaptcha-logo");
    browser.executeScript('arguments[0].scrollIntoView({inline:"nearest", block:"center"})', scrollingButton.getWebElement());
    $(travelCreditButton).click();
    browser.getAllWindowHandles()
      .then(function (handles) {
        browser.switchTo().window(handles[1]);
        let bonusPage = browser.getCurrentUrl();
        expect(bonusPage).toBe(travelCreditLink);
      });
  });

  it("Visit carriage page", function () {
    browser.get(mainPage);
    scrollingButton = $("div.grecaptcha-logo");
    browser.executeScript(`arguments[0].scrollIntoView({inline:"end", block:"end"})`, scrollingButton.getWebElement());
    $(carriageConditionsButton).click();
    browser.sleep(15000); // без этого не получает нужный URL в том же самом окне
    let carriagePage = browser.getCurrentUrl();
    expect(carriagePage).toBe(carriageConditionsLink);
  });

  it("Back to main page and see the partners-logo-banner", function () {
    browser.navigate().back();
    browser.sleep(15000); // без этого не видит нужный элемент - страница грузится долго
    let logos = $(partnersLogoBanner);
    expect(logos.isDisplayed()).toBe(true);
    browser.quit();
  });

});