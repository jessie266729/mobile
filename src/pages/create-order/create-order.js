/**
 * 下单页
 */

import _ from 'underscore';
import Util from '../../common-component/util/util.js';
import API from '../../api/Api.js';
import CreateOrderTpl from './create-order.html';

import "./create-order.scss";

export default function CreateOrder(id) {

	const handlers = {
		params: {
			UserId: '',
			SoType: 1,
            BusinessId: id,
            SetMeal: 10,
			Quantity: 1,
			PayWay: '2'
		},
		getData:{},
		init: function() {
			const _this = this;
			const loginUserInfo = JSON.parse(localStorage.getItem('UserInfo'));
            
            this.hasLogin = !!loginUserInfo ? true : false;
			this.getAccountDetail(function(data){
				$(".container").html( CreateOrderTpl({data}) );
				_this.getData = data;
				_this.bindEvent();
			});
			this.params.UserId = this.hasLogin ? loginUserInfo.Id : '';
			Util.setTitle('下单');
		},
		bindEvent: function() {
			let _this = this;
            //公共事件添加
            $(".create-order").on("click", ".js-handle", function(e){
                let handle = $(this).data('handle');
                _this[handle] && _this[handle](e, $(this));
            });
		},
        zfbPayType: function (e, $this) {
			let v = $this.attr('index');
            this.params.SetMeal = v;
            $('.pay-panel2').find('.zfb-pay-type').removeClass('active');
            $this.addClass('active');
            let unitText = '小时';
            if(v === '10'){
                unitText= '小时';
                this.getData.getUnitPrice = this.getData.UnitPrice;
			}else if(v==='20'){
                unitText= '天';
                this.getData.getUnitPrice = this.getData.UnitDayPrice;
			}else if(v==='30'){
                unitText= '月';
                this.getData.getUnitPrice = this.getData.UnitMonthPrice;
			}
			$('#pay_unit').text(unitText);
			this.countNum();
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
            $('.price-info').find('.panel').addClass('hide');
            $('.pay-panel'+t).removeClass('hide');
            $('.way').find('.pay-type').removeClass('active');
            $this.addClass('active');
            this.params.PayWay = t;
            if(t === '1'){
                $("#enter_num").text(1);
                $('#pay_unit').text('小时');
            }else if(t==='2'){
                $('#pay_unit').text(this.params.SetMeal === '10'?'小时':this.params.SetMeal === '20'?'天':'月');
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
		createOrder: function(e,$this){
			let _this = this;
            if(!this.hasLogin){
                Util.linkTo('/login');
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

			this.params.Quantity = parseInt($("#enter_num").text());
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
		getAccountDetail: function(cb){
			$.ajax({
                url: API.getAccountDetail,
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
		}
	}   

	handlers.init(); 
}
