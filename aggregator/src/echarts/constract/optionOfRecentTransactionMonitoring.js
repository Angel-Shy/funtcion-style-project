export default {
    title: {
        text: '七日内交易监控图'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    legend: {
        orient: 'horizontal',
        right: '0'
    },
    color:['#17223b','#005C97','RGB(77,113,195)'],
    grid:{
        left:'8%',
        right: '4%',
        bottom:"8%"
    },
    xAxis: {
        type: 'category',
        data: ['今天', '前一天', '前二天', '前三天', '前四天', '前五天', '前六天']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name:"需求指令合同",
            data: [0, 0, 0, 0, 0, 0, 0],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
            }
        },
        {
            name:"积分交易合同",
            data: [0, 0, 0, 0, 0, 0, 0],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
            }
        },
        {
            name:"电力交易合同",
            data: [0, 0, 0, 0, 0, 0, 0],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
            }
        },
    ]
}