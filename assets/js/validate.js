import { Toast } from 'mint-ui';
const telRegex = /^1\d{10}$/
const imgCodeReg = /^\d{4}$/
const smsCodeReg = /^\d{6}$/
const nameRegex = /[^a-zA-Z\u4e00-\u9fa5]/

// 验证是否填写手机号码以及它的格式
export function validateTel(userTel) {
    if (userTel) {
        if (!telRegex.test(userTel)) {
            Toast("请输入有效的手机号码")           
        } else {
            return true
        }
        // return false
    } else {
        Toast("请输入手机号码")
        return false
    }
}
// 验证是否填写图片验证码以及它的格式
export function validateImgCode(userImgCode) {
    if (userImgCode) {
        if (!imgCodeReg.test(userImgCode)) {
            Toast("请输入有效的图片验证码")
          
        } else {
            return true
        }
        // return false  
    } else {
        Toast("请输入图片验证码")
        return false
    }
}
// 验证是否填写短信验证码以及它的格式
export function validateSmsCode(userSmsCode) {
    if (userSmsCode) {
        if (!smsCodeReg.test(userSmsCode)) {
            Toast("请输入有效的短信验证码");
        } else {
            return true
        }
    } else {
        Toast("请输入短信验证码")
        return false
    }
}

// 验证是否填写用户名以及它的格式
export function validateUserName(userName) {
    if (userName) {
        if (nameRegex.test(userName)) {
            Toast("用户名只允许汉字和英文字母");
            return false
        } else {
            return true
        }
    } else {
        Toast("请输入您的姓名")
        return false
    }
}