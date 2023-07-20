import request from '@/utils/system/request'

export function getAllInvitationBonusUser(params) {
    return request({
      url: '/invitationBonusUser/v1/getAllInvitationBonusUser',
      method: 'post',
      params
    })
  }

export function settlement(data) {
    return request({
      url: '/invitationBonusUser/v1/settlement',
      method: 'post',
      data
    })
  }