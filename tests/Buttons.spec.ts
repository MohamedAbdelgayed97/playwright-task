import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/basePage';
import { SideNavigation } from '../pages/components/sideNavigation';
import { ButtonsPage } from '../pages/elements/buttonsPage';
import { Messages } from '../config/constants';

test.describe('Task 105 - Buttons', () => {
  test('should click "Click Me" and show dynamic click message', async ({ page }) => {
    // Arrange
    const basePage = new BasePage(page);
    const sideNav = new SideNavigation(page);
    const buttonsPage = new ButtonsPage(page);

    await basePage.open();
    await sideNav.openButtons();

    // Act
    await buttonsPage.clickDynamicClickMe();

    // Assert
    await expect(buttonsPage.dynamicClickMessage).toBeVisible();
    await expect(buttonsPage.dynamicClickMessage).toHaveText(Messages.buttons.dynamicClickDone);
  });
});

