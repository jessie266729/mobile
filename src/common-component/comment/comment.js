import Util from '../util/util.js';
import CommentTpl from "./comment.html";

import "./comment.scss";

export default function Comment($el, commentData, isCommit, callback) {
    const handlers = {
        init: function() {
            let token = Util.getCookie('AccessToken');

            this.hasLogin = !!token || false;

            $el.append(CommentTpl(commentData));
            this.bindEvent();

            if(isCommit){

                let $input = $(".comment-input")
                    .show()
                    .find(".input-box")
                    .attr('data-type','0')
                    .attr('data-user-id',commentData.groupId);

                $(".dynamicDetails-layout").addClass("hasCommentInput");
            }
        },
        bindEvent: function() {
            let _this = this;
            //公共事件添加
            $(".comment-info-list .js-handle").on("click",function(e){
                let $this = $(this);
                let handle = $this.data('handle');
                _this[handle] && _this[handle](e,$this);
            });

            //评论操作
            let $container = $(".container");
            let currentScrollTop = 0;
            let scrollHeight = $container[0].scrollHeight;
            $(".input-box")
            .on('focus',function(e){
                currentScrollTop = $container.scrollTop();
                // $(this).parent().css({position: 'absolute',left: 0,bottom: 0});
                $container.on('touchmove',function(event){
                    event.preventDefault();
                });
                
                _this.timeout = setTimeout(function() {
                    // e.target.scrollIntoView(false);
                },200);
            })
            .on('blur',function(e){
                $container.off('touchmove').scrollTop(currentScrollTop);
                $(".dynamicDetails-layout").removeClass("hasCommentInput");
                $(this)
                .val('')
                .parent()
                .hide();
            })
            .on("keypress",function(e){
                if(e.keyCode == 13){//回车提交
                    let $this = $(this);
                    let type = $this.data('type');
                    callback && callback({
                        CommentReplyType: type,
                        ReplyUserId: $this.data('userId'),
                        Content: $this.val()
                    });
                    $this.blur();
                }
            })
        },
        handleComment: function(e,$this) {
            if(!this.hasLogin){
                Util.linkTo('/login');
                return;
            }

            $(".comment-input")
                .show()
                .find(".input-box")
                .attr('data-type','1')
                .attr('data-user-id',$this.parents("li").data('userId'))
                .focus();
            $(".dynamicDetails-layout").addClass("hasCommentInput");
        }
    }

    handlers.init();
}

