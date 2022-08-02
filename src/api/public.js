import request from '@/utils/request'

/**
 *获取token
 * @param {*}
 * @returns
 */
export const getNum = () => {
  var chars = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
  ]
  var nums = ''
  for (var i = 0; i < 32; i++) {
    var id = parseInt(Math.random() * 61)
    nums += chars[id]
  }
  return nums
}

/**
 *
 * @param {Number} randomNum 请求随机数
 * @returns Promise
 */
export const getCodeImgAPI = (randomNum) =>
  request({
    url: `/user-service/user/imageCode/${randomNum}`,
    responseType: 'blob'
  })

/**
 *用户登录接口
 * @param {Object} data  code:图验证码片  loginName:'admin' pas:'admin' loginType:0 clientToken:'生成的随机数'
 * @returns Promise
 */

export const getLoginTokenAPI = (data) =>
  request({
    url: '/user-service/user/login',
    method: 'post',
    data
  })
