import React,{lazy,Suspense, Component} from 'react';
import TopBanner from "./topBanner";
import {Routes, Route, Navigate} from 'react-router-dom';
import LoadingPage from  '../../routers/loadingPage'
import store from "../../redux/store";


/* 路由组件懒加载 懒加载内部引用的组件会 无法引入样式 */
const FrontIndex = lazy(()=> import('../../routers/FrontIndex'));//组件内部样式丢失
const Direction = lazy(()=> import('../../routers/Direction'));
const Contract =  lazy(()=> import('../../routers/Contract'));
const BlockChain = lazy(()=> import('../../routers/BlockChain'));
const Working = lazy(()=> import('../../routers/Working'));
const Internet = lazy(()=> import('../../routers/Internet'));
const BlockSearch = lazy(()=> import('../../routers/BlockChainSearch'));
const Setting = lazy(()=> import('../../routers/Setting'));
const Progress = lazy(()=> import('../../routers/Progress'));
const History = lazy(()=> import('../../routers/History'));


class ContentRight extends Component {

    componentDidMount() {
        this.unsubscribe = store.subscribe(()=>{
            this.forceUpdate();
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <div className='content-right'>
                <TopBanner/>
                <div className={'content-page'}>
                    <div className={'home-page'}>
                        <Suspense fallback={<LoadingPage/>}>
                            <Routes>
                                <Route  path='/' element={<FrontIndex/>} ></Route>
                                <Route  path='/direction' element={<Direction/>} ></Route>
                                <Route  path='/contract' element={<Contract/>} ></Route>
                                <Route  path='/internet' element={<Internet/>} ></Route>
                                <Route  path='/blockchain' element={<BlockChain/>} ></Route>
                                <Route  path='/search' element={<BlockSearch/>} ></Route>
                                <Route  path='/setting' element={<Setting/>} ></Route>
                                <Route  path='/progress' element={<Progress/>} ></Route>
                                <Route  path='/history/:id' element={<History/>} ></Route>
                                <Route  path='/working' element={<Working/>} ></Route>
                                <Route  path='*' element={<Navigate to='/working'></Navigate>} ></Route>
                            </Routes>
                        </Suspense>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContentRight;