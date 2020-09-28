const Router = require("koa-router")
const { Auth } = require("./../../../middlewares/auth")
const { Flow } = require("../../models/flow")
const { Art } = require("../../models/art")
const { Favor } = require("../../models/favor")
const { ClassicValidator } = require("../../validators/validator")
const router = new Router({ prefix: "/v1/classic" })

router.get("/latest", new Auth().m, async(ctx, next) => {
    const flow = await Flow.findOne({
        order: [
            ['index', 'DESC']
        ]
    })

    const art = await Art.getData(flow.art_id, flow.type);
    // art.dataValues.index = flow.index
    art.setDataValue('index', flow.index)

    ctx.body = art
})

router.get('/:type/:id/favor', new Auth().m, async(ctx) => {
    const v = await new ClassicValidator().validate(ctx)
    const id = v.get('path.id')
    const type = parseInt(v.get('path.type'))
    const art = await Art.getData(id, type)
    if (!art) {
        throw new global.errs.NotFound()
    }
    const like = await Favor.userLikeIt(id, type, ctx.auth.uid)
    ctx.body = {
        fav_nums: art.fav_nums,
        like_status: like
    }
})

router.get('/favor', new Auth().m, async(ctx) => {
    const uid = ctx.auth.uid
    ctx.body = await Favor.getMyClassicFavors(uid)
})

module.exports = router