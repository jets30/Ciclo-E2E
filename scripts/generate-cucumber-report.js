const reporter = require('cucumber-html-reporter')
const fs = require('fs')

const jsonReport = 'reports/cucumber.json'
const outHtml = 'evidencias/bdd-report.html'

if (!fs.existsSync(jsonReport)) {
  console.error('cucumber json not found:', jsonReport)
  process.exit(1)
}

const options = {
  theme: 'bootstrap',
  jsonFile: jsonReport,
  output: outHtml,
  reportSuiteAsScenarios: true,
  launchReport: false,
  metadata: {
    'App Version': '1.0.0',
    'Test Environment': process.env.URL || 'https://www.saucedemo.com/',
    'Browser': 'chromium'
  }
}

reporter.generate(options)
console.log('BDD report generated at', outHtml)
