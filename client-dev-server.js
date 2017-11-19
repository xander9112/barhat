/* eslint-disable no-sync */
const app = require('express')()
const webpackConfig = require('./webpack.client.dev.js')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const path = require('path')
const compiler = webpack(webpackConfig)
const webpackDevMiddleware = webpackMiddleware(compiler, {
  noInfo: false,
  publicPath: '/',
  stats: { colors: true },
  headers: { 'Access-Control-Allow-Origin': '*' }
})
const mfs = webpackDevMiddleware.fileSystem
const fileRegExp = /[\w,\s-]+\.[A-Za-z0-9]+$/

app.use(webpackDevMiddleware)

app.use(hotMiddleware(compiler, { heartbeat: 500 }))

// My own server-static implementation for memory-fs
app.get(fileRegExp, (req, res) => {
  webpackDevMiddleware.waitUntilValid(() => {
    const filePath = path.resolve(__dirname, './dist', req.url.slice(1))
    let file = null
    
    res.type(path.parse(req.url).base)
    
    try {
      file = mfs.readFileSync(filePath)
    }
    catch (e) {
      return res.end()
    }
    
    res.end(file)
  })
})

//TODO: Сделать полноценный сервер

app.get('*', (req, res) => {
  webpackDevMiddleware.waitUntilValid(() => {
    const indexFile = mfs
      .readFileSync(path.resolve(__dirname, './dist/index.html'))
    
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Content-type', 'text/html')
    res.send(indexFile)
  })
})

app.listen(1488)
  .on('connection', sock => sock.setNoDelay(true))