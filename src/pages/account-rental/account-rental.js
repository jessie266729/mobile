import _ from 'underscore';
import Util from '../../common-component/util/util.js';
import API from '../../api/Api.js';
import AccountRentalTpl from './account-rental.html';

import "./account-rental.scss";

export default function AccountRental(id) {

    const handlers = {

        init: function() {
            const _this = this;

            this.getAccountDetail(function(data){
                $(".container").html(AccountRentalTpl({data}));
                Util.setTitle('账号租用');
                _this.bindEvent();
            });

        },
        bindEvent: function() {
            let _this = this;
            //公共事件添加
            $(".account-rental-page").on("click",".js-handle",function(e){
                let handle = $(this).data('handle');
                _this[handle] && _this[handle](e, $(this));
            });
        },
        toCreateOrder: function(e, $this){
            Util.linkTo("/create-order/" + id);
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
