const { LinValidator, Rule } = require("../../core/lin-validator-v2")
const { User } = require("../models/user")
const { LoginType, ArtType } = require("../lib/enum")

class PositiveIntegerValidator extends LinValidator {
    constructor() {
        super()
        this.id = [
            new Rule('isInt', '需要是正整数', { min: 1 })
        ]
    }
}

class RegisterValidator extends LinValidator {
    constructor() {
        super()
        this.email = [
            new Rule("isEmail", "电子邮箱不符合规范，请输入正确的邮箱")
        ]
        this.password1 = [
            new Rule("isLength", "密码最少6个字符，最多22个字符", {
                min: 6,
                max: 22
            }),
            new Rule("matches", "密码长度必须在6~22位之间，包含字符、数字或则 _ ", "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]")
        ]
        this.password2 = this.password1
        this.nickname = [
            new Rule("isLength", "昵称长度必须在4~32之间", {
                min: 4,
                max: 32
            })
        ]
    }

    validatePassword(vals) {
        const pwd1 = vals.body.password1
        const pwd2 = vals.body.password2
        if (pwd1 !== pwd2) {
            throw new Error("两次输入的密码不一致，请重新输入")
        }
    }

    async validateEmail(vals) {
        const email = vals.body.email
        const userEmail = await User.findOne({
            where: {
                email
            }
        })

        if (userEmail) {
            throw new Error("邮箱已被注册，请重新输入邮箱")
        }
    }
}

class TokenValidator extends LinValidator {
    constructor() {
        super()
        this.account = [
            new Rule('isLength', '不符合账号规则', {
                min: 4,
                max: 32
            })
        ]
        this.secret = [
            new Rule('isOptional'),
            new Rule('isLength', '至少6个字符', {
                min: 6,
                max: 128
            })
        ]
    }

    validateLoginType(vals) {
        if (!vals.body.type) {
            throw new Error("type是必须参数")
        }

        if (!LoginType.isThisType(vals.body.type)) {
            throw new Error("type参数不合法")
        }
    }
}

class NotEmptyValidator extends LinValidator {
    constructor() {
        super()
        this.token = [
            new Rule("isLength", "不允许为空", {
                min: 1
            })
        ]
    }
}

function checkType(vals) {
    let type = vals.body.type || vals.path.type
    if (!type) {
        throw new Error("type是必须参数")
    }

    type = parseInt(type)

    if (!LoginType.isThisType(type)) {
        throw new Error("type参数不合法")
    }
}

function checkArtType(vals) {
    let type = vals.body.type || vals.path.type
    if (!type) {
        throw new Error("type是必须参数")
    }

    type = parseInt(type)

    if (!ArtType.isThisType(type)) {
        throw new Error("type参数不合法")
    }
}

class Checker {
    constructor(type) {
        this.enumType = type
    }

    check(vals) {
        let type = vals.body.type || vals.path.type
        if (!type) {
            throw new Error("type是必须参数")
        }

        type = parseInt(type)

        if (!this.enumType.isThisType(type)) {
            throw new Error("type参数不合法")
        }
    }
}

class LikeValidator extends PositiveIntegerValidator {
    constructor() {
        super();
        // const checker = new Checker(ArtType)
        // this.validateType = checker.check.bind(checker)
        this.validateType = checkArtType
    }
}

class ClassicValidator extends PositiveIntegerValidator {
    constructor() {
        super()
    }
}

class SearchValidator extends LinValidator {
    constructor() {
        super()
        this.q = [
            new Rule('isLength', '搜索关键词不能为空', {
                min: 1,
                max: 16
            })
        ]

        this.start = [
            new Rule('isInt', '不符合规范', {
                min: 0,
                max: 60000
            })
        ]

        this.count = [
            new Rule('isInt', '不符合规范', {
                min: 1,
                max: 20
            }),
            new Rule('isOptional', '', 20)
        ]
    }
}

class AddShortCommentValidator extends PositiveIntegerValidator {
    constructor() {
        super()
        this.content = [
            new Rule('isLength', '必须在1到12个字符之间', {
                min: 1,
                max: 12
            })
        ]
    }
}

module.exports = {
    PositiveIntegerValidator,
    RegisterValidator,
    TokenValidator,
    NotEmptyValidator,
    LikeValidator,
    ClassicValidator,
    SearchValidator,
    AddShortCommentValidator
}