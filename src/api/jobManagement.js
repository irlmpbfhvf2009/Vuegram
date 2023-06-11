import request from '@/utils/system/request'

export function editAndPost_JobPosting(data) {
  return request({
    url: '/jobManagement/v1/editAndPost_JobPosting',
    method: 'post',
    data,
  })
}
export function decryptedUbWithJobPosting(data) {
  return request({
    url: '/jobManagement/v1/decryptedUbWithJobPosting',
    method: 'post',
    data,
  })
}

export function editAndPost_JobSeeker(data) {
  return request({
    url: '/jobManagement/v1/editAndPost_JobSeeker',
    method: 'post',
    data,
  })
}
export function decryptedUbWithJobSeeker(data) {
  return request({
    url: '/jobManagement/v1/decryptedUbWithJobSeeker',
    method: 'post',
    data,
  })
}
export function edit_JobPosting(data) {
  return request({
    url: '/jobManagement/v1/edit_JobPosting',
    method: 'post',
    data,
  })
}
export function edit_JobSeeker(data) {
  return request({
    url: '/jobManagement/v1/edit_JobSeeker',
    method: 'post',
    data,
  })
}

// 获取树组织数据
export function getJobTreeData(data) {
  return request({
    url: '/jobManagement/v1/getJobTreeData',
    method: 'post',
    data
  })
}