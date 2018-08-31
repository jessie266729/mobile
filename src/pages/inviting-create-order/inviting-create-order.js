/**
 * 陪玩下单页
 */

import _ from 'underscore';
import Util from '../../common-component/util/util.js';
import API from '../../api/Api.js';
import InvitingCreateOrderTpl from './inviting-create-order.html';

import "./inviting-create-order.scss";

export default function InvitingCreateOrder(id) {

	const handlers = {
		params: {
			UserId: '',
			SoType: 2,
			BusinessId: id,
			Quantity: 1,
			PayWay: '2',
			PINCode: '',
			UserQQ: ''
		},
        getData:{},
		init: function() {
			const _this = this;
			const loginUserInfo = JSON.parse(localStorage.getItem('UserInfo'));

            Util.setTitle('下单');
            this.hasLogin = !!loginUserInfo ? true : false;
			this.getPlayWithDetail(function(data){
                _this.getData = data;
				$(".container").html( InvitingCreateOrderTpl({data}) );
				_this.bindEvent();
			});
			this.params.UserId = this.hasLogin ? loginUserInfo.Id : '';
		},
		bindEvent: function() {
			let _this = this;
            //公共事件添加
            $(".inviting-order").on("click", ".js-handle", function(e){
                let handle = $(this).data('handle');
                _this[handle] && _this[handle](e, $(this));
			})
		},
        countNum:function () {
            let v = 0;
            if(this.params.PayWay !== '1'){
                v = parseInt($('#enter_num').text())*parseFloat(this.getData.getUnitPrice||this.getData.UnitPrice);
            }
            $('#count_price').text(v);
        },
        payType: function (e, $this) {
            let t = $this.attr('index');
            $('.price-info.panel').addClass('hide');
            $('.pay-panel'+t).removeClass('hide');
            $('.way').find('.pay-type').removeClass('active');
            $this.addClass('active');
            this.params.PayWay = t;
            if(t === '1'){
                $("#enter_num").text(1);
			}
            this.countNum();
        },
		lessHours: function(e, $this){
			let hours = parseInt($this.siblings("#enter_num").text());
			if(hours > 1&&this.params.PayWay !== '1'){
				$this.siblings("#enter_num").text(hours - 1);
                this.countNum();
			}
		},
		plusHours: function(e, $this){
			if(this.params.PayWay === '1'){
				return false;
			}
			let hours = parseInt($this.siblings("#enter_num").text());
			$this.siblings("#enter_num").text(hours + 1);
            this.countNum();
		},
		// createOrder: function(e,$this){
		// 	Util.linkTo('/invite-success')
		// },
		getPlayWithDetail: function(cb){
			$.ajax({
                url: API.getPlayWithDetail,
                type: 'post',
                data: { Body: id },
                success: function(req){
                    if(!req.IsError){
                        cb && cb(req.Data || []);
                    }
                },
                error: function(msg){
                    console.log(msg);
                }
            })
		},
		createOrder: function(e,$this){
            let _this = this;
			const num = parseInt($("#enter_num").text());
			const qq = $("input[type='number']").val();
			
			if(!qq){
				Util.alertMessage('请输入QQ号码！');
				return;
            }
            if(this.params.PayWay === '1'){
                let pinCode = $('#pin_code').val();
                if(!pinCode){
                    Util.alertMessage('请输入Pin码！');
                    return false;
                }else{
                    this.params.PINCode = pinCode;
                }
            }
            if(!this.hasLogin){
                Util.linkTo('/login');
                return;
            }
			this.params.Quantity = num;
			this.params.UserQQ = qq;
			$.ajax({
				url: API.creatOrder,
				data: {
					Body: this.params
				},
				success: function(req) {
                    if(!req.IsError){
                        if(_this.params.PayWay === '1'){
                            Util.linkTo('/order-details/' + req.Data);
                        }else{
                            window.location.href=encodeURI('alipay://orderID='+req.Data+'&return_url=http://esport.dj666.com.cn/#/order-details/'+req.Data);
                        }
                    }
				}
			})
		},
	}   

	handlers.init(); 
}
