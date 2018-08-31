import Util from '../util/util.js';
import PinchZoom from '../../common-component/pinchZoom/pinchZoom.js';
import GroupInfoItemTpl from "./groupInfoItem.html";
import API from '../../api/Api.js';
import "./groupInfoItem.scss";

export default function GroupInfoItem($el, itemData, onlyOne) {
    const handlers = {
        init: function() {
            let token = Util.getCookie('AccessToken');

            this.hasLogin = !!token || false;

            itemData.onlyOne = onlyOne;
            $el.append(GroupInfoItemTpl(itemData));
            this.bindEvent();
        },
        bindEvent: function() {
            let _this = this;
            //公共事件添加
            $(".groupItem .js-handle").on("click",function(e){
                let handle = $(this).data('handle');
                _this[handle] && _this[handle](e, $(this));
            });
            $("#app-container").on("click", function(e){
                e.stopPropagation();
                if($(this).parents().find(".operator_menu").length <= 0){
                    $(".groupItem .operator_menu").hide(200).removeClass("hasShow");
                }
            });
        },
        handleLike: function(e, $this) {
            let hasLiked = $this.hasClass("hasLiked");

            $.ajax({
                url: API.clickLike,
                data: {Body:$this.parents(".groupItem").data('id')},
                success: function(req){

                    if(!req.IsError){
                        $(".comment-header .like-num span:last-child").html(hasLiked ?req.Data - 2 : req.Data);
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
        handleComment: function() {
            if(!this.hasLogin){
                Util.linkTo('/login');
                return;
            }
            $(".comment-input")
            .slideDown(500)
            .find(".input-box")
            .attr('data-type','0')
            .attr('data-user-id',itemData.UserId)
            .focus();
            $(".dynamicDetails-layout").addClass("hasCommentInput");
        },
        handleMenu: function(e,$this){
            e.stopPropagation();
            $this.siblings(".operator_menu").hasClass("hasShow") 
            ? $this.siblings(".operator_menu").hide(200).removeClass("hasShow") 
            : $this.siblings(".operator_menu").show(200).addClass("hasShow");
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
            PinchZoom(url);
        }
    };

    handlers.init();
}

