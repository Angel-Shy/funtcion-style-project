import React from 'react';
import './App.scss';

function App(props) {
    return (
        <div className={'flex-layout container'}>
            <div className={'leftNavigator'}>

            </div>
            <div className={'rightContent'}>
                <div className={'contentHeader'}>

                </div>
                <div className={'content'}>
                    <iframe src='index.html' scrolling='auto'></iframe>
                </div>
            </div>
        </div>
    );
}

export default App;