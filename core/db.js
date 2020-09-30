const { Sequelize, Model } = require("sequelize")
const { clone, unset, isArray } = require('lodash')
const { dbName, host, port, username, password } = require("../config/config").database

const sequelize = new Sequelize(dbName, username, password, {
    dialect: 'mysql',
    host,
    port,
    logging: false,
    timezone: '+08:00',
    define: {
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true
    }
})

sequelize.sync({
    force: false
})

Model.prototype.toJSON = function() {
    let data = clone(this.dataValues)
    unset(data, 'updated_at')
    unset(data, 'created_at')
    unset(data, 'deleted_at')

    for (let key in data) {
        if (key === 'image') {
            if (!data[key].startsWith('http')) {
                data[key] = global.config.host + data[key]
            }
        }
    }

    if (isArray(this.exclude)) {
        this.exclude.forEach((value) => {
            unset(data, value)
        })
    }

    return data
}

module.exports = {
    db: sequelize
}