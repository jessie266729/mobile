import API from '../../../../api/Api.js';
import Util from '../../../../common-component/util/util.js';
import MeScroll from 'mescroll.js';
import OnlineAccompanyTpl from './onlineAccompany.html';
import OnlineItemTpl from './online-item.html';

/**
 *
 * @param $el 选择器
 * @constructor
 */
export default function OnlineAccompany($el) {
    const handlers = {
        params: {
            GameInfoId: null,
            Grade: null,
            Sex: null,
            Status: null,
            PageIndex: 1,
            PageSize: 10
        },
        init: function() {
            const _this = this;

            this.getGameInfoList(function(req) {
                $el.html(OnlineAccompanyTpl({gameInfoList: req.Data}));
                _this.setScrollHeight();
                _this.renderMescroll.call(_this);
                _this.bindEvent();
            })
        },
        bindEvent: function() {
            let _this = this;
            
            //公共事件添加
            $("#header-all").on("click",".js-handle",function(e){
                let handle = $(this).data('handle');
                _this[handle] && _this[handle](e, $(this));
            });

            $('.hot-list').on('click', '.hot-list-item', function () {
                let $this = $(this);
                let id = $this.data('id');

                if($this.hasClass('active')){
                    return;
                }

                // $this.hasClass('active') ? $this.removeClass('active') : $this.addClass('active');
                $this.addClass('active').siblings('.active').removeClass('active');

                _this.params.GameInfoId = id;

                //重新请求
                _this.mescroll.resetUpScroll();

            })

            $(".sort .sort-border").on('click',function(){ //排序
                let $this = $(this);
                let type = parseInt($this.data('type'));

                if($this.hasClass('active')){
                    return;
                }

                $this.addClass('active').siblings('.active').removeClass('active');
                
                _this.params.OrderByType = type;

                //重新请求
                _this.mescroll.resetUpScroll();
                
            })
        },
        setScrollHeight:function(){
            let scrollHeight = $(".container").height() - $(".game-header").height() - $("#headerMenu").height() - 2;
            $("#online-mescroll").height(scrollHeight);
        },
        getGameInfoList: function(callback) {
            $.ajax({
                url: API.getGameInfoList,
                data: {
                    Body: null
                },
                success: function(req) {
					if(!req.IsError){
                        callback && callback(req || []);
                    }
                },
                error: function(msg){
                    console.log(msg);
                }
            })
        },
        seachPlayWithList: function(params,callback) {
            $.ajax({
                url: API.seachPlayWithList,
                data: {
                    Body: params
                },
                success: function(req) {
					if(!req.IsError){
                        callback && callback(req || []);
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

            this.mescroll = new MeScroll("online-mescroll", { //第一个参数"mescroll"对应上面布局结构div的id
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
                    clearEmptyId: 'online-list',
                    htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip" style="font-size:0.32rem;">加载中..</p>',
                    htmlNodata:"<p class='upwarp-nodata' style='font-size:0.32rem;'>没有更多了-_-</p>",
                    callback: function(page){
						_this.params.PageIndex = page.num;
                        setTimeout(function(){
                            _this.seachPlayWithList(_this.params,_this.renderOnlineList.bind(_this,firstLoad));
                            firstLoad = false;
                        },500);
                    }
                }
            });
		},
		renderOnlineList:function(firstLoad,req){
			this.mescroll.endBySize(req.Result.length, req.TotalCount);
			$("#online-list").append( OnlineItemTpl({seachPlayList: req.Result}) );        
        },
        toAccountRental: function(e, $this){
            let id = $this.data('id');
            Util.linkTo('/inviting-to-play/' + id);
        },
        placeOrder: function(e, $this) {
            e.stopPropagation();

            let id = $this.data('id');
            Util.linkTo('/inviting-create-order/' + id);
        }
    }
    handlers.init();
}