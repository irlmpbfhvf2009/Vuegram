import request from '@/utils/system/request'

export function editAndPost_JobPosting(data) {
  return request({
    url: '/jobManagement/editAndPost_JobPosting',
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

export function editAndPost_JobSeeker(data) {
  return request({
    url: '/jobManagement/editAndPost_JobSeeker',
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