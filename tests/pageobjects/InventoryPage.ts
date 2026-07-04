import { Locator, Page, expect } from '@playwright/test'

export class InventoryPage {
  private readonly inventoryContainer: Locator
  private readonly shoppingCartLink: Locator

  constructor(page: Page) {
    this.inventoryContainer = page.locator('#inventory_container')
    this.shoppingCartLink = page.locator('a.shopping_cart_link')
  }

  async addFirstProductToCart() {
    const product = this.inventoryContainer.locator('.inventory_item').first()
    await expect(product).toBeVisible()
    await product.getByRole('button', { name: 'Add to cart' }).click()
  }

  async getFirstProductDetails() {
    const product = this.inventoryContainer.locator('.inventory_item').first()
    return {
      name: await product.locator('.inventory_item_name').innerText(),
      description: await product.locator('.inventory_item_desc').innerText(),
      price: await product.locator('.inventory_item_price').innerText(),
    }
  }

  async goToCart() {
    await this.shoppingCartLink.click()
  }
}
