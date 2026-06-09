const { chromium } = require('playwright');
(async () => {
  let browser;
  try {
    browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.tutorialspoint.com/selenium/practice/text-box.php');
    await page.getByRole('button', { name: 'Alerts, Frames & Windows' }).click();
    await page.getByRole('link', { name: 'Browser Windows', exact: true }).click();

    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.getByRole('button', { name: 'New Tab' }).click(),
    ]);
    await newPage.waitForLoadState('load');

    console.log('URL:', newPage.url());
    console.log('Title:', await newPage.title());
    console.log('Body text snippet:', (await newPage.locator('body').innerText()).slice(0,1400));
    const label = newPage.getByText('Sample New Tab', { exact: true });
    console.log('Label count:', await label.count());
    console.log('Label isVisible:', await label.isVisible());
    console.log('Label text:', await label.innerText());
    console.log('Label HTML:', await label.first().evaluate(el => el.outerHTML));
  } catch (err) {
    console.error('Error:', err);
  } finally {
    if (browser) await browser.close();
  }
})();
