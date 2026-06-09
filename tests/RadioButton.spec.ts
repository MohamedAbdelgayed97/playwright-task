import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/basePage';
import { SideNavigation } from '../pages/components/sideNavigation';
import { RadioButtonPage } from '../pages/elements/radioButtonPage';
import { Messages } from '../config/constants';

test.describe('Task 103 - Radio Button', () => {
  test('should select Impressive and show confirmation message', async ({ page }) => {
    // Arrange
    const basePage = new BasePage(page);
    const sideNav = new SideNavigation(page);
    const radioButtonPage = new RadioButtonPage(page);

    await basePage.open();
    await sideNav.openRadioButton();

    // Act
    await radioButtonPage.selectImpressive();

    // Assert
    await expect(radioButtonPage.resultMessage).toBeVisible();
    await expect(radioButtonPage.resultMessage).toHaveText(Messages.radioButton.impressiveChecked);
  });
});
