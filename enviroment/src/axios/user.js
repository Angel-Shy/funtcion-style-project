import {userLogoutRequest} from './userRequests';


export function saveToken(token){
    sessionStorage.setItem('token',token);
    window.location.pathname = 'trade.html';
    window.location.hash = '';
}

export function logout(){
    let token = sessionStorage.getItem('token');
    if (!token){
        userLogoutRequest({token: token});
    }
    sessionStorage.clear();
    window.location.hash = '';
    window.location.pathname = 'index.html';
}

/* 没登陆就退出 */
export function isLogin(){
    if (sessionStorage.getItem('token') == null){
        return false;
    }else{
        return true;
    }
}


