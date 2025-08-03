**Playwright Test Automation Framework**

- This repository provides a robust, maintainable Playwright-based test automation framework that follows industry best practices:

- Page Object Model (POM): Clear separation of locators and actions for each page.

- Factory Pattern: Centralized management of test users, environments, and browsers.

- Support Utilities: Custom fixtures, helper functions, and global setup routines.

- External Test Data: JSON/TS files for credentials and environment configurations.


**Table of Contents**
* Prerequisites

* Installation

* Project Structure

* Configuration

* Running Tests

* Reporting

* Patterns & Folders

* Adding New Pages / Tests

* Troubleshooting

* Contributing


**Prerequisites**

* Before you begin, ensure you have the following installed on your machine:

* Node.js (v18 or higher)

* npm (bundled with Node.js)

* Operating System: Windows, macOS, or Linux

Verify your environment:
<details> <summary>Verify your environment</summary>
# Check Node.js and npm
node -v    # e.g., v18.x.x or above
npm -v     # e.g., 8.x.x or above
</details>


**Installation**

1. Clone the repository
```bash
   git clone https://github.com/<OWNER>/<REPO>.git
   cd <REPO>
```

2. Install dependencies
```bash
    npm install
```

3. Install Playwright browsers
```bash
    npx playwright install
```

4. Optional: Scaffold Playwright
```bash
    npm init playwright@latest
    # or
    npm install -D @playwright/cli && npx playwright init

```

**Project Structure**
```text
project-root/
├── e2e/                # Test specs (TypeScript)
│   └── *.spec.ts
├── src/
│   ├── common/
│   │   ├── baseComponent.ts   # Base class for CommonAction & CommonAssertion
│   │   ├── locator.ts         # Function-based locators map
│   │   ├── action.ts          # CommonAction with auto-wait
│   │   └── assertion.ts       # CommonAssertion
│   ├── pages/                 # Page Object classes
│   │   ├── loginPage/
│   │   │   ├── locator.ts     # loginLocators map + types
│   │   │   └── action.ts      # LoginActions using BaseComponent
│   │   └── facadeStructure
|   |       └── facadeClass.ts # Facade for all Page Objects
│   ├── factories/            # Factory implementations
│   │   ├── UserFactory.ts
│   │   ├── EnvFactory.ts
│   │   └── BrowserFactory.ts
│   ├── dataTest/             # External test data
│   │   ├── users.json        # (deprecated for env/creds)
│   │   └── environments.json # (deprecated for .env)
│   └── support/              # Fixtures & helpers
│       ├── contants
|       |    └── global.ts    # Global setup root  
│       ├── baseTest.ts       # BaseTest wrapper with hooks and custom trace/video
│       ├── fixtures.ts       # test.extend, beforeEach/afterEach hooks
│       ├── global-setup.ts   # runs once before suite
│       ├── global-teardown.ts# runs once after suite
│       └── helpers.ts
├── test-result              # All timestamped reports, videos, screenshots, traces
├── playwright.config.ts     # Test configuration
├── .env                     # Environment variables (baseURL, credentials)
├── tsconfig.json            # TypeScript config
└── package.json             # npm scripts & dependencies
```


**Configuration**
1. Environments
* Define environments in src/dataTest/environments.json for dev, staging, and prod.
* Access via EnvFactory.getConfig(TEST_ENV) in playwright.config.ts.

2. Users
* Store credentials in src/dataTest/users.json for roles like admin, regular, guest.
* Retrieve via UserFactory.getUser(role) in actions or tests.

3. Users
* Configure browser projects in playwright.config.ts using
BrowserFactory.createProject(browser).

4. TypeScript
* Ensure resolveJsonModule and esModuleInterop are enabled in tsconfig.json, and include JSON files.


**Running Tests**
* Run all tests
```
    npm test
```

* Run a specific spec
```
    npx playwright test e2e/example.spec.ts
```

* Run in a specific browser
```
    npx playwright test --project=chromium
```

* Run test with open UI
```
    npx playwright test --ui
```

* Run test with Debug mode
```
    npx playwright test --debug
```

* Run against a different environment
```
    TEST_ENV=staging npm test      # Linux/macOS
    $env:TEST_ENV="prod"; npm test # Windows PowerShell
```
* Install Env file
```
    npm install dotenv
```

**Reporting**
* HTML Report
```
    npm run test:report
```
View results in playwright-report/index.html.

* JUnit XML (if enabled)
```
    Generated in junit-results/results.xml.
```

* Allure (optional)
```
    npm install -D allure-playwright
    # add 'allure-playwright' to reporters in config
    npm test
    npx allure generate
    npx allure open
```

**Patterns & Folders**
* POM: src/pages with separate locator & action files.

* Factory Pattern: src/factories for env, users, browsers.

* Auto-Wait: CommonAction automatically waits for visibility.

* Facade: src/pages/app.ts aggregates Page Objects.

* Hooks: test.beforeEach & test.afterEach in fixtures.ts.


**Adding New Pages / Tests**
1. Define locators in a new locator.ts.

2. Create a corresponding .actions.ts using CommonAction.

3. (Optional) Add test data to dataTest and update factories.

4. Write spec files under e2e/, using fixtures from src/support/fixtures.ts.


**Troubleshooting**
* Module not found: run npm install -D @playwright/test.

* JSON import issues: enable resolveJsonModule in tsconfig.json.

* Unknown CLI commands: use npm init playwright@latest or install @playwright/cli.

* Missing locators: update the map in locator.ts and reload TS server.


**Contributing**
* Contributions are welcome! Please open issues or PRs for:

* New page objects or tests

* Additional factories or helper utilities

* CI/CD integration improvements