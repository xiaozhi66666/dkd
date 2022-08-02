import request from '@/utils/request'

/**
 *获取用户基本信息
 * @param {String} id 用户id
 * @returns  Promise
 */
export const getUserInfoAPI = (id) =>
  request({
    url: `/user-service/user/${id}`
  })
