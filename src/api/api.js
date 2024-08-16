import request from '@/api/index'

// 获取agp数据
export function getReportData(data) {
    return request({
        url: '/report/data',
        method: 'POST',
        data: data
    })
}