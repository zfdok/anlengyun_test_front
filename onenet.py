import base64
import hmac
import time
from urllib.parse import quote

def token(userId,access_key):

    version = '2020-05-29'

    res = 'userid/%s' % userId

    # 用户自定义token过期时间
    et = str(int(time.time()) + 3600)

    # 签名方法，支持md5、sha1、sha256
    method = 'sha1'

    # 对access_key进行decode
    key = base64.b64decode(access_key)

    # 计算sign
    org = et + '\n' + method + '\n' + res + '\n' + version
    sign_b = hmac.new(key=key, msg=org.encode(), digestmod=method)
    sign = base64.b64encode(sign_b.digest()).decode()

    # value 部分进行url编码，method/res/version值较为简单无需编码
    sign = quote(sign, safe='')
    res = quote(res, safe='')

    # token参数拼接
    token = 'version=%s&res=%s&et=%s&method=%s&sign=%s' % (version, res, et, method, sign)

    return token


if __name__ == '__main__':
    userId = '163120' #这里改成您自己的id
    access_key = '0sWvXoPixxdrSDcKDeEHbgvNGPRV5luHWx3HjA1no84ZAYyG9GvlWJmUMaLm5nlExdVZq3ANuII3GM04/PZxxQ=='
    #这里改成您自己的access key

    print(token(userId,access_key))
    while(1):
        pass