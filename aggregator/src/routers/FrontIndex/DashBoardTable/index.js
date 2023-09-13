import React, {Component} from 'react';
import BlockTopTable from "./BlockTopTable";
import {Link} from "react-router-dom";

class DashBoardTable extends Component {

    state = {

    }


    render() {
        return (
            <div className='dashBoardTable'>
                <div className='flex-layout dashBoardTableHeader '>
                    <div className='flex-item-3'><span className={'font-blue'}>最近出块</span></div>
                    <div className='flex-item-3 text-align-right padding-right-10px '>
                        <Link to={'/search'} className='button-white'>区块链浏览 <span className='glyphicon glyphicon-forward'></span></Link>
                    </div>
                </div>
                <BlockTopTable/>
            </div>
        );
    }
}

export default DashBoardTable;