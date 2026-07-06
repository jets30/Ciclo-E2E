const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')

const testResultsDir = path.join(process.cwd(), 'artifacts', 'test-results')
const logFile = path.join(testResultsDir, 'last-run.log')

const logChunks = []
const args = ['playwright', 'test', ...process.argv.slice(2)]
const child = spawn('npx', args, {
  shell: true,
  stdio: ['inherit', 'pipe', 'pipe'],
})

child.stdout.on('data', (chunk) => {
  process.stdout.write(chunk)
  logChunks.push(chunk)
})

child.stderr.on('data', (chunk) => {
  process.stderr.write(chunk)
  logChunks.push(chunk)
})

child.on('close', (code) => {
  fs.mkdirSync(testResultsDir, { recursive: true })
  fs.writeFileSync(logFile, Buffer.concat(logChunks))
  console.log(`\nRun log saved at: ${logFile}`)
  process.exit(code ?? 1)
})
