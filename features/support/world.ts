import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber'
import { chromium, Browser, Page } from 'playwright'
import fs from 'fs'
import path from 'path'

class CustomWorld extends World {
  browser: Browser | null = null
  page: Page | null = null

  constructor(options: IWorldOptions) {
    super(options)
  }

  async init() {
    this.browser = await chromium.launch({ headless: true })
    const context = await this.browser.newContext()
    this.page = await context.newPage()
  }

  async attachScreenshot(stepName: string) {
    if (!this.page) return
    const buffer = await this.page.screenshot({ fullPage: true })
    await this.attach(buffer, 'image/png')
    const testName = `scenario_${Date.now()}`
    const outputDir = path.join(process.cwd(), 'evidencias', 'bdd', testName)
    fs.mkdirSync(outputDir, { recursive: true })
    fs.writeFileSync(path.join(outputDir, `${stepName.replace(/[^a-zA-Z0-9-_]+/g, '_')}.png`), buffer)
  }
}

setWorldConstructor(CustomWorld)
