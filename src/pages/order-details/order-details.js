/**
 * 订单详情页
 */

import _ from 'underscore';
import Util from '../../common-component/util/util.js';
import API from '../../api/Api.js';
import OrderDetailTpl from './order-details.html';

import "./order-details.scss";

export default function OrderDetail(id) {

	const handlers = {
		init: function() {
			let _this = this;
			Util.setTitle('订单详情');
			this.getOrderDetail(function(req){
				$(".container").html( OrderDetailTpl({orderDetail:req.Data}) );
				_this.bindEvent();
			});
		},
		bindEvent: function() {
			let _this = this;
            //公共事件添加
            $(".create-order-page").on("click", ".js-handle", function(e){
                let handle = $(this).data('handle');
                _this[handle] && _this[handle](e, $(this));
			});
		},
		lessHours: function(e, $this){
			let hours = parseInt($this.siblings(".num").text());
			if(hours > 1){
				$this.siblings(".num").text(hours - 1);
			}
		},
		plusHours: function(e, $this){
			let hours = parseInt($this.siblings(".num").text());
			$this.siblings(".num").text(hours + 1);
		},
		getOrderDetail: function(cb){
			$.ajax({
                url: API.getOrderDetail,
                type: 'post',
                data: {Body: id},
                success: function(req){

                    if(!req.IsError){
                        cb && cb(req || {});
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
