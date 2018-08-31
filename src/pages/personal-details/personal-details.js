/**
 * 个人详情页
 */

import _ from 'underscore';
import Util from '../../common-component/util/util.js';
import API from '../../api/Api.js';
import MeScroll from 'mescroll.js';
import PersonalDetailsTpl from './personal-details.html';
import GroupInfoList from '../../common-component/groupInfoList/groupInfoList.js';

import "./personal-details.scss";

export default function PersonalDetails(id) {

	const handlers = {
        params:{
            UserId: id,
            CircleId: null,
            CommentDataCount: 3,
            PageIndex: 1,
            PageSize: 10
        },
		init: function() {
			const _this = this;
			const loginUserInfo = JSON.parse(localStorage.getItem('UserInfo'));
			const isLoginUser = loginUserInfo && loginUserInfo.Id == id ? true : false;
            
            this.getUserInfo(function(userInfo){
                _this.userInfo = userInfo;
                $(".container").html( PersonalDetailsTpl({isLoginUser,userInfo}) );

                _this.setScrollHeight();
                _this.renderMescroll.call(_this);
                _this.bindEvent();
            })
			
			Util.setTitle('个人详情');
		},
		bindEvent: function() {
			let _this = this;
            //公共事件添加
            $(".personal-details-page").on("click", ".js-handle", function(e){
                let handle = $(this).data('handle');
                _this[handle] && _this[handle](e,$(this));
			});
			$(".selector span").on("click",function(e){
				let $this = $(this);
				$this.hasClass('active') ? '' : $this.addClass('active').siblings().removeClass('active');
			});
		},
        setScrollHeight:function(){
            let scrollHeight = $(".personal-details-page")[0].offsetHeight - $(".page-head")[0].offsetHeight - $(".selector")[0].offsetHeight;
            $("#person-mescroll").height(scrollHeight);
        },
		getUserInfo: function(callback){
            $.ajax({
                url: API.getUserInfo,
                data: {
                    Body: id
                },
                success: function(req) {
                    if(!req.IsError){
                        callback && callback(req.Data);
                    }else{
                        Util.alertMessage(req.Message);
                    }
                }
            })
		},
		getUserPostMsgList:function(params, cb, type){
            $.ajax({
                url: API.userPostMsgList,
                type: 'post',
                data: {Body:params},
                success: function(req){
                    if(!req.IsError){
                        cb && cb(req || [], type);
                    }
                },
                error: function(msg){
                    console.log(msg);
                }
            })

        },
		toApplyCert: function(e,$this){
			let status = $this.data("status");

			if(status == '20'){
				Util.alertMessage('您提交的认证信息正在认证中！');
				return;
			}else{
				Util.linkTo('/apply-certf');
			}
		},
        addGroups: function() {
            let token = Util.getCookie('AccessToken');
            let userInfo = this.userInfo;

            if(!!token){
                Util.linkTo('/edit-dynamic/' + userInfo.CircleId +'/'+ userInfo.CircleName);
            }else{
                Util.linkTo('/login');
            }
        },
        renderMescroll: function() {
            const _this = this;
            let firstLoad = true;

            this.mescroll = new MeScroll("person-mescroll", { //第一个参数"mescroll"对应上面布局结构div的id
                down: {
                    htmlContent: '<p class="downwarp-progress"></p><p class="downwarp-tip" style="font-size:0.32rem;">下拉刷新</p>'
                },
                up: {
                    isBounce: false,
                    noMoreSize: 5,
                    page: {
                        num : 0, 
                        size : 10
                    },
                    clearEmptyId: 'postMsgList',
                    htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip" style="font-size:0.32rem;">加载中..</p>',
                    htmlNodata:"<p class='upwarp-nodata' style='font-size:0.32rem;'>没有更多了-_-</p>",
                    callback: function(page){
						_this.params.PageIndex = page.num;
                        setTimeout(function(){
                            _this.getUserPostMsgList(_this.params,_this.renderPostMsgList.bind(_this,firstLoad));
                            firstLoad = false;
                        },500);
                    }
                }
            });
		},
		renderPostMsgList:function(firstLoad,req){
			this.mescroll.endBySize(req.Result.length, req.TotalCount);
			GroupInfoList($("#postMsgList"), req.Result);        
        },
	}   

	handlers.init(); 
}
