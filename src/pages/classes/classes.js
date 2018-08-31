/**
 * 新闻列表页
 */

import _ from 'underscore';
import Util from '../../common-component/util/util.js';
import API from '../../api/Api.js';
import ClassesTpl from './classes.html';
import Videos from './components/videos/videos.js';
import Live from './components/live/live.js';
import Interaction from './components/interaction/interaction.js';

import "./classes.scss";

export default function Classes() {

	const handlers = {
        getData:{
        	index:0
		},
		init: function() {
            window.videoObjs = window.videoObjs || [];
            window.videoObjs.map((item,index) => { //销毁
				item.dispose();
            });
            window.videoObjs = [];
			$(".container").html( ClassesTpl() );
			Videos($('.classes-item-container'),this);
			this.bindEvent();
			this.touchEventJudge();
		},
		touchEventJudge:function () {
        	let _this = this;
            let touch = new Util.Touch($('#classes_item_container'),150).init();
            let timer = null;
            let count = $(".menu-switch-touch").length;
            //向左滑动触发事件
            touch.swipeLeft = function (dom) {
            	timer = setTimeout(function () {
					window.clearTimeout(timer);
                    let index = _this.getData.index===(count-1)?0:(_this.getData.index+1);
                    $(".menu-switch-touch:eq("+index+")").click();
                },500);

            };

            //向右滑动事件
            touch.swipeRight = function (dom) {
                timer = setTimeout(function () {
                    let index = _this.getData.index===0?(count-1):(_this.getData.index-1);
                    $(".menu-switch-touch:eq("+index+")").click();
                },500);
            }
        },
		bindEvent: function() {
			let _this = this;
            //公共事件添加
            $(".classes-page").on("click", ".classes-item .js-handle", function(e){
                let handle = $(this).data('handle');
                _this[handle] && _this[handle](e);
            });
			this.handleChangeTab();
		},
		handleChangeTab: function() {
			let _this = this;
			$(".classes-page .classes-page-tabBar").on("click", "span", function(e){
				let $this = $(this);
				if($this.hasClass('active')){
					return false;
				}else{
					$this.parent().find('span.active').removeClass('active');
					$this.addClass('active');

					let index = $this.index();
					let $container = $(".classes-item-container");
                    _this.getData.index = index;
					switch (index){
						case 0 : Videos($container,_this); break;
						case 1 : Live($container); break;
						case 2 : Interaction($container); break;
						default : Videos($container);
					}

				}
			});
		}
	};

	handlers.init(); 
}
