/**
 * 新闻详情页
 */
import _ from 'underscore';
import Util from '../../common-component/util/util.js';
import API from '../../api/Api.js';
import NewsDetailTpl from './newsDetail.html';

import "./newsDetail.scss";

export default function NewsDetail(id) {

	const handlers = {
		init: function() {
            let _this = this;
			this.getNewsInfo(function(data){
				$(".container").html( NewsDetailTpl({newsDetail:data}) );
				_this.bindEvent();
				Util.setTitle('新闻详情');
			});
		},
		bindEvent: function() {
			let _this = this;
            //公共事件添加
            $(".newsDetail-page .js-handle").on("click", function(e){
                let handle = $(this).data('handle');
                _this[handle] && _this[handle](e);
            });
		},
		handleLogin: function(e) {

		},
		getNewsInfo: function(cb){
			$.ajax({
                url: API.getNewsInfo,
                type: 'post',
                data: {Body:id},
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
