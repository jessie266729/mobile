/**
 * 修改手机号页
 */

import MobilePhoneTpl from './mobilePhone.html';
import API from '../../../../api/Api.js';
import Util from '../../../../common-component/util/util.js';

export default function Interaction($el) {

    const handlers = {

        init: function() {
            $el.html( MobilePhoneTpl() );
            this.bindEvent();
        },
        bindEvent: function() {
            let _this = this;
            //公共事件添加
            $(".edit-mobile-phone").on("click", ".js-handle", function(e){
                let handle = $(this).data('handle');
                _this[handle] && _this[handle](e,$(this));
            });
        },
        sendSMS: function () {
            let mobilePhone = $('#mobilePhone').val();
            if(!mobilePhone ){
                Util.alertMessage('请输入正确格式的手机号！');
                return;
            }

            $.ajax({
                url: API.sendBindMobilePhoneMsg,
                data: {
                    AccessToken:Util.getCookie('AccessToken'),
                    Body:mobilePhone
                },
                success: function(req){
                    if(!req.IsError){
                    }

                },
                error: function(msg){
                    console.log(msg);
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
                        $.ajax({
                            url: API.userLogout,
                            data: {
                                AccessToken:Util.getCookie('AccessToken'),
                            },
                            success: function(req){
                                if(!req.IsError){
                                }
                            },
                            error: function(msg){
                                console.log(msg);
                            }
                        })
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
