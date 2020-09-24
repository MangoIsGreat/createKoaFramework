const { LinValidator, Rule } = require("../../core/lin-validator")

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
}

module.exports = {
    PositiveIntegerValidator,
    RegisterValidator
}