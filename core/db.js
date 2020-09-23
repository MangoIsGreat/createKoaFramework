const Sequelize = require("sequelize")
const { dbName, host, port, username, password } = require("../config/config").database

const sequelize = new Sequelize(dbName, username, password, {
    dialect: 'mysql',
    host,
    port,
    logging: true,
    timezone: '+08:00',
    define: {

    }
})

module.exports = {
    sequelize
}