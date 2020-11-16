import Mock from 'mockjs'
import '@/mock/extend'

const user = Mock.mock({ //从mock/extend获取模拟数据
  name: '@ADMIN',
  avatar: '@AVATAR',
  address: '@CITY',
  position: '@POSITION'
})
Mock.mock(`${process.env.VUE_APP_API_BASE_URL}/login`, 'post', ({ body }) => { //mock响应登录
  let result = {} //1. 先清空结果
  const { name, password } = JSON.parse(body) //2. 把请求中的用户名密码解析出来

  if (name !== 'admin' || password !== '888888') { //3. 判断用户名密码
    result.code = -1        //4. 验证错误后的返回
    result.message = '账户名或密码错误（admin/888888）'
  } else {
    result.code = 0      //5. 验证正确后的返回
    result.message = Mock.mock('@TIMEFIX').CN + '，欢迎回来'
    result.data = {}
    result.data.user = user
    result.data.token = 'Authorization:' + Math.random()
    result.data.expireAt = new Date(new Date().getTime() + 30 * 60 * 1000)
    result.data.permissions = [{ id: 'queryForm', operation: ['add', 'edit'] }]
    result.data.roles = [{ id: 'admin', operation: ['add', 'edit', 'delete'] }]
  }
  return result //6. 返回结果
})
