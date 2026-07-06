const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')

const reportsDir = path.join(process.cwd(), 'reports')
const logFile = path.join(reportsDir, 'last-run.log')

fs.mkdirSync(reportsDir, { recursive: true })

const logStream = fs.createWriteStream(logFile, { flags: 'w' })
const args = ['playwright', 'test', ...process.argv.slice(2)]
const child = spawn('npx', args, {
  shell: true,
  stdio: ['inherit', 'pipe', 'pipe'],
})

child.stdout.on('data', (chunk) => {
  process.stdout.write(chunk)
  logStream.write(chunk)
})

child.stderr.on('data', (chunk) => {
  process.stderr.write(chunk)
  logStream.write(chunk)
})

child.on('close', (code) => {
  logStream.end(() => {
    console.log(`\nRun log saved at: ${logFile}`)
    process.exit(code ?? 1)
  })
})
