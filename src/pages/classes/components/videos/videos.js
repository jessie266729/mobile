/**
 * 新闻列表页
 */

import _ from 'underscore';
import Util from '../../../../common-component/util/util.js';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import MeScroll from 'mescroll.js';
import API from '../../../../api/Api.js';
import VideosTpl from './videos.html';
import VideoItemTpl from './video-item.html';

import "./videos.scss";

export default function Videos($el) {

	const handlers = {
		nextIndex: 0,
		params: {
			PageIndex: 1,
			PageSize: 5
		},
		init: function() {
			let _this = this;

			$el.html( VideosTpl() );
			this.renderMescroll.call(this);
			this.bindEvent();

			this.videoHeight = $("#dataList")[0].offsetWidth / 1.77778;
		},
		bindEvent: function() {
			let _this = this;
            //公共事件添加
            $(".videos-page").on("click", ".js-handle", function(e){
                let handle = $(this).data('handle');
                _this[handle] && _this[handle](e,$(this));
			});
		},
		disposeVideos: function() {
            window.videoObjs = window.videoObjs || [];
			window.videoObjs.map((item,index) => { //销毁
				item.dispose();
            });
			window.videoObjs= [];
		},
		getVideoList: function(params,cb){
			$.ajax({
                url: API.getVideoList,
                type: 'post',
                data: {Body: params},
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

            this.mescroll = new MeScroll("mescroll", { //第一个参数"mescroll"对应上面布局结构div的id
                down: {
                    htmlContent: '<p class="downwarp-progress"></p><p class="downwarp-tip" style="font-size:0.32rem;">下拉刷新</p>'
                },
                up: {
                    isBounce: false,
                    noMoreSize: 2,
                    page: {
                        num : 0, 
                        size : 5
                    },
                    clearEmptyId: 'dataList',
                    htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip" style="font-size:0.32rem;">加载中..</p>',
                    htmlNodata:"<p class='upwarp-nodata' style='font-size:0.32rem;'>没有更多了-_-</p>",
                    callback: function(page){
						_this.params.PageIndex = page.num;
						page.num === 1 && _this.disposeVideos();
                        setTimeout(function(){
                            _this.getVideoList(_this.params,_this.renderVideoList.bind(_this,firstLoad));
                            firstLoad = false;
                        },500);
                    }
                }
            });
		},
		renderVideoList:function(firstLoad,req){
			this.mescroll.endBySize(req.Result.length, req.TotalCount);
			$("#dataList").append( VideoItemTpl({videoList: req.Result, videoHeight: this.videoHeight, nextIndex: this.nextIndex}) );
			this.initVideo(req.Result);         
        },
		initVideo: function(videoList) {
			let _this = this;
			videoList.map((item,index) => {
				window.videoObjs[index] = videojs('my-player-' + (_this.nextIndex + index),{
					width: '100%',
					height: '100%'
				},function() {
					this.on('play',function(){
						$(this.el_).find('.vjs-tech').css({
							background: '#000'
						})
						_this.playVideo && _this.playVideo != this && _this.playVideo.pause();
						_this.playVideo = this;
					})
				});
			})

			this.nextIndex += videoList.length;
		},
		beforePlay: function(e,$this){
			this.VideoId = $this.data('videoId');
			$(".videos-modal-mask").show();
		},
		closeMask: function(e, $this){
			if($(e.target).hasClass("js-handle")){
				$(".videos-modal-mask").hide();
				$("input[name='PINCode']").val('');
			}
		},
		handleConfirm: function(e,$this) {
			let _this = this;
			let $input = $("input[name='PINCode']");
			let PINCode = $input.val();

			if(!PINCode){
				Util.alertMeassage('请输入PIN码！');
				return;
			}

			$.ajax({
				url: API.lookVVideoLesson,
				data: {
					Body: {
						LookType: 1,
						VideoId: this.VideoId,
						PINCode
					}
				},
				success: function(req) {
					if(!req.IsError){
						$(".videos-modal-mask").hide();
						$("span[data-video-id='"+_this.VideoId+"']").parent().hide();  
					}  
					                
				},
				error: function(msg){

				}
			})
		}
	}   

	handlers.init(); 
}
