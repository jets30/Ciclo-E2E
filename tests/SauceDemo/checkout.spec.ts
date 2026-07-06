import { expect, test, TestInfo } from '@playwright/test'
import { LoginPage } from '../pageobjects/LoginPage'
import { InventoryPage } from '../pageobjects/InventoryPage'
import { CartPage } from '../pageobjects/CartPage'
import { CheckoutPage } from '../pageobjects/CheckoutPage'
import { validUser, checkoutData, invalidCheckoutData } from '../util/testData'
import { captureScreen } from '../util/evidence'
import { logExecutionContext } from '../util/environmentLogger'

test.describe('SauceDemo Checkout', () => {
  test.beforeEach(async ({}, testInfo) => {
    logExecutionContext(testInfo)
  })

  test('flujo de compra E2E exitoso @smoke @regression', async ({ browser }, testInfo: TestInfo) => {
    const context = await browser.newContext()
    const page = await context.newPage()

    try {
      const login = new LoginPage(page)
      const inventory = new InventoryPage(page)
      const cart = new CartPage(page)
      const checkout = new CheckoutPage(page)

      await login.navigate()
      await captureScreen(page, testInfo, 'login_page')

      await login.loginWithCredentials(validUser.username, validUser.password)
      await captureScreen(page, testInfo, 'after_login')

      await expect(login.getCartIcon()).toBeVisible()

      await inventory.addFirstProductToCart()
      await captureScreen(page, testInfo, 'product_added_to_cart')

      await inventory.goToCart()
      await captureScreen(page, testInfo, 'cart_page')

      await expect(cart.getCartItem()).toBeVisible()
      await cart.checkout()
      await captureScreen(page, testInfo, 'checkout_step')

      await checkout.fillShippingInformation(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode)
      await captureScreen(page, testInfo, 'shipping_information_filled')

      await checkout.continue()
      await captureScreen(page, testInfo, 'checkout_overview')

      await checkout.finish()
      await captureScreen(page, testInfo, 'order_complete')

      await expect(checkout.getSuccessMessage()).toBeVisible()
    } finally {
      await context.close()
    }
  })

  test('error al continuar checkout con campo obligatorio vacío @regression', async ({ browser }, testInfo: TestInfo) => {
    const context = await browser.newContext()
    const page = await context.newPage()

    try {
      const login = new LoginPage(page)
      const inventory = new InventoryPage(page)
      const cart = new CartPage(page)
      const checkout = new CheckoutPage(page)

      await login.navigate()
      await captureScreen(page, testInfo, 'login_page_error_checkout')

      await login.loginWithCredentials(validUser.username, validUser.password)
      await expect(login.getCartIcon()).toBeVisible()
      await captureScreen(page, testInfo, 'after_login_error_checkout')

      await inventory.addFirstProductToCart()
      await inventory.goToCart()
      await expect(cart.getCartItem()).toBeVisible()
      await cart.checkout()
      await captureScreen(page, testInfo, 'checkout_step_error')

      await checkout.fillShippingInformation(invalidCheckoutData.firstName, invalidCheckoutData.lastName, invalidCheckoutData.postalCode)
      await captureScreen(page, testInfo, 'shipping_information_invalid')

      await checkout.continue()
      await captureScreen(page, testInfo, 'checkout_error_message')

      await expect(checkout.getErrorMessage()).toContainText('Error: First Name is required')
    } finally {
      await context.close()
    }
  })
})
