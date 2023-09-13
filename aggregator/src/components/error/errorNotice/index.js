import React, {Component} from 'react';
import './index.scss';

class ErrorNotice extends Component {
    render() {
        return (
            <div>
                <div className='dialogBackground'></div>
                <div className={'errorNotice'} style={{width: 1000}} >
                    <div className='title'>
                        错误提示
                    </div>
                    <div className='content'>

                    </div>
                    <div className='footer'>

                    </div>
                </div>
            </div>
        );
    }
}

export default ErrorNotice;