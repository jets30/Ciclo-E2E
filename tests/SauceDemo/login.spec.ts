import { expect, test, TestInfo } from '@playwright/test'
import { LoginPage } from '../pageobjects/LoginPage'
import { validUser, lockedOutUser } from '../util/testData'
import { captureScreen } from '../util/evidence'
import { logExecutionContext } from '../util/environmentLogger'

test.describe('SauceDemo Login', () => {
  test.beforeEach(async ({}, testInfo) => {
    logExecutionContext(testInfo)
  })

  test('login exitoso con credenciales válidas @smoke @regression', async ({ browser }, testInfo: TestInfo) => {
    const context = await browser.newContext()
    const page = await context.newPage()

    try {
      const login = new LoginPage(page)
      await login.navigate()
      await captureScreen(page, testInfo, 'login_page')

      await login.loginWithCredentials(validUser.username, validUser.password)
      await captureScreen(page, testInfo, 'after_submit_credentials')

      await expect(login.getCartIcon()).toBeVisible()
      await captureScreen(page, testInfo, 'inventory_after_login')
    } finally {
      await context.close()
    }
  })

  test('muestra error para usuario bloqueado @regression', async ({ browser }, testInfo: TestInfo) => {
    const context = await browser.newContext()
    const page = await context.newPage()

    try {
      const login = new LoginPage(page)
      await login.navigate()
      await captureScreen(page, testInfo, 'login_page_blocked_user')

      await login.loginWithCredentials(lockedOutUser.username, lockedOutUser.password)
      await captureScreen(page, testInfo, 'login_error_displayed')

      await expect(login.getErrorMessage()).toBeVisible()
      await expect(login.getErrorMessage()).toContainText('Sorry, this user has been locked out.')
    } finally {
      await context.close()
    }
  })
})
