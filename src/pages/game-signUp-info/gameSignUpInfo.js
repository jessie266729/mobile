/**
 * 赛事报名
 */
import _ from 'underscore';
import Util from '../../common-component/util/util.js';
import API from '../../api/Api.js';
import GameSignUpInfoTpl from './gameSignUpInfo.html';

import "./gameSignUpInfo.scss";

export default function NewsDetail(id) {

	const handlers = {
		init: function() {
			let _this = this;
			Util.setTitle('赛事报名');
			this.getDetail(function(data) {
				$(".container").html( GameSignUpInfoTpl(data) );
				_this.bindEvent();
			})
		},
		bindEvent: function() {
			let _this = this;
			//公共事件添加
            $(".game-sign-up-info .js-handle").on("click",function(e){
                let handle = $(this).data('handle');
                _this[handle] && _this[handle](e, $(this));
            });
		},
		getDetail: function(callback) {
			$.ajax({
                url: API.getMatchDetailsInfo,
                type: 'post',
                data: {Body:id},
                success: function(req){

                    if(!req.IsError){
                        callback && callback(req.Data || []);
                    }

                },
                error: function(msg){
                    console.log(msg);
                }
            })
		},
		handleSignUp: function(e,$this) {
			let status = $this.status;

			if(status == 0 || status > 10){
				return;
			}

			Util.linkTo('/game-sign-up-entr/' + id);
		}
	}   

	handlers.init(); 
}
