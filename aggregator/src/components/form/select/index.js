import React from 'react';
import './index.scss';
/*
props.options = [{value, name}]
sendData: func(value)
*/

function Select(props) {

    function change(e) {
        props.sendData(e.target.value);
    }

    return (
        <select  onChange={change}  className={'FUISelect'} >
            {props.options.map((op,i)=> <option key={op.value} value={op.value} >{op.name}</option>)}
        </select>
    );
}

export default Select;