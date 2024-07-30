const { Keyboard } = require("puppeteer");
const puppeteer = require("puppeteer");
const loginLink =
  "https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin";

const email = "__";
const password = "__";
const jobName = "delloite";

let browserOpen = puppeteer.launch({
  headless: false,

  args: ["--start-maximized"],

  defaultViewport: null,
});

let page;

browserOpen
  .then(function (browserObj) {
    let browserOpenPromise = browserObj.newPage();
    return browserOpenPromise;
  })
  .then(function (newTab) {
    page = newTab;
    let LinkedinOpenPromise = newTab.goto(loginLink);
    return LinkedinOpenPromise;
  })
  .then(function () {
    let emailEntered = page.type("input[id='username']", email, { delay: 50 });
    return emailEntered;
  })
  .then(function () {
    let passwordIsEntered = page.type("input[id='password']", password, {
      delay: 50,
    });
    return passwordIsEntered;
  })
  .then(function () {
    let loginButtonClicked = page.click(
      'button[class="btn__primary--large from__button--floating"]',
      { delay: 50 }
    );
    return loginButtonClicked;
  })
  .then(function () {
    let SearchClicked = waitAndClick("input[placeholder='Search']", page);
    return SearchClicked;
  })
  .then(function () {
    let jobNames = page.type("input[placeholder='Search']", jobName);
    return jobNames;
  })
  .then(function () {
    return page.keyboard.press("Enter");
  })
  .then(function () {
    let ClickedonJob = waitAndClick(
      `.reusable-search__entity-cluster--quick-filter-action-container a[href="https://www.linkedin.com/jobs/search?keywords=delloite&f_AL=true"]`,
      page,
      { delay: 50 }
    );
    return ClickedonJob;
  })
  .then(function () {
    let ClickedonJobApply = waitAndClick(
      `#ember641 use[href="#linkedin-bug-xxsmall"]`,
      page,
      { delay: 50 }
    );
    return ClickedonJobApply;
  });

function waitAndClick(selector, cPage) {
  return new Promise(function (resolve, reject) {
    cPage
      .waitForSelector(selector)
      .then(function () {
        return cPage.click(selector);
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        reject(err);
      });
  });
}
