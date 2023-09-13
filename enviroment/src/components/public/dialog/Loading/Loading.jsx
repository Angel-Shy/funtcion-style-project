import React, {Fragment} from 'react';
import style from './Loading.module.scss';
import loadingGif from '../../../../static/imgs/loadingdialog.gif'
import PropTypes from "prop-types";


/*
* message:
* */


Loading.propTypes = {
    message: PropTypes.string,
};

Loading.defaultProps = {
    message: '正在拼命加载中...'
};

function Loading(props) {
    return (
        <Fragment>
            <div className={style.dialogBackground}></div>
            <div className={style.dialogLoading} style={{width:250, height:60}} >
                <div className="loading">
                    <img src={loadingGif} width="60" alt=""/>
                    <span className={style.loadingMessage}>{props.message}</span>
                </div>
            </div>
        </Fragment>
    );
}



export default Loading;
