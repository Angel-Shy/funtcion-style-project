/* 1. post 用户登陆路由 */
export const POST_USER_LOGIN = "/subscriber/login";
/* 2. post 修改用户密码 */
export const POST_ALTER_USER_PASSWORD = '/subscriber/alter';
/* 3. post 注销用户 */
export const POST_USER_LOGOUT = '/subscriber/logout';
/* 4. get 从服务器或许当前用户资产信息 */
export const GET_USER_INFORMATION = '/subscriber/assets';
/* 5. get 获得当前用户未查看的通知信息 */
export const GET_USER_WITHOUT_CHECK_NOTIFICATION = 'notice/waiting';
/* 6. get 从服务器获取当前待执行的指令 */
export const GET_DIRECTION_WAITING = '/direction/waiting';
/* 7. post 发布电力交易需求 */
export const POST_TRADE_ELECTRIC_TRANSACTION = '/trade/electric';
/* 8. post 发布积分交易需求*/
export const POST_TRADE_CREDIT_TRANSACTION = '/trade/credit';
/* 9. post 获取交易市场*/
export const POST_TRADE_MARKET = '/trade/market';
/* 10. post 获得需求历史信息 */
export const POST_REQUIREMENT_REQUIREMENTS = '/requirement/requirements';
/* 11. post 获取交易历史信息 */
export const POST_TRANSACTION_TRANSACTIONS = '/transaction/transactions';
/* 12. post 获取通知历史信息 */
export const POST_NOTICE_NOTIFICATION = '/notice/notifications';
/* 13. delete 删除一个历史消息 */
export const DELETE_NOTICE_DELETE = '/notice/delete';
/* 14. delete 撤销一个需求信息 */
export const DELETE_REQUIREMENT_REVOKE = '/requirement/revoke';
/* 15. post 对一个需求进行出价 */
export const POST_TRADE_PURCHASE = '/trade/purchase';
/* 16 get 获取自己发布的有效需求 */
export const GET_REQUIREMENT_YOURS = '/requirement/yours';
/* 17. post 检索等待自己确认的电力热交易*/
export const POST_TRADE_E_REQUEST = '/transaction/erequest';
/* 18. post 拒绝一笔交易并且给出理由 */
export const POST_TRANSACTION_E_REFUSE = '/transaction/refuse';
/* 19. post 签署一笔交易*/
export const POST_TRANSACTION_E_AGREE = '/transaction/agree';
/* 20. post 撤销/取消一笔交易*/
export const POST_TRANSACTION_E_CANCEL = '/transaction/cancel';
/* 21. get 获取并非自己发布的有效需求*/
export const GET_REQUIREMENT_OTHERS = '/requirement/others'
/* 22. post 获取交易信息，自己发出的等待甲方确认的交易 */
export const POST_TRANSACTION_E_PUBLISH = '/transaction/epublish';
/* 23. post 获取自己是甲方的积分交易信息 */
export const POST_TRANSACTION_C_REQUEST = '/transaction/crequest';
/* 24. post 获取积分交易信息 自己发出的等待甲方确认的交易*/
export const POST_TRANSACTION_C_PUBLISH = '/transaction/cpublish';
