

import EditUserInfoTpl from './edit-user-info.html';
import "./edit-user-info.scss";
import Util from '../../common-component/util/util.js';

export default function EditUserInfo() {
    const handlers = {
        init: function() {
            const loginUserInfo = JSON.parse(localStorage.getItem('UserInfo'));
            if(!loginUserInfo) {
                Util.linkTo('/login');
                return;
            }
            $(".container").html( EditUserInfoTpl( loginUserInfo ) );
            this.bindEvent();
            Util.setTitle("设置");
        },
        bindEvent: function() {
            let _this = this;
            //公共事件添加
            $(".user-info").on("click", ".js-handle", function(e){
                let handle = $(this).data('handle');
                _this[handle] && _this[handle](e,$(this));
            });
        },
        toEditMobilePhone: function (e,$this) {
            Util.linkTo('/edit-user-info-mobile-phone');
        },
        toEditUrl: function (e,$this) {
            Util.linkTo('/edit-user-info-head-image');
        },
        toEditNickName: function (e,$this) {
            Util.linkTo('/edit-user-info-nick-name');
        },
        toEditPassword: function (e,$this) {
            Util.linkTo('/edit-user-info-password');
        },
        logoutSystem: function() {
            Util.logout();
        }
    };

    handlers.init();
}
