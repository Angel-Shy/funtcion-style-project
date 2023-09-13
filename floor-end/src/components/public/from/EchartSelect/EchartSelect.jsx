import React from 'react';
import stl from './EchartSelect.module.scss';

/*
props.options = [{value, name}]
sendData: func(value)
*/

function EchartSelect(props) {

    function change(e) {
        props.sendData(e.target.value);
    }

    return (
        <select  onChange={change}  className={stl.FUISelect} >
            {props.options.map((op,i)=> <option key={op.value} value={op.value} >{op.name}</option>)}
        </select>
    );
}

/*
用法：
<Select sendData={getState('directionType')} options={this.state.data.directionTypes}  />
* */

export default EchartSelect;
