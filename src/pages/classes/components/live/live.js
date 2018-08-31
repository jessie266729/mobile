/**
 * 课程直播页
 */

import _ from 'underscore';
import Util from '../../../../common-component/util/util.js';
import API from '../../../../api/Api.js';
import MeScroll from 'mescroll.js';
import LiveTpl from './live.html';
import LiveItemTpl from './live-item.html';

import "./live.scss";

export default function Live($el, infoList) {

	const handlers = {
        params: {
			PageIndex: 1,
			PageSize: 10
        },
		init: function() {

			let _this = this;
            $el.html( LiveTpl() );
            this.renderMescroll.call(this);
			this.bindEvent();
		},
		bindEvent: function() {

		},
		getLiveList: function(params,cb){
			$.ajax({
                url: API.getLiveList,
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

            this.mescroll = new MeScroll("mescroll", { //第一个参数"mescroll"对应上面布局结构div的id
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
                    clearEmptyId: 'dataList',
                    htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip" style="font-size:0.32rem;">加载中..</p>',
                    htmlNodata:"<p class='upwarp-nodata' style='font-size:0.32rem;'>没有更多了-_-</p>",
                    callback: function(page){
						_this.params.PageIndex = page.num;
                        setTimeout(function(){
                            _this.getLiveList(_this.params,_this.renderLiveList.bind(_this,firstLoad));
                            firstLoad = false;
                        },500);
                    }
                }
            });
		},
		renderLiveList:function(firstLoad,req){
			this.mescroll.endBySize(req.Result.length, req.TotalCount);
			$("#dataList").append( LiveItemTpl({liveList: req.Result}) );        
        },
	}   

	handlers.init(); 
}
