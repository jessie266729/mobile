/**
 * 修改头像页
 */

import HeadImageTpl from './headImage.html';
import API from '../../../../api/Api.js';
import Util from '../../../../common-component/util/util.js';

export default function Live($el) {

	const handlers = {
		init: function() {
            const loginUserInfo = JSON.parse(localStorage.getItem('UserInfo'));
            if(!loginUserInfo) {
                Util.linkTo('../../../login');
                return;
            }
            $el.html( HeadImageTpl(loginUserInfo) );
			this.bindEvent();
            Util.setTitle("修改头像");
		},
		bindEvent: function() {
            let _this = this;
            //公共事件添加
            $(".edit-head-image").on("click", ".js-handle", function(e){
                let handle = $(this).data('handle');
                _this[handle] && _this[handle](e,$(this));
            });
		},
        submitEditHeadImage :function () {
			var headImageUrl = $("#headImageUrl").val();
            $.ajax({
                url: API.upUserInfo,
                data: {
                    AccessToken:Util.getCookie('AccessToken'),
                    Body:{
                        HeadImageUrl:headImageUrl
                    }
                },
                success: function(req){
                    if(!req.IsError){
                        const loginUserInfo = JSON.parse(localStorage.getItem('UserInfo'));
                        if(!loginUserInfo) {
                            Util.linkTo('../../login');
                            return;
                        }
                        loginUserInfo.Url = headImageUrl;
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
