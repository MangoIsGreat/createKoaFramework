const Router = require("koa-router")
const { User } = require("../../models/user")
const router = new Router({ prefix: "/v1/user" })
const { RegisterValidator } = require("../../validators/validator")
const { success } = require("../../lib/helper")

router.post("/register", async(ctx) => {
    const v = await new RegisterValidator().validate(ctx)
    const user = {
        nickname: v.get("body.nickname"),
        email: v.get("body.email"),
        password: v.get("body.password2")
    }
    const r = await User.create(user)
    success()
})

module.exports = router