const Router = require("koa-router")
const { Auth } = require("./../../../middlewares/auth")
const { Flow } = require("../../models/flow")
const router = new Router({ prefix: "/v1/classic" })

router.get("/latest", new Auth().m, async(ctx, next) => {
    const flow = await Flow.findOne({
        order: [
            ['index', 'DESC']
        ]
    })

    ctx.body = flow
})

module.exports = router