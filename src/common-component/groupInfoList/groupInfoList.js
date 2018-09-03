import Util from '../../common-component/util/util.js';
import qqFaceConfig from '../util/qqFaceConfig.js';
import PinchZoom from '../../common-component/pinchZoom/pinchZoom.js';
import GroupInfoListTpl from "./groupInfoList.html";
import API from '../../api/Api.js';

import "../groupInfoItem/groupInfoItem.scss";

export default function GroupInfoList($el, infoList, firstLoad) {
    const handlers = {
        init: function() {
            let token = Util.getCookie('AccessToken');

            this.hasLogin = !!token || false;
            for(let k in infoList){
                qqFaceConfig.qqFaceResolve(infoList[k].CommentReplyList);
            }

            $el.append(GroupInfoListTpl({infoList}));
            firstLoad && this.bindEvent();
        },
        bindEvent: function() {
            let _this = this;
            //公共事件添加
            $(".group-info-list")
            .on("click",".js-handle",function(e){
                let handle = $(this).data('handle');
                _this[handle] && _this[handle](e, $(this));
            });
            $("#app-container")
            .off("click",function(e){})
            .on("click", function(e){
                e.stopPropagation();

                $(".groupItem .operator_menu.hasShow").hide(200).removeClass("hasShow");
            });
        },
        handleLike: function(e, $this) {
            let hasLiked = $this.hasClass("hasLiked");

            $.ajax({
                url: API.clickLike,
                type: 'post',
                data: {Body:$this.parents(".groupItem").data('id')},
                success: function(req){

                    if(!req.IsError){
                        if(hasLiked){
                            Util.alertMessage('取消点赞成功！');
                            $this.removeClass("hasLiked");
                        }else{
                            Util.alertMessage('点赞成功！');
                            $this.addClass("hasLiked");
                        }                        
                    }

                },
                error: function(msg){
                    console.log(msg);
                }
            })
        },
        handleLink: function(e,$this) {
            const id = $this.parents(".groupItem").data("id");
            Util.linkTo('/dynamic-details/details/' + id);
        },
        handleComment: function(e,$this){
            if(!this.hasLogin){
                Util.linkTo('/login');
                return;
            }

            const id = $this.parents(".groupItem").data("id");
            Util.linkTo('/dynamic-details/commit/' + id);
        },
        handleMenu: function(e,$this){
            e.stopPropagation();
            if($this.next().hasClass("hasShow")){
                $this.next().hide(200).removeClass("hasShow");
            }else{
                $this
                .parents(".group-info-list")
                .find(".hasShow")
                .hide(200)
                .removeClass("hasShow");

                $this
                .next()
                .show(200)
                .addClass("hasShow");
            }
        },
        handleReport: function(e,$this){
            $.ajax({
                url: API.reportApi,
                data: {Body:{
                    PostMessageId: $this.parents(".groupItem").data('id')
                }},
                success: function(req){

                    if(!req.IsError){
                        console.log(req);
                        $this.parent().hasClass("hasShow") 
                        ? $this.parent().hide(200).removeClass("hasShow") 
                        : $this.parent().show(200).addClass("hasShow");
                    }

                },
                error: function(msg){
                    console.log(msg);
                }
            })
        },
        handleShowImg: function(e,$this){
            let url = $this.data('url');
            let index = $this.data('index');
            let dataAll = $this.data('adata');
            PinchZoom(dataAll,index);
        }
    }

    handlers.init();
}

