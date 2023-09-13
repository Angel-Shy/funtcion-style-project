export default class WindowUtils {
    static getViewport(){
        let [width,height] = [window.innerWidth, window.innerHeight];
        if (typeof width != "number"){
            if (document.compatMode == "CSS1Compat"){ /* 兼容模式 */
                width = document.documentElement.clientWidth;
                height =document.documentElement.clientHeight;
            }else {
                //混杂模式下使用 body访问视口大小
                width = document.body.clientWidth;
                height =document.body.clientHeight;
            }
        }
        return {width, height};
    }
}