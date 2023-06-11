import request from '@/utils/system/request'


// 登入api
export function loginApi(params) {
  return request({
    url: '/admins/v1/login',
    method: 'post',
    params,
  })
}
// 退出登入Api
export function loginOutApi(params) {
  return request({
    url: '/admins/v1/loginOut',
    method: 'post',
    params,
  })
}
// 獲取用户信息Api
export function getInfoApi(params) {
  return request({
    url: '/admins/v1/info',
    method: 'post',
    params
  })
}
// 新增
export function addAdmin(data) {
  return request({
    url: '/admins/v1/addAdmin',
    method: 'post',
    data,
  })
}
// 查詢
export function getAllAdmins(params) {
  return request({
    url: '/admins/v1/getAllAdmins',
    method: 'post',
    params,
  })
}
// 編輯
export function updateAdmin(data) {
  return request({
    url: '/admins/v1/updateAdmin',
    method: 'post',
    data,
  })
}

// 删除
export function delAdmin(data) {
  return request({
    url: '/admins/v1/deleteAdmins',
    method: 'post',
    data
  })
}
// 改密碼
export function passwordChange(data) {
  return request({
    url: '/admins/v1/passwordChange',
    method: 'post',
    data
  })
}