const { BasePage } = require('./base.page');

class SliderPage extends BasePage {
  constructor(page) {
    super(page);
    this.slider = page.locator("input[value='15']").first();
    this.sliderValue = page.locator('#rangeSuccess').first();
  }

  async moveSliderTo95() {
    await this.slider.waitFor({ state: 'visible' });
    await this.slider.focus();

    const box = await this.slider.boundingBox();
    if (!box) {
      throw new Error('Slider bounding box not found.');
    }

    const startX = box.x + 10;
    const startY = box.y + box.height / 2;
    const targetX = box.x + box.width * 0.95;

    await this.page.mouse.move(startX, startY);
    await this.page.mouse.down();
    await this.page.mouse.move(targetX, startY, { steps: 20 });
    await this.page.mouse.up();

    await this.page.waitForTimeout(1000);

    let currentValue = await this.getSliderValue();
    let current = parseInt(currentValue, 10);

    while (current > 95) {
      await this.slider.press('ArrowLeft');
      current = parseInt(await this.getSliderValue(), 10);
    }

    while (current < 95) {
      await this.slider.press('ArrowRight');
      current = parseInt(await this.getSliderValue(), 10);
    }
  }

  async getSliderValue() {
    await this.sliderValue.waitFor({ state: 'visible' });
    const text = await this.sliderValue.textContent();
    return (text ?? '').trim();
  }
}

module.exports = { SliderPage };
