const puppeteer = require("puppeteer");
const fs = require("fs");

// Credential constants
const LINKEDIN_LOGIN_URL = "https://www.linkedin.com/login";
const EMAIL = "your-email@example.com";
const PASSWORD = "your-password";
const LOG_FILE = "out.log";

// Function for writing logs to a file
const log = (message) => {
  fs.appendFileSync(LOG_FILE, `[${new Date().toISOString()}] ${message}\n`);
};

// Delay function
const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

// A function for launching a browser and logging in to LinkedIn
async function loginAndFetchProfileImage() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    log("Navigating to LinkedIn login page.");
    await page.goto(LINKEDIN_LOGIN_URL);
    await delay(2000); 

    log("Entering login credentials.");
    await page.type("#username", EMAIL, { delay: 100 });
    await delay(1000);
    await page.type("#password", PASSWORD, { delay: 100 });
    await delay(1500);

    log("Attempting to log in.");
    await page.click('button[type="submit"]');
    await page.waitForNavigation();

    // Getting a profile link
    const profileUrl = await page.evaluate(() => {
      const profileElement = document.querySelector('a[href*="/in/"]');
      return profileElement ? profileElement.href : null;
    });

    if (profileUrl) {
      log(`Profile URL found: ${profileUrl}`);
      await page.goto(profileUrl); // Go to the profile page
      await delay(2000); // Delay to simulate profile view

      const profileImageUrl = await fetchProfileImage(page);
      if (profileImageUrl) {
        log(`Profile image found: ${profileImageUrl}`);
      } else {
        log("Profile image not found.");
      }
    } else {
      log("Profile URL not found.");
    }
  } catch (error) {
    log(`Error encountered: ${error.message}`);
  } finally {
    await browser.close();
  }
}

// Function to get profile picture URL
async function fetchProfileImage(page) {
  return await page.evaluate(() => {
    // We are looking for an element with the class .evi-image.ember-view.profile-photo-edit__preview
    const img = document.querySelector(
      ".evi-image.ember-view.profile-photo-edit__preview"
    );
    return img ? img.src : null; // We return the URL of the image, if it exists
  });
}

// Performance of the main function
loginAndFetchProfileImage();
