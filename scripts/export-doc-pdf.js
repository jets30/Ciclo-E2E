const fs = require('fs')
const path = require('path')
const { chromium } = require('playwright')

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
}

function markdownToHtml(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n')
  const html = []
  let inCodeBlock = false
  let inList = false

  for (const rawLine of lines) {
    const line = rawLine

    if (line.trim().startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true
        if (inList) {
          html.push('</ul>')
          inList = false
        }
        html.push('<pre><code>')
      } else {
        inCodeBlock = false
        html.push('</code></pre>')
      }
      continue
    }

    if (inCodeBlock) {
      html.push(`${escapeHtml(line)}\n`)
      continue
    }

    if (line.startsWith('# ')) {
      if (inList) {
        html.push('</ul>')
        inList = false
      }
      html.push(`<h1>${escapeHtml(line.slice(2).trim())}</h1>`)
      continue
    }

    if (line.startsWith('## ')) {
      if (inList) {
        html.push('</ul>')
        inList = false
      }
      html.push(`<h2>${escapeHtml(line.slice(3).trim())}</h2>`)
      continue
    }

    if (line.startsWith('### ')) {
      if (inList) {
        html.push('</ul>')
        inList = false
      }
      html.push(`<h3>${escapeHtml(line.slice(4).trim())}</h3>`)
      continue
    }

    if (line.trim().startsWith('- ')) {
      if (!inList) {
        html.push('<ul>')
        inList = true
      }
      html.push(`<li>${escapeHtml(line.trim().slice(2).trim())}</li>`)
      continue
    }

    if (line.trim() === '') {
      if (inList) {
        html.push('</ul>')
        inList = false
      }
      html.push('<p></p>')
      continue
    }

    if (inList) {
      html.push('</ul>')
      inList = false
    }

    html.push(`<p>${escapeHtml(line)}</p>`)
  }

  if (inList) {
    html.push('</ul>')
  }

  return html.join('\n')
}

async function main() {
  const input = process.argv[2] || path.join('docs', 'documentacion-tecnica-completa.md')
  const output = process.argv[3] || path.join('docs', 'documentacion-tecnica-completa.pdf')

  const inputPath = path.resolve(process.cwd(), input)
  const outputPath = path.resolve(process.cwd(), output)

  if (!fs.existsSync(inputPath)) {
    console.error(`Input file not found: ${inputPath}`)
    process.exit(1)
  }

  const markdown = fs.readFileSync(inputPath, 'utf8')
  const contentHtml = markdownToHtml(markdown)

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Documentacion Tecnica Completa</title>
<style>
  @page { margin: 18mm 15mm; }
  body {
    font-family: "Segoe UI", Arial, sans-serif;
    color: #1f2937;
    font-size: 12px;
    line-height: 1.45;
  }
  h1, h2, h3 { color: #0f172a; margin-top: 18px; margin-bottom: 8px; }
  h1 { font-size: 22px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; }
  h2 { font-size: 17px; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; }
  h3 { font-size: 14px; }
  p { margin: 6px 0; }
  ul { margin: 6px 0 10px 18px; }
  li { margin: 4px 0; }
  code { background: #f1f5f9; padding: 1px 4px; border-radius: 4px; }
  pre { background: #0f172a; color: #e2e8f0; padding: 10px; border-radius: 8px; overflow-x: auto; }
</style>
</head>
<body>
${contentHtml}
</body>
</html>`

  const browser = await chromium.launch({ headless: true })
  try {
    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: 'networkidle' })
    fs.mkdirSync(path.dirname(outputPath), { recursive: true })
    await page.pdf({ path: outputPath, format: 'A4', printBackground: true })
    console.log(`PDF generated at: ${outputPath}`)
  } finally {
    await browser.close()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
