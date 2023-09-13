let option = {
    title: {
        textStyle: {
            fontWeight: 600,
            fontSize: '18',
            color: 'white',
            textAlign: 'center'
        },
        text: '近七月承担调控电量统计',
        subtext: '单位: kW',
        subtextStyle:{
            color: 'white'
        }
    },
    color:['#005C97'],
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        top: 'bottom',
        data: ['负荷量'],
        textStyle:{
            color: 'white'
        }
    },
    grid: {
        left:"70px",right:"55px",bottom: '50px'
    },
    toolbox: {
        show: true,
        feature: {
            magicType: { show: true, type: ['line', 'bar'] },
            saveAsImage: { show: true, backgroundColor: '#214968' }
        },
        iconStyle:{
            color: 'white'
        }
    },
    calculable: true,
    xAxis: {
        type: 'category',
        data: ['前六月', '前五月', '前四月', '前三月', '前二月', '前一月', '今月'],
        nameTextStyle:{
            color:'white'
        },
        axisLabel:{
            textStyle:{
                color:"white"
            }
        },
    },
    yAxis: {
        type: 'value',
        nameTextStyle:{
            color:'white'
        },
        axisLabel:{
            textStyle:{
                color:"white"
            }
        },
    },
    series: [
        {
            name: '负荷量',
            type: 'bar',
            data: [
                0, 0, 0, 0, 0, 0, 0
            ],
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

export default option;