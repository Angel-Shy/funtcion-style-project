export default {
    title: {
        text: '节点合同数值表',
        textStyle:{
            color :'grey',
            fontStyle:'normal',
            fontWeight: 600,
            fontSize: 14,
            fontFamily:'宋体'
        },
        subtext: '刷新即更新'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['积分', '电荷量']
    },
    grid: {
        left:"5%",right:"7%",bottom: '20px'
    },
    color:['#4286f4','#005C97'],
    calculable: true,
    xAxis: [
        {
            type: 'category',
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
            name: '电荷量',
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