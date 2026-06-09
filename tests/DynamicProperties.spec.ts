import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/basePage';
import { SideNavigation } from '../pages/components/sideNavigation';
import { DynamicPropertiesPage } from '../pages/elements/dynamicPropertiesPage';
import { Messages } from '../config/constants';

test.describe('Task 108 - Dynamic Properties', () => {
  test('should reveal button after clicking Color Change and waiting 5 seconds', async ({ page }) => {
    // Arrange
    const basePage = new BasePage(page);
    const sideNav = new SideNavigation(page);
    const dynamicPage = new DynamicPropertiesPage(page);
    // Act
    await basePage.open();
    await sideNav.openDynamicProperties();

    // Assert
    await expect(dynamicPage.visibleAfterButton).toBeHidden();
    await dynamicPage.clickColorChange();

    // Site uses jQuery .delay(5000).fadeIn() — allow extra time beyond 5 seconds.
    await expect(dynamicPage.visibleAfterButton).toBeVisible({ timeout: 12_000 });
    await expect(dynamicPage.visibleAfterButton).toHaveText(
      Messages.dynamicProperties.visibleAfterButton,
    );
  });
});
//EXPLAIN WHY USE TIMEOUT:12_000:
//The site uses jQuery .delay(5000).fadeIn() — allow extra time beyond 5 seconds.
//so we need to wait for 12 seconds to ensure the button is visible
//THERE IS ANOTHER WAY TO DO THIS BY USING THE WAIT FOR FUNCTION BUT IT IS NOT RELIABLE AND IT IS NOT A GOOD PRACTICE 
//BECAUSE IT WILL WAIT FOR THE BUTTON TO BE VISIBLE AND IT WILL NOT BE VISIBLE IF THE BUTTON IS NOT VISIBLE AFTER 5 SECONDS
//SO THE DIFFERENCE IS THAT THE TIMEOUT WILL WAIT FOR THE BUTTON TO BE VISIBLE AND IT WILL BE VISIBLE IF THE BUTTON IS VISIBLE AFTER 5 SECONDS