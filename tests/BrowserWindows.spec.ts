import { test } from '@playwright/test';
import { BasePage } from '../pages/basePage';
import { SideNavigation } from '../pages/components/sideNavigation';
import { BrowserWindows } from '../pages/alerts frams and windows/BrowserWindows';

test('Verify new tab functionality', async ({ page }) => {
  const basePage = new BasePage(page);
  const sideNavigation = new SideNavigation(page);
  const browserWindows = new BrowserWindows(page);

  await basePage.open();
  await sideNavigation.openAlertsFramesAndWindows();
  await sideNavigation.openBrowserWindows();

  const newPage = await browserWindows.openNewTab();
  try {
    await browserWindows.verifyNewTabLabel(newPage);
  } finally {
    await newPage.close();
  }
});