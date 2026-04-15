# Comparative Study: Cypress vs Playwright vs Selenium

This repository contains the implementation for a comparative study of three UI automation testing frameworks: Cypress, Playwright, and Selenium.

This project evalated the framework based on predefined criteria such as efficiency, effectiveness and usability.

---

## Project Strcuture

-'/cypress' - Cypress test scripts and setup
-'/playwright' - Playwright test scripts and setup
-'/selenium' - Selenium test scripts and setup

Each folder contains its own 'package.json' and frameworks specific configurations.

---

## Installation

install dependencies separately in each framework folder:

cd cypress
npm intall

cd ../playwright
npm install

cd --/Selenium
npm install

---

## Running Test in Headless Mode

Cypress
npx cypress run

Playwright
npx playright test

Selenium
npm test 

---

Selenium test are executed using Mocha as the test runner. Moachawesome is used for reporting, and ExcelJS is used for exporting the test results.