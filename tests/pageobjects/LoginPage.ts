import { Locator, Page } from "@playwright/test"

export class LoginPage {

    private readonly page: Page
    private readonly usernameTextbox: Locator
    private readonly passwordTextbox: Locator
    private readonly loginButton: Locator
    private readonly shoppingCartIcon: Locator
    private readonly errorMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.usernameTextbox = page.getByRole('textbox', { name: 'Username' })
        this.passwordTextbox = page.getByRole('textbox', { name: 'Password' })
        this.loginButton = page.getByRole('button', { name: 'Login' })
        this.shoppingCartIcon = page.locator('a.shopping_cart_link')
        this.errorMessage = page.locator('[data-test="error"]')
    }

    async fillUsername(username: string) {
        await this.usernameTextbox.fill(username)
    }

    async fillPassword(password: string) {
        await this.passwordTextbox.fill(password)
    }

    async clickOnLogin() {
        await this.loginButton.click()
    }

    async navigate() {
        await this.page.goto('/')
    }

    async loginWithCredentials(username: string, password: string) {
        await this.fillUsername(username)
        await this.fillPassword(password)
        await this.clickOnLogin()
    }

    getCartIcon() {
        return this.shoppingCartIcon
    }

    getErrorMessage() {
        return this.errorMessage
    }
}