import request from '@/utils/system/request'

export function addJobPosting(data) {
    return request({
      url: '/jobManagement/addJobPosting',
      method: 'post',
      data,
    })
  }
export function decryptedUbWithJobPosting(data) {
    return request({
      url: '/jobManagement/decryptedUbWithJobPosting',
      method: 'post',
      data,
    })
  }