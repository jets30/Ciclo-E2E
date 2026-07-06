const fs = require('fs')
const path = require('path')

const sourceDir = path.join(process.cwd(), 'artifacts', 'playwright-report')
const targetDir = path.join(process.cwd(), 'evidencias', 'playwright-report')

if (!fs.existsSync(sourceDir)) {
  console.error('Playwright report not found:', sourceDir)
  process.exit(1)
}

fs.rmSync(targetDir, { recursive: true, force: true })
fs.mkdirSync(path.dirname(targetDir), { recursive: true })
fs.cpSync(sourceDir, targetDir, { recursive: true })

console.log('Playwright report copied to', targetDir)
