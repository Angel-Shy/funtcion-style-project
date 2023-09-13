export function GetViewportWidthAndHeight(){
    let [width,height] = [window.innerWidth, window.innerHeight];
    if (typeof width != "number"){
        if (document.compatMode == "CSS1Compat"){
            width = document.documentElement.clientWidth;
            height =document.documentElement.clientHeight;
        }else {
            //混杂模式下使用 body访问视口大小
            width = document.body.clientWidth;
            height =document.body.clientHeight;
        }
    }
    return [width, height];
}


export const Operations = {
    PREV: 'Prev',
    NEXT: 'NEXT',
    FIRST: 'FIRST_PAGE',
    LAST:'LAST_PAGE',
    JUMP:'JUMP'
};
