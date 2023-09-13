export default {
    title: {
        text: '交易数量监督图'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    color:['#263859','#005C97'],
    legend: {},
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
    },
    yAxis: {
        type: 'category',
        data: ['需求指令合同', '积分交易合同', '电点交易合同', '总合同数量']
    },
    series: [
        {
            name: '总数量',
            type: 'bar',
            data: [0, 0, 0, 0]
        },
        {
            name: '本月数量',
            type: 'bar',
            data: [0, 0, 0, 0]
        }
    ]
}