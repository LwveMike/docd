import puppeteer from 'puppeteer-core'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFile } from "node:fs/promises"
import type { Page } from "puppeteer-core"
import { JS_SCRIPT_NAME } from '../constants'

async function loadIndex () {
  const BUILD_RELATIVE_TEMPLATES_PATH = '../../../src/templates'
  const indexPath = resolve(fileURLToPath(import.meta.url), `${BUILD_RELATIVE_TEMPLATES_PATH}/index.html`)
  
  return readFile(indexPath, { encoding: 'utf-8'})
}

async function injectScript (page: Page) {
  const BUILD_RELATIVE_SCRIPT_PATH = '../../../dist'
  const path = resolve(fileURLToPath(import.meta.url), `${BUILD_RELATIVE_SCRIPT_PATH}/${JS_SCRIPT_NAME}.umd.js`)

  page.addScriptTag({ path, type: 'module' })
}

(async () => {
  const browser = await puppeteer.launch({ executablePath: '/private/tmp/chrome/mac-119.0.6045.105/chrome-mac-x64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing', headless: true })
  const page = await browser.newPage()

  const indexPage = await loadIndex()

  await page.setContent(indexPage, { waitUntil: 'domcontentloaded' })

  await injectScript(page)

  await page.setViewport({ width: 1920, height: 1080 })

  await page.emulateMediaType('screen')

  setTimeout(async () => {
  await page.pdf({
    path: 'result.pdf',
    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
    printBackground: true,
    format: 'A4',
  })

  await page.close()
  await browser.close()
  }, 2000)
})()
