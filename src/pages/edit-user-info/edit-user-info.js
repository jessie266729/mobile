

import EditUserInfoTpl from './edit-user-info.html';
import "./edit-user-info.scss";

import HeadImage from './components/headImage/headImage.js'
import MobilePhone from './components/mobilePhone/mobilePhone.js'
import NickName from './components/nickName/nickName'
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
            MobilePhone($(".edit-user-info-container"));
        },
        toEditUrl: function (e,$this) {
            HeadImage($(".edit-user-info-container"));
        },
        toEditNickName: function (e,$this) {
            NickName($(".edit-user-info-container"));
        },
        logoutSystem: function() {
            Util.logout();
        }
    };

    handlers.init();
}
