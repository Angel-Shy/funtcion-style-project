export default {
    title: [
        {
            text: '各节点可调控电力资源表',
            subtext:'单位: kW [默认不接受则为0]'
        }
    ],
    tooltip: {

    },
    toolbox: {
        feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            saveAsImage: { show: true }
        },
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['可接受调控负荷']
    },
    color: [
        '#6b778d',
    ],
    xAxis: {
        type: 'category',
        data: ['0', '1', '2', '3', '4']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name:'可接受调控负荷',
            data: [0, 0, 0, 0, 0],
            type: 'line',
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
            }
        }
    ],
    grid: {
        left: '1%',
        right: '5px',
        bottom: '5px',
        containLabel: true
    }
}