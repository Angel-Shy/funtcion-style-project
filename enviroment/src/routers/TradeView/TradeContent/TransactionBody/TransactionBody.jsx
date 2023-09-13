import React, {useCallback, useState} from 'react';
import stl from './TransactionBody.module.scss';
import moneyRed from '../../../../static/icon/iconfonts/redMoney.svg';
import electric from '../../../../static/icon/iconfonts/blueElectric.svg';
import time from '../../../../static/icon/alibaba/time.svg';
import credit from '../../../../static/icon/iconfonts/jife.svg';
import arrow from '../../../../static/imgs/jiantouceshi_ok.png';
import lightning from '../../../../static/icon/iconfonts/lightning3.svg';
import DialogContainer,{getDialogDefaultSetting} from "../../../../components/public/dialog/DialogContainer/DialogContainer";
import AuctionTradeDetail from "./AuctionTradeDetail/AuctionTradeDetail";
import {NotifyCloseLoading, NotifyImplementMessage, NotifyMessage, NotifyOpenLoading} from "../../../../pubsub";
import {deleteRequirementRequest} from "../../../../axios/requirementRequests";
import select from "../../../../components/public/from/Select/Select";

const auctionDialogSetting = getDialogDefaultSetting();
auctionDialogSetting.isNeedFooter = false;
auctionDialogSetting.width = 1100;
auctionDialogSetting.height = 480;
auctionDialogSetting.title = "出价对话框";
auctionDialogSetting.isLoading = false;

function TransactionBody(props) {

    let [isShowAuction, setShowAuction] = useState(false);
    let [Negotiability, setNegotiability] = useState({
        isCanConsult: false,
        requirementId: -1,
        requirement: null
    });
    let showAuction = (requirementType,requirementId,requirement) => {
        return e => {
            let isCanConsult = false;
            if (requirementType == 1) isCanConsult = true;
            setNegotiability({
                isCanConsult,
                requirementId,
                requirement
            });
            setShowAuction(true);
        }
    }


    let cancelRequirementEvent = React.useCallback( (id) => {
        return e => {
            NotifyImplementMessage('确定要撤销你发布的需求吗？ [删除条件: 当前需求没有产生具体交易]', () => {
                NotifyOpenLoading('正在等待服务器处理中...');
                deleteRequirementRequest({
                    requirementId: id
                }, (data) =>{
                    //刷新
                    props.update();
                    setTimeout(() => {
                        NotifyCloseLoading();
                        NotifyMessage('成功！你的需求已经撤销了。');
                    }, 1200);
                },() => {
                    NotifyCloseLoading();
                });
            });
        }
    }, []);


    let clickCopyContent = useCallback(  content => {
        return e =>{
            //copyToClipboard(content);
        }
    })

    return (
        <div className={stl.bodyContent}>
            {
                isShowAuction?
                    <DialogContainer
                        close={() => { setShowAuction(false)} }
                        render={<AuctionTradeDetail negotiability={Negotiability.isCanConsult} requirement={Negotiability.requirement} close={() => {setShowAuction(false)}}  />}
                        {...auctionDialogSetting}
                    />:''
            }

            <div className={stl.container}>
                {
                    props.requirements.map( (element ,idx) => {
                      return (<div className={stl.itemContainer} key={element.requirementId} >
                          <div className={`${stl.line} float-layout`}>
                        <span className={stl.type}>
                            <img src={element.transactionType == 3?electric:moneyRed} alt=""/>
                        </span>
                            <span className={`${stl.transactionId} btn`} title={'点击复制交易编号'} data-clipboard-text={element.codeId} > 交易需求编号：
                                <span>{element.codeId}6AS7DASD1AS32D4F56G4</span>
                            </span>
                            <span className={stl.direction}>
                                <span className={stl.tType}>{element.requirementType == 1?'可协商交易':'不可协商交易'}</span>
                            </span>
                            <span className={stl.description}>
                                {element.transactionType == 3?'交易类型：电力交易 (发起方给与积分，接收方承担负荷)':'交易类型：积分交易 (发起方承担负荷，接收方给与积分)'}
                            </span>
                              <span className={stl.direction}>
                            所属指令编号： <span className={stl.ID}> {element.cmdId} </span>
                        </span>
                              <span className={stl.direction}>
                            交易截止之间： <span className={stl.endTime}> {element.endDateTime} </span>
                        </span>
                              <span className={`${stl.time} float-right`}>
                            <img src={time} alt=""/>发起时间:
                            <span>
                                {element.publishDateTime}
                            </span>
                        </span>
                          </div>
                          <div className={`${stl.contract}`}>
                              <div className={stl.give}>
                                  <span>发起方[甲方]:</span>
                              </div>
                              <div className={stl.condition}>
                                  <div>
                                      <img src={element.transactionType ==3?credit:lightning} alt="..."/>
                                  </div>
                                  <div>
                                      <span className={stl.value}>
                                          {element.transactionType ==3?element.point:element.leftElectricValue}
                                      </span><span className={stl.unit}>[{element.transactionType ==2? element.electricUnit :'积分'}]</span>
                                  </div>
                              </div>
                              <div>
                                  <img src={arrow} alt=""/>
                              </div>
                              <div className={stl.give}>
                                  <span>接受方[乙方]:</span>
                              </div>
                              <div className={stl.condition}>
                                  <div>
                                      <img src={element.transactionType ==3?lightning:credit} alt="..."/>
                                  </div>
                                  <div>
                                      <span className={stl.value}>{element.transactionType ==3?element.leftElectricValue:element.leftPoint}</span>
                                      <span className={stl.unit}>[{element.transactionType ==3? element.electricUnit :'积分'}]</span>
                                  </div>
                              </div>
                              <div className={stl.operation}>
                                  <div className={stl.blackContent}></div>
                                  <div className={stl.buttonContainer}>
                                      {
                                          props.userId != element.partyA?
                                          <button className={'FUIButton FUI-btnWhite'} onClick={showAuction(element.requirementType, element.requirementId, element)} >
                                              <span className="glyphicon glyphicon-ok-circle"></span>
                                              出价购买
                                          </button>:
                                          <button className={'FUIButton FUI-btnBlue'} onClick={cancelRequirementEvent(element.requirementId)} >
                                              <span className="glyphicon glyphicon-remove"></span>
                                              撤销需求
                                          </button>
                                      }
                                  </div>
                              </div>
                          </div>
                      </div>)
                    })
                }
            </div>
        </div>
    );
}

export default TransactionBody;
