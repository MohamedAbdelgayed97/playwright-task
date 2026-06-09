import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/basePage';
import { SideNavigation } from '../pages/components/sideNavigation';
import { UploadDownloadPage } from '../pages/elements/uploadDownloadPage';
import { TestFiles } from '../config/constants';

test.describe('Task 107 - Upload and Download', () => {
  test('should upload a file and capture screenshot', async ({ page }, testInfo) => {
    const basePage = new BasePage(page);
    const sideNav = new SideNavigation(page);
    const uploadPage = new UploadDownloadPage(page);

    await basePage.open();
    await sideNav.openUploadAndDownload();

    await uploadPage.uploadFile(TestFiles.sampleUpload);

    await expect(uploadPage.fileInput).toHaveValue(/sample-upload\.txt$/);

    const screenshot = await uploadPage.screenshotUploadSection();
    await testInfo.attach('upload-section', {
      body: screenshot,
      contentType: 'image/png',
    });
  });
});
