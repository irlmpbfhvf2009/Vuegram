import request from '@/utils/system/request'


// 获取树组织数据
export function getGroupAndChannelTreeData(data) {
    return request({
      url: '/groupAndChannelManagement/v1/getGroupAndChannelTreeData',
      method: 'post',
      data
    })
  }