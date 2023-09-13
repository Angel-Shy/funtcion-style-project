import React from 'react';
import stl from './SortIcon.module.scss';
import down from '../../../../static/icon/alibaba/降序.png';
import up from '../../../../static/icon/alibaba/升序.png';

/*
* props
* getSort(v):func  降序 v:1 升序 v:0
* name: ['xx升序', 'xx降序']
* */

function SortIcon(props) {
    /* true 降序 false 升序 */
    const [sort, setSort] = React.useState(true);

    const changeState = e => {
        props.getSort(!sort?1 : 0);
        setSort(!sort);
    }

    return (
        <span className={stl.sort} onClick={changeState} >
            <img src={sort?down: up} />
            {sort? props.meaning[0] :props.meaning[1]}
        </span>
    );
}

export default SortIcon;
