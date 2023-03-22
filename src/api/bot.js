import request from '@/utils/system/request'
// 获取数据api
export function getAllBot(params) {
    return request({
      url: '/springybot/getAllBot',
      method: 'post',
      params
    })
  }

// 新增bot
export function addBot(data) {
  return request({
    url: '/springybot/addBot',
    method: 'post',
    data,
  })
}
// 删除
export function deleteBot(data) {
    return request({
      url: '/springybot/deleteBot',
      method: 'post',
      data
    })
  }
  // 編輯
export function updateBot(data) {
    return request({
      url: '/springybot/updateBot',
      method: 'post',
      data,
    })
  }
// 啟動bot
export function start(data) {
  return request({
    url: '/springybot/start',
    method: 'post',
    data,
  })
}
// 停止bot
export function stop(data) {
  return request({
    url: '/springybot/stop',
    method: 'post',
    data,
  })
}