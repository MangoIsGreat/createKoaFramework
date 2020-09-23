const Koa = require('koa')
const InitManager = require("./core/init")
const catchError = require("./middlewares/exception")

const app = new Koa()

InitManager.initCore(app)

// 注册错误处理中间件：
app.use(catchError)

app.listen(3000, () => {
    console.log("程序已运行在3000端口...")
})