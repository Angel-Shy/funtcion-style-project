export default {
    title: {
        text: '区块链节点在线监控',
        subtext: '10分钟侦测一次',
        left: 'left'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 'right'
    },
    color:['#263859', '#ff6768', 'black'],
    grid: {
        top: 0,
        left: 55,
        right: 45,
        bottom: 5,
        width:'auto',
        height:'auto'
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            emphasis: {
                label: {
                    show: true,
                    fontSize: '15',
                    fontWeight: 'bold'
                }
            },
            data: [
                { value: 0, name: '在线节点' },
                { value: 0, name: '离线节点' },
            ]
        }
    ]
};