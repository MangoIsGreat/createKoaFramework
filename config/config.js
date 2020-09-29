module.exports = {
    environment: 'dev',
    database: {
        dbName: 'island',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '123456'
    },
    security: {
        sectetKey: 'abcdefg',
        // 过期时间：1个月
        expiresIn: 60 * 60 * 24 * 30
    },
    wx: {
        appId: 'wx859326cab90073dc',
        appSecret: '7a45f869434888417a4010161af42555',
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    },
    yushu: {
        detailUrl: 'http://t.yushu.im/v2/book/id/%s',
        keywordUrl: 'http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s'
    },
}