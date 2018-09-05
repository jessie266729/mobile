/**
 *修改昵称页
 */

import NickNameTpl from './edit-user-info-nick-name.html';
import API from '../../api/Api.js';
import Util from '../../common-component/util/util.js';

export default function Videos($el) {

    const handlers = {
        init: function() {

            const loginUserInfo = JSON.parse(localStorage.getItem('UserInfo'));
            if(!loginUserInfo) {
                Util.linkTo('/login');
                return;
            }
            $(".container").html( NickNameTpl( loginUserInfo ) );
            this.bindEvent();
            Util.setTitle("修改昵称");
        },
        bindEvent: function() {
            let _this = this;
            //公共事件添加
            $(".edit-nick-name").on("click", ".js-handle", function(e){
                let handle = $(this).data('handle');
                _this[handle] && _this[handle](e,$(this));
            });
        },
        submitEditNickName: function () {
            let nickName = $('#nickName').val();
            if(!nickName ){
                Util.alertMessage('请输入正确的昵称！');
                return;
            }

            $.ajax({
                url: API.upUserInfo,
                data: {
                    AccessToken:Util.getCookie('AccessToken'),
                    Body:{
                        NickName:nickName
                    }
                },
                success: function(req){
                    if(!req.IsError){
                        const loginUserInfo = JSON.parse(localStorage.getItem('UserInfo'));
                        if(!loginUserInfo) {
                            Util.linkTo('../../login');
                            return;
                        }
                        loginUserInfo.NickName = nickName;
                        window.localStorage.setItem('UserInfo',JSON.stringify(loginUserInfo));
                        Util.alertMessage('修改成功！');
                    }
                },
                error: function(msg){
                    console.log(msg);
                }
            })
        }
    };

    handlers.init();
}
