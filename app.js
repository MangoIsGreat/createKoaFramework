const Koa = require('koa')
const InitManager = require("./core/init")
const catchError = require('./middlewares/exception')

const app = new Koa()

// 注册全局错误处理中间件（注意注册顺序，需在router之前注册）
app.use(catchError)

InitManager.initCore(app)


app.listen(3000, () => {
    console.log("程序已运行在3000端口...")
})