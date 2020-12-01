const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");
const jwt = require("jsonwebtoken");

if (process.argv.length !== 3) {
  console.error("Token should be provided");
  process.exit(1);
}

const token = process.argv.slice(-1)[0];

const decodedToken = jwt.decode(token);

// const BASE_URI = `https://platform-staging.hginsights.info`;
const BASE_URI = `http://192.168.229.251:3000`;

(async function example() {
  const options = new chrome.Options();
  options.addArguments("headless");
  options.addArguments("disable-gpu");
  options.addArguments("disable-extensions");

  options.set;

  let driver = await new webdriver.Builder()
    .usingServer("http://localhost:4444/wd/hub")
    .forBrowser("chrome")
    .setChromeOptions(options)
    // .withCapabilities(webdriver.Capabilities.chrome())
    .build();

  console.log("Driver initialized");

  try {
    console.log("Trying to open /authDenied");
    await driver.get(`${BASE_URI}/authDenied`);
    console.log("/authDenied opened");

    let expires = new Date();
    expires.setDate(expires.getDate() + 1);

    console.log("Trying to set localStorage");
    await driver.executeScript(
      [
        ["access_token", JSON.stringify(token)],
        ["claims", JSON.stringify(decodedToken.hgClaims.platformPerms)],
        ["oktaGroups", JSON.stringify(decodedToken.hgClaims.groups)],
        ["expires_at", JSON.stringify(expires.getTime())],
        //   ["expires_at", JSON.stringify(decodedToken.exp) + "000"],
        [
          "profile",
          JSON.stringify({
            email: decodedToken.sub,
            oktaUserId: decodedToken.uid,
          }),
        ],
      ]
        .map(
          ([key, value]) =>
            `localStorage.setItem("${key}", ${JSON.stringify(value)});`
        )
        .join("\n")
    );
    console.log("LocalStorage data is set");

    console.log("Trying to open Company Page");
    await driver.get(`${BASE_URI}/company/51957769/full`);
    console.log("Company Page opened");

    console.log("Trying to print");
    console.log(
      await driver.sendDevToolsCommand("Page.printToPDF", {
        landscape: false,
        displayHeaderFooter: false,
        printBackground: true,
        preferCSSPageSize: true,
        transferMode: "ReturnAsBase64",
      })
    );
    console.log("Print successfully done");

    const screenshot = await driver.takeScreenshot();
    await fs.promises.writeFile("./page.png", screenshot, "base64");
  } catch (err) {
    console.log(err);
  } finally {
    await driver.quit();
  }
})();
