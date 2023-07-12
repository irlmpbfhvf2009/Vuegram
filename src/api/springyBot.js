import request from '@/utils/system/request'
// 获取数据api
export function getAllBot(params) {
  return request({
    url: '/springybot/v1/getAllBot',
    method: 'post',
    params
  })
}

// 新增bot
export function addBot(data) {
  return request({
    url: '/springybot/v1/addBot',
    method: 'post',
    data,
  })
}
// 删除
export function deleteBot(data) {
  return request({
    url: '/springybot/v1/deleteBot',
    method: 'post',
    data
  })
}
// 編輯
export function updateBot(data) {
  return request({
    url: '/springybot/v1/updateBot',
    method: 'post',
    data,
  })
}
// 參數編輯
export function updateConfig(data) {
  return request({
    url: '/springybot/v1/updateConfig',
    method: 'post',
    data,
  })
}
// 查詢機器人管理的頻道
export function fetchManagedChat(data) {
  return request({
    url: '/springybot/v1/fetchManagedChat',
    method: 'post',
    data,
  })
}
// 啟動bot
export function start(data) {
  return request({
    url: '/springybot/v2/start',
    method: 'post',
    data,
  })
}
// 停止bot
export function stop(data) {
  return request({
    url: '/springybot/v1/stop',
    method: 'post',
    data,
  })
}