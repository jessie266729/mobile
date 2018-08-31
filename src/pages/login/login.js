/**
 * 登录页
 */
import _ from 'underscore';
import Util from '../../common-component/util/util.js';
import API from '../../api/Api.js';
import LoginTpl from './login.html';

import "./login.scss";

export default function Login() {

	const handlers = {
		init: function() {
			$(".container").html( LoginTpl({ title: '测试' }) );
			this.bindEvent();
		},
		bindEvent: function() {
			let _this = this;
            //公共事件添加
            $(".login-page .js-handle").on("click",function(e){
                let handle = $(this).data('handle');
                _this[handle] && _this[handle](e);
            });

            $("input[type='text'],input[type='password']").on('focus',function(){
                $('.footer-layout').hide();
            }).on('blur',function(){
                $('.footer-layout').show();
            });
		},
		handleLogin: function(e) {
			let userName = $("input[name='userName']").val(),
				password = $("input[name='password']").val(),
				Body = {};

			if(!userName || !password){
				Util.alertMessage('请输入用户名及密码！');
				return;
			}

			Body = {
				LoginName: userName,
				Pwd: password,
				UserType: 2
			};

            Util.loading(true,'登陆中...');

			$.ajax({
				url: API.userLogin,
				type: 'post',
				data: {
					Body
				},
				success: function(req){
                    let { Data, IsError } = req;
                    
                    Util.loading(false);
                    
					if(!IsError){
                        let { UserInfo, AccessToken } = Data;
                        
                        Util.linkTo('/matches');
                        Util.addCookie('AccessToken',AccessToken,360,document.domain);
						window.localStorage.setItem('UserInfo',JSON.stringify(UserInfo));  
					}		            	       
				},
				error: function(msg){
					console.log(msg);
				}
			})
		}
	}   

	handlers.init(); 
}
