const { db } = require("../../core/db")
const bcrypt = require("bcryptjs")
const { Sequelize, Model } = require("sequelize")

class User extends Model {

}

User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nickname: Sequelize.STRING,
    password: {
        type: Sequelize.STRING,
        // 这里采用的是 观察者模式：
        set(val) {
            const salt = bcrypt.genSaltSync(10)
            const pwd = bcrypt.hashSync(val, salt)
            this.setDataValue("password", pwd)
        }
    },
    email: {
        type: Sequelize.STRING(128),
        unique: true
    },
    openId: {
        type: Sequelize.STRING(64),
        unique: true
    }
}, {
    sequelize: db,
    tableName: 'user'
})

module.exports = {
    User
}