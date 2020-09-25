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
        // 过期时间：1小时
        expiresIn: 60 * 60
    }
}