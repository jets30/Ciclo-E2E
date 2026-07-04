import { When, Then } from '@cucumber/cucumber'
import { expect } from 'chai'

When('I add the first product to the cart', async function () {
  await this.page.waitForSelector('#inventory_container')
  await this.page.click('.inventory_item .btn_inventory')
  const buf = await this.page.screenshot({ fullPage: true })
  await this.attach(buf, 'image/png')
})

When('I proceed to checkout with {string} {string} {string}', async function (firstName: string, lastName: string, postalCode: string) {
  await this.page.click('a.shopping_cart_link')
  await this.page.click('text=Checkout')
  await this.page.fill('#first-name', firstName)
  await this.page.fill('#last-name', lastName)
  await this.page.fill('#postal-code', postalCode)
  const buf = await this.page.screenshot({ fullPage: true })
  await this.attach(buf, 'image/png')
  await this.page.click('#continue')
  // wait briefly for either error or next page
  await this.page.waitForTimeout(500)
  if (firstName && firstName.length > 0) {
    await this.page.click('#finish')
    const buf2 = await this.page.screenshot({ fullPage: true })
    await this.attach(buf2, 'image/png')
  } else {
    // attach screenshot showing validation error
    const bufErr = await this.page.screenshot({ fullPage: true })
    await this.attach(bufErr, 'image/png')
  }
})

Then('I should see the order complete message', async function () {
  const visible = await this.page.isVisible('text=Thank you for your order!')
  expect(visible).to.be.true
})

Then('I should see an error containing {string}', async function (message: string) {
  const text = await this.page.locator('body').innerText()
  expect(text).to.contain(message)
})
