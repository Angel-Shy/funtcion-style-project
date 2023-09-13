export function saveToken(token){
    sessionStorage.setItem('token',token);
    window.location.hash = '';
    window.location.pathname = 'back.html';
}

export function loginOut(){
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

/*
React.useEffect(()=>{
    console.log('组件第一次挂载');
    return ()=>{
        console.log('组件消亡了')
    }
}, []);
* */