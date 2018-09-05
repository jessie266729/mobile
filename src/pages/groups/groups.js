/**
 * 圈子页
 */
import _ from 'underscore';
import Swiper from 'swiper';
import MeScroll from 'mescroll.js';
import Util from '../../common-component/util/util.js';
import API from '../../api/Api.js';
import GroupsTpl from './groups.html';
import GroupInfoList from '../../common-component/groupInfoList/groupInfoList.js';

import "./groups.scss";

export default function Groups() {
    const handlers = {

        params:{
            UserId: '',
            CircleId: null,
            CommentDataCount: 3,
            PageIndex: 1,
            PageSize: 3
        },
        getData:{
            index:0
        },
        groupList: [],
        init: function() {

            const that = this;

            that.getUserCircle(function(data){

                $(".container").html(GroupsTpl({circleList:data}));

                that.params.CircleId = data[0].Id;
                that.circleList = data;
                // that.getUserPostMsgList(that.params, that.renderMsgList.bind(that), 'loadMore');
                that.renderMescroll.call(that);
                let swiper = new Swiper('.group-list',{
                    slidesPerView: 4
                });
                $(".group-list .swiper-slide").eq(0).addClass("active");

                that.bindEvent();
                that.touchEventJudge();
            });

            Util.setTitle('圈子');
        },
        touchEventJudge:function () {
            let _this = this;
            let touch = new Util.Touch($('#mescroll'),150).init();
            let timer = null;
            let count = $(".school-switch-touch").length;
            //向左滑动触发事件
            touch.swipeLeft = function (dom) {

                timer = setTimeout(function () {
                    window.clearTimeout(timer);
                    let index = _this.getData.index===(count-1)?0:(_this.getData.index+1);
                    $(".school-switch-touch:eq("+index+")").click();
                },500);

            };

            //向右滑动事件
            touch.swipeRight = function (dom) {
                timer = setTimeout(function () {
                    let index = _this.getData.index===0?(count-1):(_this.getData.index-1);
                    $(".school-switch-touch:eq("+index+")").click();
                },500);
            }
        },
        bindEvent: function() {
            let _this = this;
            //公共事件添加
            $(".groups-layout").on("click", ".js-handle", function(e){
                let handle = $(this).data('handle');
                _this[handle] && _this[handle](e,$(this));
			});
            $('.group-list .swiper-wrapper').on('click','.swiper-slide',function(){
                let $this = $(this);
                if($this.hasClass('active')){
                    return false;
                }else{
                    $this.parent().find('.swiper-slide.active').removeClass('active');
                    $this.addClass('active');
                    _this.getData.index = $this.index();
                    _this.params.CircleId = $this.data('id');
                    _this.mescroll.resetUpScroll();
                }
            });
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
                        size : 3
                    },
                    clearEmptyId: 'dataList',
                    htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip" style="font-size:0.32rem;">加载中..</p>',
                    htmlNodata:"<p class='upwarp-nodata' style='font-size:0.32rem;'>没有更多了-_-</p>",
                    callback: function(page){
                        _this.params.PageIndex = page.num;
                        setTimeout(function(){
                            _this.getUserPostMsgList(_this.params,_this.renderMsgList.bind(_this,firstLoad));
                            firstLoad = false;
                        },500);
                    }
                }
            });
        },
        getUserCircle: function(cb){

            $.ajax({
                url: API.circleList,
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
        getUserPostMsgList:function(params, cb){
            $.ajax({
                url: API.userPostMsgList,
                type: 'post',
                data: {Body:params},
                success: function(req){
                    if(!req.IsError){
                        cb && cb(req || {});
                    }

                },
                error: function(msg){
                    console.log(msg);
                }
            })

        },
        renderMsgList:function(firstLoad,req){
            this.mescroll.endBySize(req.Result.length, req.TotalCount);
            GroupInfoList($(".group-info-list"), req.Result, firstLoad);            
        },
        addGroups: function() {
            let token = Util.getCookie('AccessToken');
            let { params: { CircleId }, circleList } = this;
            let CircleName = _.find(circleList,function(item){
                return item.Id == CircleId;
            }).Name;

            if(!!token){
                Util.linkTo('/edit-dynamic/' + CircleId +'/'+ encodeURI(encodeURI(CircleName)));
            }else{
                Util.linkTo('/login');
            }
        }
    }

    handlers.init();
}
