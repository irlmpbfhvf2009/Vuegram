import request from '@/utils/system/request'

export function addJobPosting(data) {
    return request({
      url: '/jobManagement/addJobPosting',
      method: 'post',
      data,
    })
  }