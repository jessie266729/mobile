/**
 * 新闻列表页
 */

import _ from 'underscore';
import Util from '../../common-component/util/util.js';
import API from '../../api/Api.js';
import MeScroll from 'mescroll.js';
import AllMatchesTpl from './all-matches.html';
import MatcheListTpl from './matche-list.html';

import "./all-matches.scss";

export default function AllMatches() {

	const handlers = {
        params: {
            Rank: null,
            CompetitionStatus: null,
            PageIndex: 1,
            PageSize: 10
        },
		init: function() {
            let _this = this;

            Util.setTitle('全部赛事');
            $(".container").html( AllMatchesTpl() );

            this.setScrollHeight();

            this.renderMescroll.call(this);
            _this.bindEvent();

		},
		bindEvent: function() {
			let _this = this;
            //公共事件添加
            $(".all-matches-page").on("click", ".js-handle", function(e){
                let handle = $(this).data('handle');
                _this[handle] && _this[handle](e,$(this));
			});
			$(".select-list").on("click", ".select-list-item", function(e){
                let $this = $(this);
                let $parent = $(this).parent();
                
				$this.hasClass('active') ? '' : $this.addClass('active').siblings().removeClass('active');

                if($parent.hasClass("rank")){
                    _this.params.Rank = $this.data('rank') === undefined ? null : $this.data('rank');
                }else{
                    _this.params.CompetitionStatus = $this.data('status') === undefined ? null : $this.data('status');
                }

                //重新请求
                _this.mescroll.resetUpScroll();

            });
        },
        setScrollHeight:function(){
            let scrollHeight = $(".all-matches-page").height() - $("#selectMenu").height();
            $("#matches-mescroll").height(scrollHeight);
        },
		getAllMatchesList:function(params, cb){
			$.ajax({
                url: API.getAllMatchesList,
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
		toMatchDetails: function(e,$this) {
			let id = $this.parents(".matches-item").data('id');
			Util.linkTo('/match-details/' + id);
		},
		toSignUpInfo: function(e,$this) {
			let id = $this.parents(".matches-item").data('id');
			Util.linkTo('/game-sign-up-info/' + id);
        },
        renderMescroll: function() {
            const _this = this;
            let firstLoad = true;

            this.mescroll = new MeScroll("matches-mescroll", { //第一个参数"mescroll"对应上面布局结构div的id
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
                    clearEmptyId: 'matchesList',
                    htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip" style="font-size:0.32rem;">加载中..</p>',
                    htmlNodata:"<p class='upwarp-nodata' style='font-size:0.32rem;'>没有更多了-_-</p>",
                    callback: function(page){
						_this.params.PageIndex = page.num;
                        setTimeout(function(){
                            _this.getAllMatchesList(_this.params,_this.renderMatchesList.bind(_this,firstLoad));
                            firstLoad = false;
                        },500);
                    }
                }
            });
		},
		renderMatchesList:function(firstLoad,req){
			this.mescroll.endBySize(req.Result.length, req.TotalCount);
			$("#matchesList").append( MatcheListTpl({matchesList: req.Result}) );        
        },
	}   

	handlers.init(); 
}
