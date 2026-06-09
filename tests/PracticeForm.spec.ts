import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/basePage';
import { SideNavigation } from '../pages/components/sideNavigation';
import { PracticeFormPage } from '../pages/forms/practiceFormPage';
import { PracticeFormData, TestFiles } from '../config/constants';

test.describe('Task 109 - Practice Form', () => {
  test('should fill the form, upload picture, and capture screenshot', async ({ page }, testInfo) => {
    const basePage = new BasePage(page);
    const sideNav = new SideNavigation(page);
    const practiceFormPage = new PracticeFormPage(page);

    await basePage.open();
    await sideNav.openPracticeForm();

    await practiceFormPage.fillForm(PracticeFormData);
    await practiceFormPage.uploadPicture(TestFiles.samplePicture);

    await expect(practiceFormPage.nameInput).toHaveValue(PracticeFormData.name);
    await expect(practiceFormPage.pictureInput).toHaveValue(/sample-upload\.txt$/);

    const screenshot = await practiceFormPage.screenshotForm();
    await testInfo.attach('practice-form-filled', {
      body: screenshot,
      contentType: 'image/png',
    });
  });
});
