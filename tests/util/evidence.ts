import fs from 'fs'
import path from 'path'
import { Page, TestInfo } from '@playwright/test'

export async function captureScreen(page: Page, testInfo: TestInfo, step: string) {
  const testName = testInfo.title.replace(/[^a-zA-Z0-9-_]+/g, '_')
  const projectName = testInfo.project.name.replace(/[^a-zA-Z0-9-_]+/g, '_')
  const fileName = `${step.replace(/[^a-zA-Z0-9-_]+/g, '_')}.png`
  const outputDir = path.join(process.cwd(), 'test-results', 'ui', projectName, testName)

  fs.mkdirSync(outputDir, { recursive: true })

  const screenshotPath = path.join(outputDir, fileName)
  const screenshotBuffer = await page.screenshot({ fullPage: true })
  fs.writeFileSync(screenshotPath, screenshotBuffer)

  await testInfo.attach(step, {
    body: screenshotBuffer,
    contentType: 'image/png',
  })

  return screenshotPath
}
