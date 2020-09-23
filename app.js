const Koa = require('koa')
const Router = require("koa-router")
const book = require("./api/v1/book")
const classic = require("./api/v1/classic")
const requireDirectory = require("require-directory")

const app = new Koa()

requireDirectory(module, './api', {
    visit: whenLoadModule
})

function whenLoadModule(obj) {
    if (obj instanceof Router) {
        app.use(obj.routes())
    }
}

app.use(book.routes())
app.use(classic.routes())

app.listen(3000, () => {
    console.log("程序已运行在3000端口...")
})