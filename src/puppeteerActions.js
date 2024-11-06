const puppeteer = require("puppeteer");
const { LINKEDIN_LOGIN_URL, EMAIL, PASSWORD } = require("./config");
const { log, delay } = require("./utils");

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

    // Check if CAPTCHA is present
    const captchaDetected = await page.$(".g-recaptcha");
    if (captchaDetected) {
      log("reCAPTCHA detected. Please solve it manually.");
      // Bypass reCAPTCHA:
      // 1. **Third-party services (for example, 2Captcha)**:
      // - You can use the services API for automatic CAPTCHA recognition.
      // - Need to send CAPTCHA token via API for recognition.
      // 2. **Manually**:
      // - The script can be stopped by providing a message to manually solve the CAPTCHA.
      // 3. **Parsing cookies and sessions**:
      // - Use sessions and cookies from already authorized accounts to bypass CAPTCHA.
      // - This can work if the session persists for some time.
      return;
    }

    // Getting a profile link
    const profileUrl = await page.evaluate(() => {
      const profileElement = document.querySelector('a[href*="/in/"]');
      return profileElement ? profileElement.href : null;
    });

    if (profileUrl) {
      log(`Profile URL found: ${profileUrl}`);
      await page.goto(profileUrl);
      await delay(2000);

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
    const img = document.querySelector(
      ".evi-image.ember-view.profile-photo-edit__preview"
    );
    return img ? img.src : null;
  });
}

module.exports = { loginAndFetchProfileImage };
