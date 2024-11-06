# LinkedIn Profile Image Fetcher

This project automates the process of logging into LinkedIn, searching for a profile URL, and uploading profile pictures. The script uses Puppeteer to simulate browser actions and writes all logs to the `out.log` file.

## Requirements

- Node.js >= 14
- Puppeteer
- File with credentials (login and password)

## Installation

1. Clone the repository or upload the files.

```bash
git clone https://github.com/your-username/linkedin-profile-fetcher.git
```

2. Go to the project directory:

```bash
cd linkedin-profile-fetcher
```

3. Install the necessary dependencies:

```bash
npm install
```

## Settings

# Before running the script, you need to configure your LinkedIn login credentials:

1. Open the index.js file and replace the values ​​of the EMAIL and PASSWORD variables with your own data:

```bash
const EMAIL = "your-email@example.com";
const PASSWORD = "your-password";
```

## Launch

# To run the script, execute the command:

```bash
node index.js

```
# This script will do the following:

- Will open LinkedIn and log in with the specified credentials.
- Go to the main page of LinkedIn and find the user's profile.
- After going to the profile page, the script will try to get the URL of the profile image.
- Outputs the received information to the out.log file.

## Logs
# All error messages, as well as the found profile URL and profile image, will be written to the out.log file.

## Delays
# The script includes artificial delays between actions to simulate real human actions, which helps avoid blocking or bot checks by LinkedIn.

## Notes
- Use of this script must comply with LinkedIn's terms of use.
- If CAPTCHA or other protections appear on the page, this script will not be able to bypass them without additional settings, such as integration with CAPTCHA solving services.

## Contact

- tg: https://t.me/vlad54703
- mail: vlad.kovalov2000@gmai.com
- linkedin: https://www.linkedin.com/in/vlad-kovalyov/