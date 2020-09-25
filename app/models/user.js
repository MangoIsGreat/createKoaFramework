const { db } = require("../../core/db")
const bcrypt = require("bcryptjs")
const { Sequelize, Model } = require("sequelize")

class User extends Model {
    static async verifyEmailPassword(email, plainPassword) {
        // 查询用户：
        const user = await User.findOne({
            where: {
                email
            }
        })

        if (!user) {
            throw new global.errs.AuthFailed("用户不存在")
        }

        // 验证密码：
        const correct = bcrypt.compareSync(plainPassword, user.password)

        if (!correct) {
            throw new global.errs.AuthFailed("密码不正确")
        }

        return user
    }

    static async getUserByOpenid(openid) {
        const user = await User.findOne({
            where: {
                openid
            }
        })

        return user
    }

    static async createUserByOpenid(openid) {
        const user = await User.create({
            openid
        })

        return user
    }
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