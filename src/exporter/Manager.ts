import { Browser, Page, PuppeteerNode } from 'puppeteer-core'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFile } from 'node:fs/promises'
import { JS_SCRIPT_NAME } from '../constants';

const generateId = (() => {
  let id = 0

  return () => {
    id += 1

    return id
  }
})();

type PageWithId = Page & { _noc_id: number }

export class ManagerImpl {
  private readonly _rootPath = resolve(fileURLToPath(import.meta.url), '../../../')
  private readonly _chromiumPath = '/private/tmp/chrome/mac-119.0.6045.105/chrome-mac-x64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing' as const
  private _puppeteer: PuppeteerNode
  private _browser: Browser
  private _pages: PageWithId[] = []

  constructor (puppeteer: PuppeteerNode) {
    this._puppeteer = puppeteer
  }

  public async createBrowser () {
    this._browser = await this._puppeteer.launch({ executablePath: this._chromiumPath, headless: false })
  }

  private async _createPage () {
    // @ts-ignore
    const page: PageWithId = await this._browser.newPage()

    page._noc_id = generateId()

    this._pages.push(page)

    return page
  }

  private async _setHTML(page: PageWithId) {
    const indexHTMLPath = resolve(this._rootPath, `./src/templates/index.html`)
    
    const html = await readFile(indexHTMLPath, { encoding: 'utf-8'})

    page.setContent(html, { waitUntil: 'domcontentloaded' })
  }

  private async _setScript(page: Page) {
    const path = resolve(this._rootPath, `./dist/${JS_SCRIPT_NAME}.umd.js`)

    await page.addScriptTag({ path })

    page.waitForResponse(path)
  }

  public async loadPage () {
    const page = await this._createPage()
    await this._exposeFunctions(page)

    await page.setViewport({ width: 1920, height: 1080 })
    await page.emulateMediaType('screen')

    await this._setHTML(page)
    await this._setScript(page)
  }

  private async _exposeFunctions (page: PageWithId) {
    page.exposeFunction('downloadPDF', async () => {
      await page.pdf({
        path: 'result.pdf',
        margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
        printBackground: true,
        format: 'A4',
      })
    })
  }
}
