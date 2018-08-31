/**
 * 新闻列表页
 */

import _ from 'underscore';
import Util from '../../common-component/util/util.js';
import API from '../../api/Api.js';
import InviteSuccessTpl from './invite-success.html';

import "./invite-success.scss";

export default function InviteSuccess(id) {

	const handlers = {
		init: function() {
			Util.setTitle('邀请成功');
            this.getOrderDetail(function(d){
                let data = d.Data;
                $(".container").html( InviteSuccessTpl({data}) );
            });
            this.bindEvent();

		},
		bindEvent: function() {
			let _this = this;
            //公共事件添加
            $(".invite-success-page").on("click", ".js-handle", function(e){
                let handle = $(this).data('handle');
                _this[handle] && _this[handle](e);
            });
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
