/**
 * 课程直播页
 */

import _ from 'underscore';
import Util from '../../../../common-component/util/util.js';
import API from '../../../../api/Api.js';
import PersonalClassesTpl from './classes.html';
import ClassesListTpl from './classes-list.html';
import MeScroll from 'mescroll.js';

import "./classes.scss";

export default function PersonalClasses($el, infoList) {

	const handlers = {

        params:{
            PageIndex: 1,
            PageSize: 2
        },

		init: function() {

			let _this = this;
            $el.html( PersonalClassesTpl() );
            _this.renderMescroll.call(_this);
            $('.mescroll.record-list').css({'max-height':($('#app-container').height()-$('.page-head').height()-$('.footer-layout').height()-100)+'px'})

		},
		bindEvent: function() {

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
                    noMoreSize: 2,
                    page: {
                        num : 0,
                        size : 2
                    },
                    clearEmptyId: 'training-ul',
                    htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip" style="font-size:0.32rem;">加载中..</p>',
                    htmlNodata:"<p class='upwarp-nodata' style='font-size:0.32rem;'>没有更多了-_-</p>",
                    callback: function(page){
                        _this.params.PageIndex = page.num;
                        setTimeout(function(){
                            _this.getPersonalClassesList(_this.params,_this.renderRecordList.bind(_this,firstLoad));
                            firstLoad = false;
                        },500);
                    }
                }
            });
        },
		getPersonalClassesList: function(params,cb){
			$.ajax({
                url: API.getPersonalClassesList,
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
            $("#training-ul").append( ClassesListTpl({allData: req.Result}) );
        }
	};

	handlers.init(); 
}
