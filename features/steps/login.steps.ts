import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from 'chai'

Given('I open the login page', async function () {
  await this.page.goto(process.env.URL ?? 'https://www.saucedemo.com/')
  await this.page.waitForLoadState('domcontentloaded')
})

When('I login with username {string} and password {string}', async function (username: string, password: string) {
  await this.page.fill('input#user-name', username)
  await this.page.fill('input#password', password)
  await this.page.click('input#login-button')
  // attach screenshot after submit
  const buf = await this.page.screenshot({ fullPage: true })
  await this.attach(buf, 'image/png')
})

Then('I should see the products page', async function () {
  const visible = await this.page.isVisible('#inventory_container')
  expect(visible).to.be.true
})

Then('I should see an error message containing {string}', async function (message: string) {
  const error = await this.page.locator('[data-test="error"]').innerText()
  expect(error).to.contain(message)
})
