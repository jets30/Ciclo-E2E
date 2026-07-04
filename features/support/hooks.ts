import { Before, After, setDefaultTimeout } from '@cucumber/cucumber'

setDefaultTimeout(30 * 1000)

Before(async function () {
  if ((this as any).init) await (this as any).init()
})

After(async function () {
  if ((this as any).page) await (this as any).page.close()
  if ((this as any).browser) await (this as any).browser.close()
})
