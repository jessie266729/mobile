/**
 * 修改头像页
 */

import PasswordTpl from './edit-user-info-password.html';
import API from '../../api/Api.js';
import Util from '../../common-component/util/util.js';
import "./edit-user-info-password.scss";
export default function Live($el) {

    const handlers = {
        init: function() {

            const loginUserInfo = JSON.parse(localStorage.getItem('UserInfo'));
            if(!loginUserInfo) {
                Util.linkTo('/login');
                return;
            }
            $(".container").html( PasswordTpl( loginUserInfo ) );
            this.bindEvent();
            Util.setTitle("修改密码");

        },
        bindEvent: function() {
            let _this = this;
            //公共事件添加
            $(".edit-password").on("click", ".js-handle", function(e){
                let handle = $(this).data('handle');
                _this[handle] && _this[handle](e,$(this));
            });
        },
        submitEditPassword: function () {
            let oldPwd = $("#oldPwd").val();
            let newPwd = $("#newPwd").val();
            let confirmPwd = $("#confirmPwd").val();

            if(!oldPwd ){
                Util.alertMessage('请输入原密码！');
                $("#oldPwd").focus();
                return;
            }
            if(!newPwd ){
                Util.alertMessage('请输入新密码！');
                $("#newPwd").focus();
                return;
            }
            if(!confirmPwd ){
                Util.alertMessage('请确认新密码！');
                $("#confirmPwd").focus();
                return;
            }
            if(newPwd != confirmPwd){
                Util.alertMessage('两次输入的密码不一致！');
                $("#confirmPwd").focus();
                return;
            }

            if(oldPwd == newPwd){
                Util.alertMessage('新密码和原始密码不能相同！');
                $("#newPwd").focus();
                return;
            }

            $.ajax({
                url: API.changeUserPwd,
                data: {
                    AccessToken:Util.getCookie('AccessToken'),
                    Body:{
                        OldPwd:oldPwd,
                        NewPwd:newPwd,
                        AffirmNewPwd:confirmPwd
                    }
                },
                success: function(req){
                    if(!req.IsError){
                        Util.alertMessage('修改密码成功，请重新登陆！');
                        Util.logout();
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
