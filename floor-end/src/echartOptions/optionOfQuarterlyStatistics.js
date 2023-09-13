/* author 蒋星 季度统计 */
// 2022年8月2日14:24:30
let option = {
    backgroundColor:'transparent',
    title: {
        text: '季度合同执行统计',
        subtext:'2022',
        left: 'center',
        top: 20,
        textStyle: {
            color: 'white'
        },
        subtextStyle:{
            color:'white'
        }
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        top: 'bottom',
        textStyle:{
            color: 'white'
        }
    },
    color:['#005C97','#E0F4FF','#17223b','RGB(0, 146, 252)', '#ff6768'],
    toolbox: {
        show: true,
        feature: {
            mark: { show: true },
            saveAsImage: { show: true, backgroundColor: '#214968' }
        },
        iconStyle:{
            color: 'white'
        }
    },
    series: [
        {
            name: '合同数量',
            type: 'pie',
            radius: '50%',
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
                borderRadius: 8
            },
            data: [
                { value: 0, name: '第一季度' },
                { value: 0, name: '第二季度' },
                { value: 0, name: '第三季度' },
                { value: 0, name: '第四季度' }
            ]
        }
    ]
};

export default option;