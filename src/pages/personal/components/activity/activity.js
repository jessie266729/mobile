/**
 * 课程直播页
 */

import API from '../../../../api/Api.js';
import ActivityTpl from './activity.html';
import ActivityListTpl from './activity-list.html';
import MeScroll from 'mescroll.js';
import "./activity.scss";

export default function Activity($el, infoList) {

	const handlers = {

        params:{
            PageIndex: 1,
            PageSize: 2
        },

		init: function() {

			let _this = this;
            $el.html( ActivityTpl() );
            _this.renderMescroll.call(_this);
            $('.mescroll.record-list').css({'max-height':($('#app-container').height()-$('.page-head').height()-$('.footer-layout').height()-100)+'px'})

		},
		bindEvent: function() {

		},
        renderMescroll: function() {
            const _this = this;
            let firstLoad = true;

            this.mescroll = new MeScroll("activity-mescroll", { //第一个参数"mescroll"对应上面布局结构div的id
                down: {
                    htmlContent: '<p class="downwarp-progress"></p><p class="downwarp-tip" style="font-size:0.32rem;">下拉刷新</p>'
                },
                up: {
                    isBounce: false,
                    noMoreSize: 2,
                    page: {
                        num : 0,
                        size : 2
                    },
                    clearEmptyId: 'active-list',
                    htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip" style="font-size:0.32rem;">加载中..</p>',
                    htmlNodata:"<p class='upwarp-nodata' style='font-size:0.32rem;'>没有更多了-_-</p>",
                    callback: function(page){
                        _this.params.PageIndex = page.num;
                        setTimeout(function(){
                            _this.getActivityList(_this.params,_this.renderRecordList.bind(_this,firstLoad));
                            firstLoad = false;
                        },500);
                    }
                }
            });
        },
		getActivityList: function(params,cb){
			$.ajax({
                url: API.getPersonalActivityList,
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
        renderRecordList:function(firstLoad,req){
            this.mescroll.endBySize(req.Result.length, req.TotalCount);
            $("#active-list").append( ActivityListTpl({allData: req.Result}) );
        }
	};

	handlers.init(); 
}
