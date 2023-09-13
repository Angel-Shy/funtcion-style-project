export default  {
    backgroundColor: '#fff',
    title: {
        text: '指令执行进度',
        left: '50%',
        top: '60%',
        textAlign: 'center',
        textStyle: {
            fontWeight: 600,
            fontSize: '15',
            color: '#17223b',
            textAlign: 'center'
        }
    },
    series: {
        name: '合同进度',
        type: 'pie',
        clockWise: false,
        radius: [70, 95],
        itemStyle: {
            normal: {
                color: '#263859',
                shadowColor: '#389af4',
                shadowBlur: 0,
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            }
        },
        hoverAnimation: false,
        center: ['50%', '50%'],
        data: [
            {
                value: 0,
                label: {
                    normal: {
                        formatter: function(params) {
                            return params.value + '%';
                        },
                        position: 'center',
                        show: true,
                        textStyle: {
                            fontSize: '20',
                            fontWeight: 'bold',
                            color: '#389af4'
                        }
                    }
                }
            },
            {
                value: 100,
                name: 'invisible',
                itemStyle: {
                    normal: {
                        color: '#dfeaff'
                    },
                    emphasis: {
                        color: '#ff6768'
                    }
                }
            }
        ]
    }
}