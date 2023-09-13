export default {
    title: {
        text: '合同(交易)类型图',
        left: 'left'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'horizontal',
        bottom: '5'
    },
    color:['RGB(0,115,169)','RGB(0,148,249)','RGB(77,113,195)'],
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
                { value: 0, name: '需求指令合同' },
                { value: 0, name: '积分交易合同' },
                { value: 0, name: '电力交易合同' },
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
}