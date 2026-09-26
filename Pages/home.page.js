const { BasePage } = require('./base.page');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
  }

  async navigate() {
    await this.page.goto("https://www.lambdatest.com/selenium-playground");
  }

  async openSliderDemo() {
    const lnkDragDropSliders = this.page.locator("xpath=//a[contains(., 'Drag & Drop Sliders')]");

    await lnkDragDropSliders.waitFor({ state: 'visible' });
    await lnkDragDropSliders.scrollIntoViewIfNeeded();
    await lnkDragDropSliders.evaluate((element) => element.click());
  }
}

module.exports = { HomePage };
