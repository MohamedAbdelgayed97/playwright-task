import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/basePage';
import { SideNavigation } from '../pages/components/sideNavigation';
import { LinksPage } from '../pages/elements/Links';
import { Messages } from '../config/constants';

test.describe('Task 106 - Links', () => {
  test('should click Not Found link and show not found message', async ({ page }) => {
    // Arrange
    const basePage = new BasePage(page);
    const sideNav = new SideNavigation(page);
    const linksPage = new LinksPage(page);

    await basePage.open();
    await sideNav.openLinks();

    // Act
    await linksPage.clickNotFoundLink();

    // Assert
    await expect(linksPage.notFoundLinkMessage).toBeVisible();
    await expect(linksPage.notFoundLinkMessage).toHaveText(Messages.links.notFoundLink);
  });
});
