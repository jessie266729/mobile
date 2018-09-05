import _ from 'underscore';
import Swiper from 'Swiper';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Util from '../../common-component/util/util.js';
import API from '../../api/Api.js';
import MatchesTpl from './matches.html';
import 'swiper/dist/css/swiper.min.css';

import "./matches.scss";

export default function Matches() {

    const handlers = {

        videoList:[],
        compList:[],
        newsList:[],
        count:3,

        init: function() {

            const _that = this;

            Util.setTitle('');

            this.getCompetitionList(function(data){
                _that.compList = data;
                _that.renderHtml();
            });

            this.getVideoList(function(data){
                _that.videoList = data;
                _that.renderHtml();
            });

            this.getNewsList(function(data){
                _that.newsList = data;
                _that.renderHtml();
            });        

        },
        bindEvent: function() {
            let _this = this;
            //公共事件添加
            $(".matches-page").on("click",".js-handle",function(e){
                let handle = $(this).data('handle');
                _this[handle] && _this[handle](e, $(this));
            });
        },
        renderHtml:function(){
            let _this = this;

            this.count--;
            if(this.count === 0){
                $(".container").html(MatchesTpl({videoList:this.videoList,compList:this.compList,newsList:this.newsList}));
                var swiper = new Swiper('.video-list', {
                    pagination: '.swiper-pagination',
                    paginationClickable :true,
                    paginationType : 'bullets',
                    onSlideChangeEnd: function(){
                        _this.playVideo && _this.playVideo.pause();
                    },
                });

                window.videoObjs = window.videoObjs || [];
                window.videoObjs.map((item,index) => { //销毁
                    item.dispose();
                });
                window.videoObjs= [];

                this.initVideo(this.videoList);
                this.bindEvent();

            }
        },
        getCompetitionList: function(cb){

            $.ajax({
                url: API.getCompetitionList,
                type: 'post',
                data: {Body:2},
                success: function(req){
                    if(!req.IsError){
                        cb && cb(req.Data || []);
                    }

                },
                error: function(msg){
                    console.log(msg);
                }
            })

        },
        getVideoList: function(cb){

            $.ajax({
                url: API.GetAdvertisingList,
                type: 'post',
                data: {Body:null},
                success: function(req){

                    if(!req.IsError){
                        cb && cb(req.Data || []);
                    }

                },
                error: function(msg){
                    console.log(msg);
                }
            })

        },
        getNewsList: function(cb){

            $.ajax({
                url: API.getNewsList,
                type: 'post',
                data: {Body:10},
                success: function(req){

                    if(!req.IsError){
                        cb && cb(req.Data || []);
                    }

                },
                error: function(msg){
                    console.log(msg);
                }
            })

        },
        initVideo: function(videoList) {
			let _this = this;
			videoList.map((item,index) => {
				window.videoObjs[index] = videojs('video-' + index,{
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
		},
        toSignUpInfo:function(e,$this){
            const id = $this.parents(".event-item").data("id");
            Util.linkTo('/game-sign-up-info/' + id);
        },
        toMatchDetails:function(e,$this){
            const id = $this.parents(".event-item").data("id");
            Util.linkTo('/match-details/' + id);
        },
        toAllMatches:function(e,$this){
            Util.linkTo('/all-matches');
        }
    }

    handlers.init();
}
