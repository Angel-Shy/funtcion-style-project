import React from 'react';
import stl from './AlterUserPassword.module.scss';
import {publishTradeElectricRequest} from "../../../../axios/tradeRequests";
import {userAlterPasswordRequest} from "../../../../axios/userRequests";

function AlterUserPassword(props) {

    let oldPassword = React.useRef();
    let newPassword_One = React.useRef();
    let newPassword_Two = React.useRef();

    const [myError, setError] = React.useState({
        isShow: false,
        ErrorMessage:'错误信息！'
    });

    const changeType = (InputElement) =>{
        return e => {
            e.target.classList.toggle('glyphicon-eye-close');
            e.target.classList.toggle('glyphicon-eye-open');
            let type = InputElement.current.type;
            if (type == 'text') InputElement.current.type = 'password';
            else InputElement.current.type = 'text';
        }
    }

    const focusContent = (e) => {
        let tagName = e.target.tagName.toLowerCase();
        if ( tagName == 'input' || tagName == 'textarea' ){
            e.target.classList.remove(stl.errorInput);
        }
    }

    function checkElements(elements){
        let errorCount = 0;
        elements.forEach(element=>{
            if (element.current.value ===  ''){
                element.current.classList.add(stl.errorInput);
                errorCount++;
            }
        });
        return errorCount;
    }

    const removeErrorMessage = () => {
        setError({
            isShow: false,
            ErrorMessage:'错误信息！'
        });
    }

    /* 提交表单 */
    const onSubmit = React.useCallback(()=> {
        if(checkElements([oldPassword, newPassword_One,newPassword_Two]) == 0){
            let oldPwd = oldPassword.current.value;
            let onePwd = newPassword_One.current.value;
            let twoPwd = newPassword_Two.current.value;
            if (onePwd != twoPwd){
                setError({
                    isShow: true,
                    ErrorMessage:'新密码不一致，两次输入密码不一样！'
                });
                return;
            }
            if (oldPwd === onePwd){
                setError({
                    isShow: true,
                    ErrorMessage:'输入的新密码和旧密码一样！'
                });
                return;
            }
            /* 提交给服务器 */
            userAlterPasswordRequest({ oldPassword: oldPwd, newPassword: onePwd });
        };

    }, []);

    return (
        <div className={stl.passwordContainer} onFocus={focusContent}>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>请输入旧密码:</span>
                <span className={stl.myStateAnswer}>
                  <input
                      ref={oldPassword}
                      className={`${stl.myinput} ${stl.myinputLong}`}
                      min={0}
                      type="password"/><span className={'glyphicon glyphicon-eye-close padding-left-15px'} onClick={changeType(oldPassword)}></span>
               </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>新密码:</span>
                <span className={stl.myStateAnswer}>
                  <input
                      ref={newPassword_One}
                      className={`${stl.myinput} ${stl.myinputLong}`}
                      min={0}
                      type="password"/><span className={'glyphicon glyphicon-eye-close padding-left-15px'} onClick={changeType(newPassword_One)}></span>
               </span>
            </div>
            <div className={stl.myStateLine}>
                <span className={stl.myState}>再次输入新密码:</span>
                <span className={stl.myStateAnswer}>
                  <input
                      ref={newPassword_Two}
                      className={`${stl.myinput} ${stl.myinputLong}`}
                      min={0}
                      type="password"/><span className={'glyphicon glyphicon-eye-close padding-left-15px'} onClick={changeType(newPassword_Two)}></span>
               </span>
            </div>
            <div className="flex-layout margin-top-25px ">
                <div className='flex-item-5 padding-left-15px'>
                    {myError.isShow?<span className={stl.errorMessageFromServer}>{myError.ErrorMessage}</span>: ''}
                    {myError.isShow?<span onClick={removeErrorMessage} className={`glyphicon glyphicon-remove ${stl.pointer}`}></span>:''}
                </div>
                <div className='flex-item-5 text-align-right '>
                    <button onClick={props.close}  className="FUIButton  FUI-btnWhite ">
                        <span className='glyphicon glyphicon-remove'></span>
                        操作取消
                    </button>
                    <button onClick={onSubmit}  className="FUIButton FUI-btnBlack margin-left-15px ">
                        <span className='glyphicon glyphicon-ok'></span>
                        立即执行
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AlterUserPassword;
