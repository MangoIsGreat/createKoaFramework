const { db } = require("../../core/db")
const { Sequelize, Model } = require("sequelize")

const classicFields = {
    image: Sequelize.STRING,
    content: Sequelize.STRING,
    pubdate: Sequelize.DATEONLY,
    fav_nums: Sequelize.INTEGER,
    title: Sequelize.STRING,
    type: Sequelize.TINYINT
}

class Movie extends Model {

}

Model.init(classicFields, {
    sequelize: db,
    tableName: 'movie'
})

class Sentence extends Model {

}

Sentence.init(classicFields, {
    sequelize: db,
    tableName: 'sentence'
})

class Music extends Model {

}

const musicFields = Object.assign({ url: Sequelize.STRING }, classicFields)
Music.init(musicFields, {
    sequelize: db,
    tableName: 'music'
})

module.exports = {
    Movie,
    Sentence,
    Music
}