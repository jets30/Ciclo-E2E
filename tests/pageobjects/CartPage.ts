import { Locator, Page, expect } from '@playwright/test'

export class CartPage {
  private readonly checkoutButton: Locator
  private readonly cartItem: Locator

  constructor(page: Page) {
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' })
    this.cartItem = page.locator('.cart_item')
  }

  async verifyCartItemVisible() {
    await expect(this.cartItem).toBeVisible()
  }

  async getCartItemDetails() {
    return {
      name: await this.cartItem.locator('.inventory_item_name').innerText(),
      description: await this.cartItem.locator('.inventory_item_desc').innerText(),
      price: await this.cartItem.locator('.inventory_item_price').innerText(),
    }
  }

  async checkout() {
    await expect(this.checkoutButton).toBeVisible()
    await this.checkoutButton.click()
  }
}
