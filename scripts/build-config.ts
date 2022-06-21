const fs = require('fs')
require('dotenv').config();
const util = require('util')
const fetchApi = require('node-fetch')
const streamPipeline = util.promisify(require('stream').pipeline)
const CONFIG_DIR = "src/config"
const CONFIG_FILE = "config-overrides.json"

const buildConfig = () => {
  if (process.env.NODE_ENV === 'development') {
    fs.copyFile(CONFIG_DIR + '/config.json', CONFIG_DIR + '/' + CONFIG_FILE, (err) => {
      if (err) throw err
    })
  } else {
    downloadConfig()
  }
}
buildConfig()

async function downloadConfig() {
  const response = await fetchApi(process.env.CONFIG_URL)
  if (!response.ok) throw new Error(`unexpected response ${response.statusText}`)
  await streamPipeline(response.body, fs.createWriteStream(CONFIG_DIR + '/' + CONFIG_FILE))
}