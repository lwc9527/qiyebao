import regExp from '@c/lib/util/regexp'

const valiPhoneOrEmail = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入邮箱或手机号码'))
  } else if (regExp.regPhone.test(value) || regExp.regEmail.test(value) || (regExp.regNumber.test(value) && value && value.length == 18)) {
    // 1. 手机号校验 2.邮箱校验 3.临时操作员校验
    callback()
  } else {
    callback(new Error('请输入正确的邮箱或手机号码'))
  }
}

const valiPassWord = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入长度为6位以上数字和字母密码'))
  } else if (regExp.regPassWord.test(value)) {
    callback()
  } else {
    callback(new Error('请输入长度为6位以上数字和字母密码'))
  }
}
const valiTelephone = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入手机号码'))
    } else if (regExp.regPhone.test(value) ) {
      callback()
    } else {
      callback(new Error('请输入正确的手机号码'))
    }
}
const valiEmail = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入邮箱号'))
    } else if (regExp.regEmail.test(value) ) {
      callback()
    } else {
      callback(new Error('请输入正确的邮箱'))
    }
}

export const rules = {
  username: [{
    validator: valiTelephone,
    trigger: 'blur'
  }],
  password: [{
    validator: valiPassWord,
    trigger: 'blur'
  }],
  nick: [{
    required: true,
    message: '请输入用户名称',
    trigger: 'blur'
  }],
  
  
  email: [{
    validator: valiEmail,
    trigger: 'blur'
  }],
  account: [{
    validator: valiPhoneOrEmail,
    trigger: 'blur'
  }],
  
}