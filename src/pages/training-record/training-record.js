/**
 * 新闻列表页
 */

import _ from 'underscore';
import Util from '../../common-component/util/util.js';
import API from '../../api/Api.js';
import MeScroll from 'mescroll.js';
import TrainingRecordTpl from './training-record.html';
import TrainingListTpl from './training-list.html';

import "./training-record.scss";

export default function TrainingRecord() {

	const handlers = {
		params: {
            GameInfoId: null,
			TimeType: null,
			Status: null,
            PageIndex: 1,
            PageSize: 10
        },
		init: function() {
			let _this = this;
			Util.setTitle('训练记录');
			this.getAllGames(function(data){
				$(".container").html( TrainingRecordTpl({gemes:data}) );
				_this.setScrollHeight();
				_this.renderMescroll.call(_this);
				_this.bindEvent();
			});

		},
		bindEvent: function() {
			let _this = this;
            //公共事件添加
            $(".training-record-page").on("click", ".js-handle", function(e){
                let handle = $(this).data('handle');
                _this[handle] && _this[handle]($(this),e);
			});
			
			$(".select-options").on("click", ".list-item", function(e){
                let $this = $(this);
                let $parent = $(this).parent();
                
				$this.hasClass('active') ? '' : $this.addClass('active').siblings().removeClass('active');

                if($parent.hasClass("game")){
                    _this.params.GameInfoId = $this.data('game') === undefined ? null : $this.data('game');
                }else if($parent.hasClass("time")){
                    _this.params.TimeType = $this.data('time') === undefined ? null : $this.data('time');
                }else{
                    _this.params.Status = $this.data('status') === undefined ? null : $this.data('status');
                }

                //重新请求
                _this.mescroll.resetUpScroll();

            });
		},
		setScrollHeight: function(){
			let scrollHeight = $(".training-record-page").height() - $(".select-options")[0].offsetHeight - 2;
            $("#training-mescroll").height(scrollHeight);
		},
		getAllGames: function(callback){
			$.ajax({
                url: API.getGameInfoList,
                data: {
                    Body: null
                },
                success: function(req) {
					if(!req.IsError){
                        callback && callback(req.Data || []);
                    }
                },
                error: function(msg){
                    console.log(msg);
                }
            })
		},
		getAllRecordList: function(params, cb){
			$.ajax({
                url: API.getAllRecordList,
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

            this.mescroll = new MeScroll("training-mescroll", { //第一个参数"mescroll"对应上面布局结构div的id
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
                    clearEmptyId: 'training-ul',
                    htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip" style="font-size:0.32rem;">加载中..</p>',
                    htmlNodata:"<p class='upwarp-nodata' style='font-size:0.32rem;'>没有更多了-_-</p>",
                    callback: function(page){
						_this.params.PageIndex = page.num;
                        setTimeout(function(){
                            _this.getAllRecordList(_this.params,_this.renderRecordList.bind(_this,firstLoad));
                            firstLoad = false;
                        },500);
                    }
                }
            });
		},
		renderRecordList:function(firstLoad,req){
			this.mescroll.endBySize(req.Result.length, req.TotalCount);
			$("#training-ul").append( TrainingListTpl({trainingList: req.Result}) );        
		},
		linkToDetail: function($this){
			let id = $this.data('id');
			Util.linkTo('/order-details/' + id);
		},
        copyText:function ($this,e) {
            // find target element
            let
                c = $this.data('copytarget'),
                inp = (c ? $(c) : null);

            // is element selectable?
            if (inp && inp.select) {
                // select text
                inp.select();
                try {
                    // copy text
                    document.execCommand('copy');
                    inp.blur();
                    // copied animation
                    Util.alertMessage('复制成功');
                }
                catch (err) {
                    Util.alertMessage('请使用 Ctrl/Cmd+C 进行复制!');
                }
            }
            e.stopPropagation();
        }
	};

	handlers.init(); 
}
