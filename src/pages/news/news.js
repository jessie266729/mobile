/**
 * 新闻列表页
 */

import _ from 'underscore';
import Util from '../../common-component/util/util.js';
import API from '../../api/Api.js';
import NewsTpl from './news.html';
import MeScroll from 'mescroll.js';
import NewsItemTpl from './news-item.html';

import "./news.scss";

export default function News() {

	const handlers = {
		params: {
			PageIndex: 1,
			PageSize: 10
        },
		init: function() {

			$('.container').html( NewsTpl() );
            this.renderMescroll.call(this);
			this.bindEvent();
			Util.setTitle('全部新闻');

		},
		bindEvent: function() {
			let _this = this;
            //公共事件添加
            $(".news-page").on("click", ".news-item .js-handle", function(e){
                let handle = $(this).data('handle');
                _this[handle] && _this[handle](e);
            });
		},
		handleLogin: function(e) {
			let userName = $("input[name='userName']").val(),
				password = $("input[name='password']").val(),
				Body = {};

			if(!userName || !password){
				Util.alertMessage('请输入用户名及密码！');
				return;
			}

			Body = {
				"LoginName": "188888888888",
				"Pwd": "123456",
				"UserType": 2
			};

			$.ajax({
				url: API.userLogin,
				type: 'post',
				data: {
					Body
				},
				success: function(req){
					let { Data, IsError } = req;
					if(!req.IsError){
						let { UserInfo, AccessToken } = Data;
						
						Util.addCookie('AccessToken',AccessToken,1,document.domain);
						window.localStorage.setItem('UserInfo',JSON.stringify(UserInfo));
						Util.linkTo('/groups');	
					}			       
				},
				error: function(msg){
					console.log(msg);
				}
			})
		},
		getAllNewsList:function(params, cb){
			$.ajax({
                url: API.getAllNewsList,
                type: 'post',
                data: {Body:params},
                success: function(req){

                    if(!req.IsError){
                        cb && cb(req || []);
                    }

                },
                error: function(msg){
                    console.log(msg);
                }
            })
		},
        renderMescroll: function() {
            const _this = this;
            let firstLoad = true;

            this.mescroll = new MeScroll("news-mescroll", { //第一个参数"mescroll"对应上面布局结构div的id
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
                    clearEmptyId: 'newsList',
                    htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip" style="font-size:0.32rem;">加载中..</p>',
                    htmlNodata:"<p class='upwarp-nodata' style='font-size:0.32rem;'>没有更多了-_-</p>",
                    callback: function(page){
						_this.params.PageIndex = page.num;
                        setTimeout(function(){
                            _this.getAllNewsList(_this.params,_this.renderNewsList.bind(_this,firstLoad));
                            firstLoad = false;
                        },500);
                    }
                }
            });
		},
		renderNewsList:function(firstLoad,req){
			this.mescroll.endBySize(req.Result.length, req.TotalCount);
			$("#newsList").append( NewsItemTpl({newsList: req.Result}) );        
        }
	}   

	handlers.init(); 
}
