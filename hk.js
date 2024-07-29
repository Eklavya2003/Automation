const puppeteer = require("puppeteer");
const loginLink =
  "https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin";

const email = "22052381@kiit.ac.in";
const password = "Sujal@123";

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
  });
