export default {
    title: {
        text: '节约电荷/减少碳排',
    },
    color:['#17223b','#1372ab'],
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
        data: ['电荷量', '碳排放']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ['前6周', '前5周', '前4周', '前3周', '前2周', '前1周', '这周']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '碳排放',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: [0, 0, 0, 0, 0, 0, 0]
        },
        {
            name: '电荷量',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: [0, 0, 0, 0, 0, 0, 0]
        }
    ]
};

/*

option = {
  xAxis: {
    type: 'category',
    data: [0,1, 2, 3, 4,5,6,7,8,9,10,11,12,13]
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [2000,815, 210, 40, 5.02, 3.27, 1.037, 0.015,0005, 0.00009, 0.000001,0.0000001,0.0000001],
      type: 'line',
      smooth: true
    }
  ]
};

* */