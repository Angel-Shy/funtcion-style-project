export default {
    title: {
        text: '积分/信誉分变化',
        subtext: '追溯最近18次合同执行',
        textStyle: {
            fontWeight: 600,
            fontSize: '17',
            color: 'white',
            textAlign: 'center'
        },
        subtextStyle:{
            color:'white'
        }
    },
    color:['#2ec7c9','#1372ab'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['积分', '信誉分'],
        textStyle:{
            color: 'white'
        }
    },
    grid: {
        left: '3%',
        right: '10px',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            name: '指令编号',
            nameTextStyle: {
                color: 'white'
            },
            nameLocation:'start',
            nameRotate:0,
            nameGap: 25,
            type: 'category',
            boundaryGap: false,
            axisLabel:{
                textStyle:{
                    color:"white"
                }
            },
            axisLine:{
                lineStyle:{
                    color: 'white'
                }
            },
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10','11', '12','13','14','15','16','17','18']
        }
    ],
    yAxis: [
        {
            name: '数值',
            nameLocation: 'middle',
            nameGap: 30,
            nameTextStyle: {
                color: 'white'
            },
            type: 'value',
            axisLabel:{
                textStyle:{
                    color:"white"
                }
            },
            axisLine:{
                show: true,
                lineStyle:{
                    color: 'white'
                }
            },
        }
    ],
    toolbox: {
        feature: {
            magicType: { show: true, type: ['line', 'bar', 'stack'] },
            saveAsImage: { show: true, backgroundColor: '#214968' }
        },
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        },
        iconStyle:{
            color: 'white'
        }
    },
    series: [
        {
            name: '积分',
            type: 'line',

            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: [0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0,0,0, 0, 0, 0, 0]
        },
        {
            name: '信誉分',
            type: 'line',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: [0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0,0,0, 0, 0, 0, 0]
        }
    ]
};