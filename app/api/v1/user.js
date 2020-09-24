const Router = require("koa-router")
const bcrypt = require("bcryptjs")
const { User } = require("../../models/user")
const router = new Router({ prefix: "/v1/user" })
const { RegisterValidator } = require("../../validators/validator")

router.post("/register", async(ctx) => {
    const v = await new RegisterValidator().validate(ctx)
    const salt = bcrypt.genSaltSync(10)
    const pwd = bcrypt.hashSync(v.get("body.password2", salt))
    const user = {
        nickname: v.get("body.nickname"),
        email: pwd,
        password: v.get("body.password2")
    }
    const r = await User.create(user)
})

module.exports = router