import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import buttonStyle from './FUIButtonPrimary.module.scss';
import loading from '../../../../static/icon/loading/rolling.svg'

const DEFAULT_WIDTH = -51292;

FuiButtonPrimary.propTypes = {
    width: PropTypes.number, //长度，如果没有给长度，就不设置长度
    isLoading: PropTypes.bool,//是否在加载，默认是否, 如果不在加载无法点击
    onClick: PropTypes.func //绑定点击事件
};

FuiButtonPrimary.defaultProps = {
    children: 'Primary Button',
    width: DEFAULT_WIDTH,
    isLoading: false
}

function FuiButtonPrimary(props) {

    /* 指定button的 style */
    const styleObject = ((props) => {
        let style = {};
        if (props.width !==  DEFAULT_WIDTH){
            style.width = props.width;
        }
        return style;
    })(props)


    return (
        <button
            onClick={props.onClick}
            className={`${buttonStyle.button} ${props.isLoading? buttonStyle.loading:"" }` }
            style={styleObject}
            disabled={props.isLoading} >
            {props.isLoading? <img className={buttonStyle.loadingImg} src={loading} /> :""}
            {props.children}
        </button>
    );
}

export default React.memo(FuiButtonPrimary);
