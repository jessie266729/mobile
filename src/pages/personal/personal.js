/**
 * 我的页面
 */

import _ from 'underscore';
import Util from '../../common-component/util/util.js';
import API from '../../api/Api.js';
import PersonalTpl from './personal.html';
import Activity from './components/activity/activity';
import Classes from './components/classes/classes';

import "./personal.scss";

export default function Personal() {

	const handlers = {
		init: function() {
            let _this = this;
			const loginUserInfo = JSON.parse(localStorage.getItem('UserInfo'));

			if(!loginUserInfo){
				Util.linkTo('/login');
				return;
			}

			this.getUserInfo(loginUserInfo.Id,function(userInfo){
                $(".container").html( PersonalTpl({userInfo}) );
                Activity($('.personal-page-container'),{});
                _this.bindEvent();
			})			
		},
		bindEvent: function() {
			let _this = this;
            //公共事件添加
            $(".personal-page").on("click", ".js-handle", function(e){
                let handle = $(this).data('handle');
                _this[handle] && _this[handle](e,$(this));
			});
			this.handleChangeTab();
		},
		getUserInfo: function(userId,callback){
            $.ajax({
                url: API.getUserInfo,
                data: {
                    Body: userId
                },
                success: function(req) {
                    if(!req.IsError){
                        callback && callback(req.Data);
                    }
                }
            })
		},
		handleChangeTab: function() {
			$(".personal-page .personal-page-tabBar").on("click", ">div", function(e){
                let $this = $(this);
				if($this.hasClass('active')){
					return;
				}else{
					$this.addClass('active').siblings().removeClass('active');

					let index = $this.index();
					let $container = $(".personal-page-container");
					switch (index){
						case 0 : Activity($container,{}); break;
						case 1 : Classes($container,{}); break;
						case 2 : Util.linkTo('/training-record'); break;
						default : Activity($container,{});
					}

				}
			});
		},
		toApplyCert: function(e,$this){
			let status = $this.data("status");

			if(status == '20'){
				Util.alertMessage('您提交的认证信息正在认证中！');
				return;
			}else{
				Util.linkTo('/apply-certf');
			}
        },
        logout: function() {
            Util.deleteCookie('AccessToken',document.domain);
            window.localStorage.removeItem('UserInfo'); 
            Util.linkTo('/login');
        }
	}   

	handlers.init(); 
}
