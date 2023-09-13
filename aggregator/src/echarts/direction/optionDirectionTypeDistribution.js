export default  {
    title: {
        text: '指令状态分布图',
        subtext: '',
        left: 'left'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'horizontal',
        bottom: '5'
    },
    color:['#005C97','#E0F4FF','#17223b','#C65B53','#4450C1','#348F9D','#339977'],
    series:[
        {
            name: '指令状态',
            type: 'pie',
            radius: '50%',
            data: [
                {name:"指令初始化",value:0},
                {name:"链上广播",value:0},
                {name:"下发合同",value:0},
                {name:"磋商阶段",value:0},
                {name:"下发计划",value:0},
                {name:"等待执行完成",value:0},
                {name:"指令完成",value:0}
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};