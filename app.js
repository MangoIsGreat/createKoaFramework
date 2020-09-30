const Koa = require('koa')
const parser = require("koa-bodyparser")
const path = require('path')
const InitManager = require("./core/init")
const catchError = require('./middlewares/exception')
const static = require('koa-static')

const app = new Koa()

require("./app/models/user")

// 注册全局错误处理中间件（注意注册顺序，需在router之前注册）
app.use(catchError)
app.use(parser())
app.use(static(path.join(__dirname, '/static')))
InitManager.initCore(app)

app.listen(3000, () => {
    console.log("程序已运行在3000端口...")
})