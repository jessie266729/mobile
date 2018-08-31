/**
 * 账号租用成功
 */
import _ from 'underscore';
import Util from '../../common-component/util/util.js';
import API from '../../api/Api.js';
import AccountRentSuccessTpl from './accountRent-success.html';

import "./accountRent-success.scss";

export default function AccountRentSuccess(id) {

    const handlers = {

        init: function() {
            Util.setTitle('租号成功');
            this.getOrderDetail(function(d){
                let data = d.Data;
                $(".container").html( AccountRentSuccessTpl({data}) );
            });
            this.bindEvent();
        },
        bindEvent: function() {
            let _this = this;
            //公共事件添加
            // $(".accountRent-success").on("click",".js-handle",function(e){
            //     let handle = $(this).data('handle');
            //     _this[handle] && _this[handle](e, $(this));
            // });
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
