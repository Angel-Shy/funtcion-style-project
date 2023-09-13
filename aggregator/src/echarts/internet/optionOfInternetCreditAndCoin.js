export default {
    title: {
        text: '节点积分状态图',
        subtext: '每小时更新一次统计'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['积分', '信誉分']
    },
    grid: {
        left:"5%",right:"5%",bottom: '20px'
    },
    color:['#263859', '#1372ab'],
    calculable: true,
    xAxis: [
        {
            type: 'category',
            // prettier-ignore
            data: []
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '积分',
            type: 'bar',
            data: [],
            markPoint: {
                data: [
                    { type: 'max', name: 'Max' },
                    { type: 'min', name: 'Min' }
                ]
            },
            markLine: {
                data: [{ type: 'average', name: 'Avg' }]
            }
        },
        {
            name: '信誉分',
            type: 'bar',
            data: [],
            markPoint: {
                data: [
                    { type: 'max', name: 'Max' },
                    { type: 'min', name: 'Min' }
                ]
            },
            markLine: {
                data: [{ type: 'average', name: 'Avg' }]
            }
        }
    ]
};