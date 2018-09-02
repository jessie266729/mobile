import Util from '../util/util.js';
import CommentTpl from "./comment.html";

import "./comment.scss";

export default function Comment($el, commentData, isCommit, callback) {
    const handlers = {
        init: function() {
            let token = Util.getCookie('AccessToken');

            this.hasLogin = !!token || false;
            let listFace = [];
            for(let i = 0,len = 75;i<len;i++){
                let qqGif = require('../../asset/images/arclist/'+(i+1)+'.gif');
                //let qqGif = '../../asset/images/arclist/'+(i+1)+'.gif';
                listFace.push(qqGif);
            }
            commentData.listFace = listFace;
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
            $('.dynamicDetails-layout').off('click').on('click',function (e) {
               if($(e.target).parents('.comment-input').length<=0 && $(e.target).data('handle')!=='handleComment'){
                   $(".comment-input").slideUp(200);
                   $(".dynamicDetails-layout").removeClass("hasCommentInput");
                   $('.qq-face-panel').addClass('hide');
               }
            });
        },
        bindEvent: function() {
            let _this = this;
            //公共事件添加
            $(".comment-handle .js-handle").on("click",function(e){
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
                
                //_this.timeout = setTimeout(function() {
                    // e.target.scrollIntoView(false);
                //},200);
            })
            .on('blur',function(e){
                // $container.off('touchmove').scrollTop(currentScrollTop);
                // $(".dynamicDetails-layout").removeClass("hasCommentInput");
                // $(this)
                // .val('')
                // .parent()
                // .hide();
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
        qqFaceShow:function (e,$this) {
            $('.qq-face-panel').removeClass('hide');

        },
        handleComment: function(e,$this) {
            if(!this.hasLogin){
                Util.linkTo('/login');
                return;
            }

            $(".comment-input")
                .slideDown(200)
                .find(".input-box")
                .attr('data-type','1')
                .attr('data-user-id',$this.parents("li").data('userId'))
                .focus();
            $(".dynamicDetails-layout").addClass("hasCommentInput");
        }
    }

    handlers.init();
}

