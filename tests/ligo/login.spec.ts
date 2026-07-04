import { test, TestInfo } from '@playwright/test'
import { LoginPage } from '../pageobjects/LoginPage'
import { validUser, lockedOutUser } from '../util/testData'
import { captureScreen } from '../util/evidence'

test.describe('SauceDemo Login', () => {
  test('login exitoso con credenciales válidas', async ({ page }, testInfo: TestInfo) => {
    const login = new LoginPage(page)
    await login.navigate()
    await captureScreen(page, testInfo, 'login_page')

    await login.loginWithCredentials(validUser.username, validUser.password)
    await captureScreen(page, testInfo, 'after_submit_credentials')

    await login.checkSuccessfulLogin()
    await captureScreen(page, testInfo, 'inventory_after_login')
  })

  test('muestra error para usuario bloqueado', async ({ page }, testInfo: TestInfo) => {
    const login = new LoginPage(page)
    await login.navigate()
    await captureScreen(page, testInfo, 'login_page_blocked_user')

    await login.loginWithCredentials(lockedOutUser.username, lockedOutUser.password)
    await captureScreen(page, testInfo, 'login_error_displayed')

    await login.expectLoginError('Sorry, this user has been locked out.')
  })
})
