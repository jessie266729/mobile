/**
 * 修改手机号页
 */

import MobilePhoneTpl from './edit-user-info-mobile-phone.html';
import API from '../../api/Api.js';
import Util from '../../common-component/util/util.js';
import "./edit-user-info-mobile-phone.scss";

export default function Interaction($el) {

    const handlers = {
        pageData:{
            codeSending:false
        },
        init: function() {
            const loginUserInfo = JSON.parse(localStorage.getItem('UserInfo'));
            if(!loginUserInfo) {
                Util.linkTo('/login');
                return;
            }
            $(".container").html( MobilePhoneTpl( loginUserInfo ) );
            this.bindEvent();
            Util.setTitle("修改绑定手机号");

        },
        bindEvent: function() {
            let _this = this;
            //公共事件添加
            $(".edit-mobile-phone").on("click", ".js-handle", function(e){
                let handle = $(this).data('handle');
                _this[handle] && _this[handle](e,$(this));
            });
        },
        sendSMS: function (e,$this) {
            let _this = this;
            if(this.pageData.codeSending){
                return false;
            }
            this.pageData.codeSending = true;
            let mobilePhone = $('#mobilePhone').val();
            if(!mobilePhone || !/^1[0-9]{10}$/.test(mobilePhone) ){
                Util.alertMessage('请输入正确格式的手机号！');
                _this.pageData.codeSending = false;
                return;
            }
            let count = 30;
            let timer = setInterval(function () {
                count --;
                $this.text(count);
                if(count<=0){
                    $this.text('获取验证码');
                    window.clearInterval(timer);
                    _this.pageData.codeSending = false;
                }
            },1000);
            $.ajax({
                url: API.sendBindMobilePhoneMsg,
                data: {
                    AccessToken:Util.getCookie('AccessToken'),
                    Body:mobilePhone
                },
                success: function(req){
                    if(!req.IsError){
                    }else {
                        $this.text('获取验证码');
                        window.clearInterval(timer);
                        _this.pageData.codeSending = false;
                    }

                },
                error: function(msg){
                    $this.text('获取验证码');
                    window.clearInterval(timer);
                    _this.pageData.codeSending = false;
                }
            })
        },
        submitEditMobilePhone: function () {
            let code = $('#code').val();
            if(!code ){
                Util.alertMessage('请输入正确格式的验证码！');
                return;
            }

            $.ajax({
                url: API.bindMobilePhone,
                data: {
                    AccessToken:Util.getCookie('AccessToken'),
                    Body:{
                        MobilePhone:$('#mobilePhone').val(),
                        AuthCode:code
                    }
                },
                success: function(req){
                    if(!req.IsError){
                        Util.alertMessage(req.Message);
                        Util.logout();
                    }
                },
                error: function(msg){
                    console.log(msg);
                }
            })
        }
    } ;

    handlers.init();
}
