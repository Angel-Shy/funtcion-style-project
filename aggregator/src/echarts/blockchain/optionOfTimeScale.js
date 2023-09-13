let base = +new Date(2021, 5, 3);
let oneDay = 24 * 3600 * 1000;
let data = [[base, 10]];
for (let i = 1; i < 100; i++) {
    let now = new Date((base += oneDay));
    data.push([+now, Math.floor(Math.random()*10)]);
}
export default  {
    title: {
        left: 'left',
        text: '区块生成监控图',
        subtext:'请勿频繁刷新'
    },
    color:['#263859'],
    xAxis: {
        type: 'time',
        boundaryGap: false
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
    },
    grid:{
        left:'35px',
        right:'20px'
    },
    dataZoom: [
        {
            type: 'inside',
            start: 70,
            end: 100
        },
        {
            start: 0,
            end: 100
        }
    ],
    series: [
        {
            name: 'Fake Data',
            type: 'line',
            smooth: false,
            symbol: 'none',
            areaStyle: {},
            data: data
        }
    ]
};