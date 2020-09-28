const { Movie, Sentence, Music } = require("../models/classic")
const { Op } = require("sequelize")
const { flatten } = require('lodash')

class Art {
    static async getList(artInfoList) {
        const artInfoObj = {
            100: [],
            200: [],
            300: []
        }

        for (let artInfo of artInfoList) {
            artInfoObj[artInfo.type].push(artInfo.art_id)
        }

        const arts = []
        for (let key in artInfoObj) {
            const ids = artInfoObj[key]
            if (ids.length === 0) {
                continue
            }
            key = parseInt(key)
            arts.push(await Art._getListByType(ids, key))
        }
        return flatten(arts)
    }

    static async _getListByType(ids, type) {
        let arts = []
        const finder = {
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        };

        switch (type) {
            case 100:
                arts = await Movie.findOne(finder);
                break;
            case 200:
                arts = await Music.findOne(finder);
                break;
            case 300:
                arts = await Sentence.findOne(finder);
                break;
            case 400:
                break;
            default:
                break;

        }

        return arts;
    }

    static async getData(artId, type) {
        let art = null
        const finder = {
            where: {
                id: artId
            }
        }

        switch (type) {
            case 100:
                art = await Movie.findOne(finder)
                break
            case 200:
                art = await Music.findOne(finder)
                break
            case 300:
                art = await Sentence.findOne(finder)
                break
            case 400:
                break
            default:
                break
        }

        return art
    }
}

module.exports = {
    Art
}