/**
 * 注册页
 */
import _ from 'underscore';
import Util from '../../common-component/util/util.js';
import API from '../../api/Api.js';
import RegisterTpl from './register.html';

import "./register.scss";

export default function Login() {

	const handlers = {
		init: function() {
			$("#app-container").html( RegisterTpl({ title: '注册' }) );
			this.bindEvent();
		},
		bindEvent: function() {
			let _this = this;
            //公共事件添加
            $(".register-page .js-handle").on("click",function(e){
                let handle = $(this).data('handle');
                _this[handle] && _this[handle](e, $(this));
            });
		},
		handleRegister: function(e) {
			let params = this.verification();

			params && $.ajax({
				url: API.registerUser,
				data: {
					Body: { ...params }
				},
				success: function(req) {
                    let { IsError } = req;
					if(!IsError){
                        Util.alertMessage('注册成功！');
                        Util.linkTo('/login');	
					}	
				},
				error: function(msg) {
					console.log(msg);
				}
			})			
		},
		handleGetCode: function(e,$this) {
			let _this = this;
			let time = 60;
			let phoneNum = $("input[name='phone']").val();

			if($this.hasClass('disabled')){
				return;
			} 

			if(!phoneNum || !/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(phoneNum)){
				Util.alertMessage('请输入正确格式的手机号！');
				return;
			}

			//获取验证码
			$.ajax({
				url: API.sendRegisterUserMsg,
				data: {
					Body: {MobilePhone: phoneNum}
				},
				success: function(req) {

                    if(!req.IsError){
                        Util.alertMessage('验证码发送成功！');
                        $this.html(time + 's').css({
                            backgroundColor: '#c0c0c0'
                        })
                        _this.countdown(time - 1,function(overTime) {
                            if(overTime < 0){
                                $this
                                .html('获取验证码')
                                .removeClass('disabled')
                                .css({
                                    backgroundColor: '#ffaf00'
                                });
                            }else{
                                $this.addClass("disabled").html(overTime + 's');
                            }
                        })
                    }   

				},
				error: function(msg){
					console.log(msg);
				}
			})			
		},
		handleCheck: function(e, $this) {
			$this.hasClass('checked') ? $this.removeClass('checked') : $this.addClass('checked');
		},
		countdown: function(time,callback) {
			let myInterval = setInterval(function() {
				callback && callback(time);

				if(time < -1){
					clearInterval(myInterval);
				}
				time--;
			},1000)
		},
		verification: function() {
			let MobilePhone = $("input[name='phone']").val(),
				AuthCode = $("input[name='smsCode']").val(),
				Pwd = $("input[name='password']").val(),
				AffirmPwd = $("input[name='conPassword']").val();

			if(!MobilePhone || !/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(MobilePhone)){
				Util.alertMessage('请输入正确格式的手机号码！');
				return false;
			}

			if(!AuthCode){
				Util.alertMessage('获取并输入验证码！');
				return false;
			}

			if(!Pwd){
				Util.alertMessage('请输入密码！');
				return false;
			}

			if(!AffirmPwd){
				Util.alertMessage('请输入确认密码！');
				return false;
			}

			if(AffirmPwd !== Pwd){
				Util.alertMessage('两次密码不一致，请重新输入！');
				return false;
			}

			return {
				MobilePhone,
				AuthCode,
				Pwd,
				AffirmPwd
			};
		}
	}   

	handlers.init(); 
}
