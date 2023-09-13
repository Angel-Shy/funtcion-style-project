import React, {Component} from 'react';
import deal from '../../../static/imgs/old/deal.png';
import setting from '../../../static/imgs/old/setting.png';
import log from '../../../static/imgs/old/log.png';
import NarBarItem from "./narBarItem";
import drc from '../../../static/imgs/narbar/direction2.png';
import internet from '../../../static/imgs/narbar/internet.png';
import look from '../../../static/imgs/narbar/look.png';
import {nanoid} from "nanoid";

class NarBar extends Component {

    state = {
        routers:[
            {
                itemName:'指令响应',
                image:drc,
                subNavs:[
                    {link:'/direction', name:'指令管理'},
                    {link:'/contract', name:'合同管理'},
                ]
            },
            {
                itemName:'网络管理',
                image:internet,
                subNavs:[
                    {link:'/internet', name:'区块链节点'},
                ]
            },
            {
                itemName:'区块浏览',
                image:look,
                subNavs:[
                    {link:'/blockchain', name:'区块浏览器'},
                    {link:'/search', name:'区块检索'},
                ]
            },
            // {
            //     itemName:'交易市场',
            //     image:deal,
            //     subNavs:[
            //         {link:'/monitor', name:'交易监控'},
            //         {link:'/transaction', name:'交易管理'},
            //     ]
            // },
            // {
            //     itemName:'系统配置',
            //     image:setting,
            //     subNavs:[
            //         {link:'/setting', name:'系统运行配置'},
            //         {link:'/security', name:'安全配置'},
            //     ]
            // },
            // {
            //     itemName:'系统日志',
            //     image:log,
            //     subNavs:[
            //         {link:'/buildings', name:'楼宇操作历史'},
            //         {link:'/operation', name:'本地操作历史'},
            //     ]
            // }
        ]
    }
    render() {
        return (
            <div>
                <ul>
                    {this.state.routers.map((router, idx)=> {
                        return <NarBarItem key={nanoid()} {...router} />
                    })}
                </ul>
            </div>
        );
    }
}

export default NarBar;