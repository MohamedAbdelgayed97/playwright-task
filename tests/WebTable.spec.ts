import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/basePage';
import { SideNavigation } from '../pages/components/sideNavigation';
import { WebTablesPage } from '../pages/elements/webTablesPage';
import { WebTableData } from '../config/constants';

test.describe('Task 104 - Web Tables', () => {
  test.setTimeout(60_000);

  test('should add a record, capture screenshot, delete all rows, and leave an empty table', async ({
    page,
  }, testInfo) => {
    // Arrange
    const basePage = new BasePage(page);
    const sideNav = new SideNavigation(page);
    const webTablesPage = new WebTablesPage(page);

    await basePage.open();
    await sideNav.openWebTables();

    // Act — order matches the exercise sheet
    await webTablesPage.openAddRecordModal();
    await webTablesPage.fillRegistrationForm(WebTableData);

    const formScreenshot = await webTablesPage.screenshotRegistrationForm();
    await testInfo.attach('registration-form-filled', {
      body: formScreenshot,
      contentType: 'image/png',
    });

    await webTablesPage.submitRegistration();
    await expect(webTablesPage.registrationModal).toBeHidden();

    await webTablesPage.deleteAllRecords();

    // Assert
    await expect(webTablesPage.tableBodyRows).toHaveCount(0);
  });
});
