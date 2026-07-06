import { Locator, Page } from '@playwright/test'

export class CheckoutPage {
  private readonly firstNameInput: Locator
  private readonly lastNameInput: Locator
  private readonly postalCodeInput: Locator
  private readonly continueButton: Locator
  private readonly finishButton: Locator
  private readonly errorMessage: Locator
  private readonly successMessage: Locator

  constructor(page: Page) {
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' })
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' })
    this.postalCodeInput = page.getByRole('textbox', { name: 'Zip/Postal Code' })
    this.continueButton = page.getByRole('button', { name: 'Continue' })
    this.finishButton = page.getByRole('button', { name: 'Finish' })
    this.errorMessage = page.getByText('Error:')
    this.successMessage = page.getByRole('heading', { name: 'Thank you for your order!' })
  }

  async fillShippingInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName)
    await this.lastNameInput.fill(lastName)
    await this.postalCodeInput.fill(postalCode)
  }

  async continue() {
    await this.continueButton.click()
  }

  async finish() {
    await this.finishButton.click()
  }

  getSuccessMessage() {
    return this.successMessage
  }

  getErrorMessage() {
    return this.errorMessage
  }
}
