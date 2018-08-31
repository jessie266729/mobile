/**
 * 赛事报名入口
 */
import _ from 'underscore';
import Util from '../../common-component/util/util.js';
import API from '../../api/Api.js';
import GameSignUpEntrTpl from './gameSignUpEntr.html';

import "./gameSignUpEntr.scss";

export default function NewsDetail(id) {
	const userInfo = JSON.parse(localStorage.getItem('UserInfo'));
	const handlers = {
		init: function() {
			let _this = this;
			let userInfo = JSON.parse(localStorage.getItem('UserInfo'));

			this.getDetail(function(data) {
				_this.GameCategory = data.GameCategory;
				Util.setTitle(data.CompetitionName);
				$(".container").html( GameSignUpEntrTpl({...data,...userInfo}) );
				_this.bindEvent();
			})
		},
		bindEvent: function() {
			let _this = this;
            //公共事件添加
            $(".game-sign-up-entr .js-handle").on("click",function(e){
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
		handleSignUp: function() {
			let ApplyUserId = userInfo.Id,
				CompetitionId = id,
				Project = this.GameCategory,
				Club = $("input[name='Club']").val();

			if(!Club){
				Util.alertMessage('请输入所属俱乐部！');
				return;
			}

			Util.loading(true,'请求中...');

			$.ajax({
				url: API.submitApplyCompetition,
				data: {
					Body: {
						ApplyUserId,
						CompetitionId,
						Project,
						Club
					}
				},
				success: function(req) {
					if(!req.IsError){
						Util.alertMessage('报名成功！');
						Util.linkTo('/matches');
					}
                    Util.loading(false);
				},
				error: function(msg) {

				}
			})
		}
	}   

	handlers.init(); 
}
