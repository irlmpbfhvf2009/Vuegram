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

export function addJobSeeker(data) {
  return request({
    url: '/jobManagement/addJobSeeker',
    method: 'post',
    data,
  })
}
export function decryptedUbWithJobSeeker(data) {
  return request({
    url: '/jobManagement/decryptedUbWithJobSeeker',
    method: 'post',
    data,
  })
}


// 获取树组织数据
export function getJobTreeData(data) {
  return request({
    url: '/jobManagement/getJobTreeData',
    method: 'post',
    data
  })
}